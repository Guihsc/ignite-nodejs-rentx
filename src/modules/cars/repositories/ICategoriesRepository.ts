import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  description: string;
  name: string;
}

interface ICategoriesRepository {
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
