import { Category, CategoryProperties } from './category';
import { omit } from 'lodash';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

// dubles de teste
// stub - fake object
// spyOn - especionar variable, class ou method
// mock - fake object e especionar variable, class ou method

describe("Category Unit Tests", () => {
    beforeEach(() => {
        Category.validate = jest.fn();
    });

    test('constructor of category', () => {
        let category = new Category({ name: "Movie" });
        const props = omit(category.props, 'created_at');
        expect(Category.validate).toHaveBeenCalled();
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true
        });

        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at
        });
        
        expect(category.props).toStrictEqual({
            name: "Movie",
            description: "some description",
            is_active: false,
            created_at
        });

        category = new Category({
            name: "Movie",
            description: "other description"
        });

        expect(category.props).toMatchObject({
            name: "Movie",
            description: "other description"
        });

        category = new Category({
            name: "Movie",
            is_active: true
        });

        expect(category.props).toMatchObject({
            name: "Movie",
            is_active: true
        });

        created_at = new Date();
        category = new  Category({
            name: "Movie",
            created_at
        });

        expect(category.props).toMatchObject({
            name: "Movie",
            created_at
        });        
    });

    test("getter of name field.", () => {
        const category = new Category( { name: "Movie" });
        expect(category.name).toBe("Movie")
    });

    test("getter and setter of description field.", () => {
        let category = new Category( { name: "Movie" });
        expect(category.description).toBeNull()

        category = new Category( { name: "Movie", description: "some description" });
        expect(category.description).toBe("some description");

        category['description'] = "other description";
        expect(category.description).toBe("other description");

        category['description'] = undefined;
        expect(category.description).toBeNull();
    });

    test("getter of is_active field.", () => {
        let category = new Category( { name: "Movie" });
        expect(category.is_active).toBeTruthy()

        category = new Category( { name: "Movie", is_active: false });
        expect(category.description).toBeFalsy();
    });

    test("getter of created_at field.", () => {
        let category = new Category( { name: "Movie" });
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category( { name: "Movie", created_at });
        expect(category.created_at).toBe(created_at);
    })

    test("ID field", () => {
        type CategoryTestData = {
            props: CategoryProperties,
            id?: UniqueEntityId
        }
        
        const data: CategoryTestData[] = [
            { props: { name: "Movie" } },
            { props: { name: "Movie" }, id: null },
            { props: { name: "Movie" }, id: undefined },
            { props: { name: "Movie" }, id: new UniqueEntityId()}
        ]

        data.forEach( i => {
            const category = new Category({ ...i.props }, i.id);
            expect(category.id).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
        })        
    });

    test("update category", () => {
        const arrange = { name: "Movie", description: "some description" };

        const category = new Category(arrange);
        category.update("Movie Updated", "Description Updated");
        
        expect(Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe("Movie Updated");
        expect(category.description).toBe("Description Updated");
    });

    test("activate category", () => {
        const arrange = { name: "Movie", description: "some description", is_active: false };
    
        const category = new Category(arrange);
        category.activate();

        expect(category.is_active).toBeTruthy()
    });

    test("deactive category", () => {
        const arrange = { name: "Movie", description: "some description" };

        const category = new Category(arrange);
        category.deactivate();

        expect(category.is_active).toBeFalsy();
    });
})