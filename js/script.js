import { createHeader } from "./components/createHeader.js";
import { fetchCategories } from "./service/api.service.js";
import { createCategory } from "./components/createCategory.js";

const init = async () => {
    //get elements from the page
    const headerParent = document.querySelector('.header');
    const app = document.querySelector('#app');

    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(app);
    
    //quitar # cuando renovamos la pagina y cursor esta en logo
    const returnIndex = async e => {
        e?.preventDefault()
        //асинк в ините/returnIndex поэтому эвейт тут, чтобы получать сразу массив
        const categories = await fetchCategories();
        if (categories.error) {
            app.append(createElement('p', {
                className: 'server-error',
                textContent: 'error',
            }));
            return;
        }
        categoryObj.mount(categories);
    };

    returnIndex();
   
    headerObj.headerLogoLink.addEventListener('click', returnIndex);
    //when we stand in the main Category when we go to smth and return to main Category
    headerObj.headerBtn.addEventListener('click', () => {
    categoryObj.unmount();
        headerObj.updateHeaderTitle('New Category');
    });
    //function for header, rellenar los elementos para header, al dentro se crea los children
    
};

init();