import React from 'react';

export default ({onClick}) => {
    let input;
    return <div>
        <input type="text" ref={
            node => input = node
        } />
        <button type="button"
                onClick={() => {
                    if (input.value.trim()) {
                        onClick(Number(input.value));
                    }
                }}>
            Change
        </button>
    </div>;
};