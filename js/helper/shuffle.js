export const shuffleArray = array => {

    for (let i = array.length - 1; i > 0; i -= 1){
        const randomNum = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNum]] = [array[randomNum], array[i]];
    }
    return array;
};