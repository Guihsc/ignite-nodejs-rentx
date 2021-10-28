import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../erros/AppError";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
  description: string;
  name: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category Already Exists!");
    }

    this.categoriesRepository.create({ description, name });
  }
}

export { CreateCategoryUseCase };
