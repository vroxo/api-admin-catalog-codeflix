import Entity from '#seedwork/domain/entity/entity'
import UniqueEntityId from '#seedwork/domain/value-objects/unique-entity-id.vo'

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findAll(): Promise<E[]>;
  findById(id: string | UniqueEntityId): Promise<E>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null
}

export class SearchParams<Filter = string> {
  protected _page: number;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchProps<Filter> = {}) {
    this.setPage(props.page);
    this.setPerPage(props.per_page);
    this.setSort(props.sort);
    this.setSortDir(props.sort_dir);
    this.setFilter(props.filter);
  }

  private setPage(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }
  
  get page() {
    return this._page;
  }

  private setPerPage(value: number) {
    let _per_page = value === true as any ? this._per_page : +value;

    if (Number.isNaN(_per_page) || _per_page <= 0 || parseInt(_per_page as any) !== _per_page) {
      _per_page = this._per_page;
    }

    this._per_page = _per_page;
  }

  get per_page() {
    return this._per_page;
  }

  private setSort(value: string | null) {
    this._sort = value === null || value === undefined || value === "" ? null : `${value}`
  }

  get sort(): string | null {
    return this._sort;
  }

  private setSortDir(value: SortDirection | null) {
    if(!this._sort) {
      this._sort_dir = null;
      return;
    }

    const dir = `${value}`.toLowerCase();
    this._sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
  }

  get sort_dir(): SortDirection | null {
    return this._sort_dir;
  }

  private setFilter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ""
        ? null
        : `${value}` as any;
  }

  get filter(): Filter | null {
    return this._filter;
  }
}

export type SearchResultProps<E extends Entity, Filter> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_dir: SortDirection | null;
  filter: Filter | null;
} 

export class SearchResult<E extends Entity = Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_dir: SortDirection | null;
  readonly filter: Filter;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
    }
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string, 
  SearchInput = SearchParams, 
  SearchOutput = SearchResult<E, Filter>
  > extends RepositoryInterface<E> {
    sortableFields: string[];
    search(props: SearchInput): Promise<SearchOutput>;
}