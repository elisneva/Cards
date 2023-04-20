import { createElement } from "../../createElement.js";

export const showAlert = text => {
    const alertBlock = createElement('div', {
        className: 'alert',
        
    });
    const AlertText = createElement('p', {
        className: 'alert__text',
        textContent: text,
    });
    alertBlock.append(AlertText);
    document.body.append(alertBlock);

    setTimeout(() => {
        alertBlock.classList.add('alert__show');
    });
    setTimeout(() => {
        alertBlock.classList.remove('alert__show');
        setTimeout(() => {
            alertBlock.remove();
        }, 200);
    }, 3000);
    
};
