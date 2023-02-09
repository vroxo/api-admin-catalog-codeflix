import { Category } from "#category/domain";
import NotFoundError from "#seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "#category/infra/repository/category-in-memory.repository";
import GetCategoryUseCase from "#category/application/use-cases/get-category.use-case";

describe('GetCategoryUseCase Unit Tests', () => {
  let repository: CategoryInMemoryRepository;
  let useCase: GetCategoryUseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it('should throws error when category not found', async () => {
    expect(() => useCase.execute({ id: 'fake id'}))
      .rejects
      .toThrow(new NotFoundError('Entity Not Found using ID fake id'));
  });

  it('should create a category', async () => {

    const items = [
      new Category({ name: 'Movie' })
    ];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, 'findById');

    const output = await useCase.execute({id: items[0].id });
  
    expect(spyFindById).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: items[0].id,
      name: items[0].name,
      description: items[0].description,
      is_active: items[0].is_active,
      created_at: items[0].created_at
    })
  });
});