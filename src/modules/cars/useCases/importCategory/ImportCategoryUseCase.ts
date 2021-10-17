/* eslint-disable no-undef */
import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  description: string;
  name: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [description, name] = line;
          categories.push({
            description,
            name,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map((category) => {
      const { description, name } = category;
      const existsCategory = this.categoriesRepository.findByName(name);

      if (!existsCategory) {
        this.categoriesRepository.create({
          description,
          name,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
