import { createHeader } from "./components/createHeader.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "./service/api.service.js";
import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createPairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";

const init = async () => {
    //get elements from the page
    const headerParent = document.querySelector('.header');
    const app = document.querySelector('#app');

    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(app);
    const editCategoryObj = createEditCategory(app);
    const pairsObj = createPairs(app);

    const allSectionUnmount = () => {
        [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());
    }
    const postHandler = async () => {
        const data = editCategoryObj.parseData();
        const dataCategories = await fetchCreateCategory(data);
        if (dataCategories.error) {
            showAlert(dataCategories.error.message);
            return;
        }
        showAlert(`New Category ${data.title} added`);
        allSectionUnmount();
        headerObj.updateHeaderTitle('Category');
        categoryObj.mount(dataCategories);
    }
    const patchHandler = async () => {
        const data = editCategoryObj.parseData();
        const dataCategories = await fetchEditCategory(editCategoryObj.btnSave.dataset.id, data);
        if (dataCategories.error) {
            showAlert(dataCategories.error.message);
            return;
        }
        showAlert(`Category ${data.title} updated`);
        allSectionUnmount();
        headerObj.updateHeaderTitle('Category');
        categoryObj.mount(dataCategories);
    }
    //quitar # cuando renovamos la pagina y cursor esta en logo
    const returnIndex = async e => {
        e?.preventDefault();
        allSectionUnmount();
        //асинк в ините/returnIndex поэтому эвейт тут, чтобы получать сразу массив
        const categories = await fetchCategories();
        headerObj.updateHeaderTitle('Category');
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
        allSectionUnmount();
        headerObj.updateHeaderTitle('New Category');
        editCategoryObj.mount();
        editCategoryObj.btnSave.addEventListener('click', postHandler);
        editCategoryObj.btnSave.removeEventListener('click', patchHandler);
    });
    
    categoryObj.categoryList.addEventListener('click', async ({ target }) => {
        const categoryItem = target.closest('.category__item');
        if (target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle('Edit');
            editCategoryObj.mount(dataCards);
            editCategoryObj.btnSave.addEventListener('click', patchHandler);
            editCategoryObj.btnSave.removeEventListener('click', postHandler);
            return;
        }
        if (target.closest('.category__del')) {
            if (confirm('Are you sure to want delete this category?')) {
                const result = fetchDeleteCategory(categoryItem.dataset.id);
                if (result.error) {
                    showAlert(result.error.message);
                    return
                }
                showAlert('Deleted');
                categoryItem.remove();
            }
            
            return;
        }
        if (categoryItem) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle(dataCards.title);
            pairsObj.mount(dataCards);
        }
    });

    pairsObj.btnReturn.addEventListener('click', returnIndex);
    
};

init();