import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'
import Entity from '../../../@seedwork/domain/entity/entity'
import ValidatorRules from '../../../@seedwork/validators/validator-rules';
import CategoryValidatorFactory from '../../validators/category.validator';

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category extends Entity<CategoryProperties> {
    constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
        Category.validate(props);

        super(props, id);
        this.description = props.description;
        this.props.is_active = props.is_active ?? true;
        this.props.created_at = props.created_at ?? new Date();
    }

    update(name: string, description: string){
        Category.validate({
            name, 
            description
        });

        this.props.name = name;
        this.props.description = description;
    }

    static validate(props: CategoryProperties){
        const validator = CategoryValidatorFactory.create();
        validator.validate(props);
    }

    // static validate(props: Omit<CategoryProperties, 'id' | 'created_at'>) {
    //     ValidatorRules.values(props.name, 'name').required().string().maxLength(255);
    //     ValidatorRules.values(props.description, 'description').string();
    //     ValidatorRules.values(props.is_active, 'is_active').boolean();
    // }

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
