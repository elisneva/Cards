import { createElement } from "../../createElement.js";

export const createCategory = (app) => {
    const category = createElement('section', {
        className: 'category section-offset',
    });

    const container = createElement('div', {
        className: 'container',
    });
    category.append(container);

    const categoryList = createElement('ul', {
        className: 'category__list',
    });
    //varios li element for that we create this
    const createCategoryCards = (data) => {
        const item = createElement('li', {
            className: 'category__item',
        });
        item.dataset.id = data.id;
        //function creating html cards//TOO DO
        return item;
    }
    container.append(categoryList);
//create block
    const mount = (data) => {
        categoryList.textContent = '';
        app.append(category);
        const cards = data.map(createCategoryCards);
        categoryList.append(...cards);
    };
    //quitar el block
    const unmount = () => {
        category.remove();
    }
    return{mount,unmount, categoryList}
}