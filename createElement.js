//create elements on page
export const createElement = (tag, options) => {
    const element = document.createElement(tag);
    //optoins replace in element
    return Object.assign(element, options);
}