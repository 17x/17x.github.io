let count = 0;

export const increment = () => ({
    type: 'INCREMENT'
});

export const decrement = () => ({
    type: 'DECREMENT'
});

export const changeCountTo = (num) => ({
    type: 'CHANGE',
    count: num
});