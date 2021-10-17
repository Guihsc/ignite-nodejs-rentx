import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  description: string;
  name: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Already Exists!");
    }

    this.specificationsRepository.create({ description, name });
  }
}

export { CreateSpecificationUseCase };
