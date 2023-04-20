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
        
        const btnCard = createElement('button', {
            className: 'category__card',
        });
        const titleText = createElement('span', {
            className: 'category__title',
            textContent: data.title,
        });

        const countPairs = createElement('span', {
            className: 'category__pairs',
            textContent: `${data.length} words`
        });
        btnCard.append(titleText, countPairs);
        const btnEdit = createElement('button', {
            className: 'category__btn category__edit',
            ariaLabel: 'edit',
        });
        const btnDel = createElement('button', {
            className: 'category__btn category__del',
            ariaLabel: 'del',
        });

        item.append(btnCard, btnEdit, btnDel);

        return item;
    }
    container.append(categoryList);
//create block
    const mount = (data) => {
        categoryList.textContent = '';
        const cards = data.map(createCategoryCards);
        categoryList.append(...cards);
        app.append(category);
    };
    //quitar el block
    const unmount = () => {
        category.remove();
    }
    return{mount,unmount, categoryList}
}