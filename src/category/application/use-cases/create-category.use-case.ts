import { CategoryRepository } from "#category/domain";
import { Category } from "#category/domain";
import { CategoryOutput } from "#category/application";
import UseCase from "#seedwork/application/use-cases/use-case";

export default class CreateCategoryUseCase implements UseCase<Input, Output>{
  constructor(private categoryRepo: CategoryRepository.Repository){}

  async execute(input: Input): Promise<Output> {
    const entity = new Category(input);
    await this.categoryRepo.insert(entity);
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at
    }
  }

}

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
}

export type Output = CategoryOutput;