import { Test, type TestingModule } from "@nestjs/testing"
import { ClassService } from "./class.service"
import { getModelToken } from "@nestjs/mongoose"
import { Class } from "./schemas/class.schema"
import { NotFoundException } from "@nestjs/common"
import type { Model } from "mongoose"

const mockClass = {
  _id: "a-mock-id",
  name: "Test Class",
  level: "Intermediate",
  academicYear: "2023-2024",
  save: jest.fn().mockResolvedValue(this),
}

const mockClassModel = {
  new: jest.fn().mockResolvedValue(mockClass),
  constructor: jest.fn().mockResolvedValue(mockClass),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  exec: jest.fn(),
}

describe("ClassService", () => {
  let service: ClassService
  let model: Model<Class>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassService,
        {
          provide: getModelToken(Class.name),
          useValue: mockClassModel,
        },
      ],
    }).compile()

    service = module.get<ClassService>(ClassService)
    model = module.get<Model<Class>>(getModelToken(Class.name))
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  describe("create", () => {
    it("should create a new class", async () => {
      const createClassDto = {
        name: "Test Class",
        level: "Intermediate",
        academicYear: "2023-2024",
      }

      // Correction ici: utiliser mockReturnValue au lieu de mockResolvedValueOnce
      jest.spyOn(mockClassModel, "new").mockReturnValue({
        ...mockClass,
        ...createClassDto,
        save: jest.fn().mockResolvedValue({ ...mockClass, ...createClassDto }),
      })

      const result = await service.create(createClassDto)
      expect(result).toEqual(expect.objectContaining(createClassDto))
    })
  })

  describe("findAll", () => {
    it("should return an array of classes", async () => {
      jest.spyOn(model, "find").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([mockClass]),
      } as any)

      const result = await service.findAll()
      expect(result).toEqual([mockClass])
    })
  })

  describe("findOne", () => {
    it("should find and return a class by id", async () => {
      jest.spyOn(model, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockClass),
      } as any)

      const result = await service.findOne("a-mock-id")
      expect(result).toEqual(mockClass)
    })

    it("should throw NotFoundException if class is not found", async () => {
      jest.spyOn(model, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any)

      await expect(service.findOne("wrong-id")).rejects.toThrow(NotFoundException)
    })
  })

  describe("update", () => {
    it("should update and return a class", async () => {
      const updateClassDto = {
        name: "Updated Class",
      }

      jest.spyOn(model, "findByIdAndUpdate").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...mockClass,
          name: "Updated Class",
        }),
      } as any)

      const result = await service.update("a-mock-id", updateClassDto)
      expect(result.name).toEqual("Updated Class")
    })

    it("should throw NotFoundException if class to update is not found", async () => {
      jest.spyOn(model, "findByIdAndUpdate").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any)

      await expect(service.update("wrong-id", { name: "Updated Class" })).rejects.toThrow(NotFoundException)
    })
  })

  describe("remove", () => {
    it("should delete and return a class", async () => {
      jest.spyOn(model, "findByIdAndDelete").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockClass),
      } as any)

      const result = await service.remove("a-mock-id")
      expect(result).toEqual(mockClass)
    })

    it("should throw NotFoundException if class to delete is not found", async () => {
      jest.spyOn(model, "findByIdAndDelete").mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any)

      await expect(service.remove("wrong-id")).rejects.toThrow(NotFoundException)
    })
  })
})