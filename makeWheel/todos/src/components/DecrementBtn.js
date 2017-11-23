import React from 'react';

export default ({onClick}) => {
    return <button type="button"
                   onClick={onClick}>
        Decrement
    </button>;
};