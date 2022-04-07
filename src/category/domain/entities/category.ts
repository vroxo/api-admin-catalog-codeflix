import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'
import Entity from '../../../@seedwork/domain/entity/entity'

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category extends Entity<CategoryProperties> {
    constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
        super(props, id);
        this.description = props.description;
        this.props.is_active = props.is_active ?? true;
        this.props.created_at = props.created_at ?? new Date();
    }

    update(name: string, description: string){
        this.props.name = name;
        this.props.description = description;
    }

    deactivate() {
        this.props.is_active = false;
    }

    activate() {
        this.props.is_active = true;
    }

    get name() {
        return this.props.name;
    }

    private set name(value: string) {
        this.props.name = value;
    }

    get description() {
        return this.props.description;
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    get is_active(){
        return this.props.is_active;
    }

    get created_at() {
        return this.props.created_at;
    }
}
