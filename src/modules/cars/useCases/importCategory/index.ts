import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoriesRepository = CategoriesRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(
  importCategoriesRepository
);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
