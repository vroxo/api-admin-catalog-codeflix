import CategoryInMemoryRepository from "#category/infra/repository/category-in-memory.repository";
import CreateCategoryUseCase from "#category/application/use-cases/create-category.use-case";

describe('CreateCategoryUseCase Unit Tests', () => {
  let repository: CategoryInMemoryRepository;
  let useCase: CreateCategoryUseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should create a category', async () => {

    const arrange = [
      { name: 'test'},
      { name: 'test', description: 'some description' },
      { name: 'test', description: 'some description', is_active: false },
    ];

    const spyInsert = jest.spyOn(repository, 'insert');
    
    for(const i in arrange) {
      const output = await useCase.execute(arrange[i]);
      expect(output).toStrictEqual({
        id: repository.items[i].id,
        name: arrange[i].name,
        description: arrange[i].description,
        is_active: arrange[i].is_active,
        created_at: repository.items[i].created_at
      })
    }

    expect(spyInsert).toHaveBeenCalledTimes(arrange.length)
  });
});