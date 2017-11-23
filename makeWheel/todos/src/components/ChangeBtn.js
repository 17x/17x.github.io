import React from 'react';

export default ({onClick}) => {
    return <div><input type="text" />
        <button type="button"
                onClick={onClick}>
            Change
        </button>
    </div>;
};