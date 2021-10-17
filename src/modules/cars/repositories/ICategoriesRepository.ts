import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  description: string;
  name: string;
}

interface ICategoriesRepository {
  create({ description, name }: ICreateCategoryDTO): void;
  findByName(name: string): Category;
  list(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
