import { SortDirection } from "#seedwork/domain";
import { InMemorySearchableRepository } from "#seedwork/domain";
import { Category } from '#category/domain'
import { CategoryRepository } from "#category/domain";

export default class CategoryInMemoryRepository 
  extends InMemorySearchableRepository<Category> 
  implements CategoryRepository.Repository {

  sortableFields: string[] = ['name', 'created_at']
  
  protected async applyFilter(
    items: Category[], 
    filter: CategoryRepository.Filter
  ) {
    if(!filter) return items;

    return items.filter(i => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase())
      )
    })
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir) 
  }
}