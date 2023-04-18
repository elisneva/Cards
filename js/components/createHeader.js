import { createElement } from "../../createElement.js";
export const createHeader = (parent) => {

    //create of elements/give a class
    const container = createElement('div', {
        className: 'container',
        
    });
//paste element to parent element
    parent.append(container);

    const headerLogoLink = createElement('a',{
        href: '#',
        className:'header__logo-link',
    })
    //paste image
    const logo = createElement('img', {
        src : '/img/logo.svg',
        className : 'header__logo',
        alt: 'Logo'
    });
    

    headerLogoLink.append(logo);
    const headerTitle = createElement('h2', {
        className: 'header__subtitle',
        textContent: 'Category'
    })
    const headerBtn = createElement('button', {
        className: 'header__btn',
        textContent: 'Add category',
    })
    container.append(headerLogoLink, headerTitle, headerBtn);
    const updateHeaderTitle = title => {
        headerTitle.textContent = title;
    }
    //for working in future with these elements
    return {
        headerLogoLink, headerBtn, updateHeaderTitle
    }
}