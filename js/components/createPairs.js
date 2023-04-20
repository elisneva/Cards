import { createElement } from "../../createElement.js"
import { showAlert } from "./showAlert.js";

export const createPairs = (app) => {
    const pairs = createElement('section', {
        className: 'card section-offset',
    });
    const container = createElement('div', {
        className: 'container card__container',
    });
    const btnReturn = createElement('button', {
        className: 'card__return',
        areaLabel: 'Return to categories',
    });
    const buttonCard = createElement('button', {
        className: 'card__item',
    });
    const front = createElement('span', {
        className: 'card__front',
        textContent: 'one'
    });
    const back = createElement('span', {
        className: 'card__back',
        textContent: 'two'
    });
    buttonCard.append(front, back);
    container.append(btnReturn, buttonCard);
    pairs.append(container);

    const cardControler = data => {

        let index = 0;

        front.textContent = data[index][0];
        back.textContent = data[index][1];

        const flipCard = () => {
            buttonCard.classList.add('card__item_flipped');
            buttonCard.removeEventListener('click', flipCard);
            setTimeout(() => {
                buttonCard.classList.remove('card__item_flipped');
                setTimeout(() => {
                    index++;
                    if (index === data.length) {
                        front.textContent = 'The end';
                        showAlert('Back to main');
                        setTimeout(() => {
                            btnReturn.click();
                        }, 2000);
                        return
                    }
                    front.textContent = data[index][0];
                    back.textContent = data[index][1];
                    setTimeout(() => {
                        buttonCard.addEventListener('click', flipCard);
                    },200)
                 }, 100);
            }, 1000)
        };
        buttonCard.addEventListener('click', flipCard);
    }

    const mount = data => {
        app.append(pairs);
        cardControler(data.pairs);
    };
    const unmount = data => {
        pairs.remove();
    };
    return { btnReturn, mount, unmount };
};