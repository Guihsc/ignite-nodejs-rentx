import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  description: string;
  name: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
