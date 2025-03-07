provider "aws" {
  region = "us-east-1"
}

variable "dockerhub_username" {
  description = "DockerHub username"
  type        = string
}

variable "mongodb_uri" {
  description = "MongoDB connection URI"
  type        = string
  sensitive   = true
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "school-management-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  
  enable_nat_gateway = true
  single_nat_gateway = true
  
  tags = {
    Environment = "production"
    Project     = "SchoolManagement"
  }
}

resource "aws_security_group" "app_sg" {
  name        = "school-management-sg"
  description = "Security group for school management application"
  vpc_id      = module.vpc.vpc_id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_cluster" "main" {
  name = "school-management-cluster"
}

resource "aws_ecs_task_definition" "api_gateway" {
  family                   = "api-gateway"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  
  container_definitions = jsonencode([
    {
      name      = "api-gateway"
      image     = "${var.dockerhub_username}/school-api-gateway:main"
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
      environment = [
        { name = "CLASS_SERVICE_HOST", value = "class-service.school-management.local" },
        { name = "CLASS_SERVICE_PORT", value = "3001" },
        { name = "COURSE_SERVICE_HOST", value = "course-service.school-management.local" },
        { name = "COURSE_SERVICE_PORT", value = "3002" },
        { name = "STUDENT_SERVICE_HOST", value = "student-service.school-management.local" },
        { name = "STUDENT_SERVICE_PORT", value = "3003" },
        { name = "TEACHER_SERVICE_HOST", value = "teacher-service.school-management.local" },
        { name = "TEACHER_SERVICE_PORT", value = "3004" },
        { name = "SCHEDULE_SERVICE_HOST", value = "schedule-service.school-management.local" },
        { name = "SCHEDULE_SERVICE_PORT", value = "3005" },
        { name = "MONGODB_URI", value = var.mongodb_uri }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/ecs/api-gateway"
          awslogs-region        = "us-east-1"
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}

resource "aws_iam_role" "ecs_execution_role" {
  name = "ecs_execution_role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_service" "api_gateway" {
  name            = "api-gateway"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api_gateway.arn
  desired_count   = 2
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets         = module.vpc.private_subnets
    security_groups = [aws_security_group.app_sg.id]
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.api_gateway.arn
    container_name   = "api-gateway"
    container_port   = 3000
  }
}

resource "aws_lb" "main" {
  name               = "school-management-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.app_sg.id]
  subnets            = module.vpc.public_subnets
}

resource "aws_lb_target_group" "api_gateway" {
  name     = "api-gateway-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id
  target_type = "ip"
  
  health_check {
    path                = "/api"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api_gateway.arn
  }
}

output "load_balancer_dns" {
  value = aws_lb.main.dns_name
}

