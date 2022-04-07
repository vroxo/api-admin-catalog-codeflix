import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category {

    public readonly id: UniqueEntityId;

    constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
        this.id = id || new UniqueEntityId();
        this.description = props.description;
        this.props.is_active = props.is_active ?? true;
        this.props.created_at = props.created_at ?? new Date();
    }

    get name() {
        return this.props.name;
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
