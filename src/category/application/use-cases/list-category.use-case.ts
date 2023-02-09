import { 
  PaginationOutputDto, 
  PaginationOutputMapper 
} from "#seedwork/application/dto/pagination-output";
import { SearchInputDto } from "#seedwork/application/dto/search-input";
import UseCase from "#seedwork/application/use-cases/use-case";
import { CategoryRepository } from "#category/domain/repository/category.repository";
import { CategoryOutputMapper, CategoryOutput } from "#category/application/dto/category-output";

export default class ListCategoryUseCase implements UseCase<Input, Output>{
  constructor(private categoryRepo: CategoryRepository.Repository){}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult) {
    const items = searchResult.items.map(i => CategoryOutputMapper.toOutput(i))
    const pagination = PaginationOutputMapper.toOutput(searchResult)

    return {
      items,
      ...pagination
    }
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
