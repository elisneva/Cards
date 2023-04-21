import { createElement } from "../../createElement.js";
const Title = 'enter the name of category';
export const createEditCategory = (app) => {
    const editCategory = createElement('section', {
        className: 'edit section-offset',
        
    });
    const container = createElement('div', {
        className: 'container edit__container',
    });
    const title = createElement('h2', {
        className: 'edit__title',
        contentEditable: true,
        title: 'Can edit',
    });
    const table = createElement('table', {
        className: 'edit__table table',
    });
    const thead = createElement('thead');
    const trthead = createElement('tr');
    const tableHeadCellOne = createElement('th', {
        className: 'table__cell',
        textContent: 'main'
    });
    const tableHeadCellTwo = createElement('th', {
        className: 'table__cell',
        textContent: 'Second'
    });
    const tableHeadCellEmpty = createElement('th', {
        className: 'table__cell',
    });
    const tbody = createElement('tbody');

    const btnWrapper = createElement('div', {
        className: 'edit__btn-wrapper',
    });
    const btnAddRow = createElement('button', {
        className: 'edit__btn edit__add-row',
        textContent: 'Add words',
    });
    const btnSave = createElement('button', {
        className: 'edit__btn edit__save',
        textContent: 'Save',
    });
    const btnCancel = createElement('button', {
        className: 'edit__btn edit__cancel',
        textContent: 'Cancel',
    });

    editCategory.append(container);
    table.append(thead, tbody);
    thead.append(trthead);
    trthead.append(tableHeadCellOne, tableHeadCellTwo, tableHeadCellEmpty);
    btnWrapper.append(btnAddRow, btnSave, btnCancel);
    container.append(title, table, btnWrapper);

    const createTRCell = (dataArr) => {
        const tr = createElement('tr');

        const tableCellMain = createElement('td', {
            className: 'table__cell table__cell_one',
            textContent: dataArr[0],
            contentEditable: true,
        });
        const tableCellTwo = createElement('td', {
            className: 'table__cell table__cell_two',
            textContent: dataArr[1],
            contentEditable: true,
        });
        const tableCellDel = createElement('th', {
            className: 'table__cell',
        });
        const delRow = createElement('button', {
            className: 'table__del',
            textContent: 'x',
        });
        delRow.addEventListener('click', () => {
            if (confirm('Are you sure to remove this row?')) {
                tr.remove();
            }
        });
        tableCellDel.append(delRow);
        tr.append(tableCellMain, tableCellTwo, tableCellDel);
        return tr;
    }

    const clearTitle = () => {
        if (title.textContent === Title) {
            title.textContent = '';
        }
    };
    const checkTitle = () => {
        if (title.textContent === '') {
            title.textContent = Title;
        }
    };
    title.addEventListener('focus', clearTitle);
    title.addEventListener('blur', checkTitle);
    
    btnAddRow.addEventListener('click', () => {
        const emptyRows = createTRCell(['', '']);
        tbody.append(emptyRows);
    })
    const parseData = () => {
        const cellsMain = document.querySelectorAll('.table__cell_one');
        const cellsSecond = document.querySelectorAll('.table__cell_two');
        const data = {
            pairs: [],
        };

        for (let i = 0; i < cellsMain.length; i += 1){
            const textMain = cellsMain[i].textContent.trim()
            const textSecond = cellsSecond[i].textContent.trim()
            if (textMain && textSecond) {
                data.pairs.push([textMain,textSecond]);
            }
        }
        
        if (title.textContent.trim() && title.textContent !== Title) {
            data.title = title.textContent.trim()
        };

        if (btnSave.dataset.id) {
            data.id = btnSave.dataset.id;
        };

        return data;
}
    const mount = (data = { title: Title, pairs: [] }) => {
        tbody.textContent = '';
        title.textContent = data.title;
        if (title.textContent === Title) {
            title.classList.add('edit__title_change');
        } else {
            title.classList.remove('edit__title_change');
        }

        const rows = data.pairs.map(createTRCell);
        const emptyRows = createTRCell(['', '']);
        tbody.append(...rows, emptyRows);

        btnSave.dataset.id = data.id ? data.id : '';
        app.append(editCategory);
    };

    const unmount = () => {
        editCategory.remove();
    };
    return { mount, unmount, parseData, btnSave, btnCancel }
};