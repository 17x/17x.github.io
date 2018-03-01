import React from 'react';
import Text from '../EditAbleItems/Text';

export default {
    uniqueBlockKey: 'text-1',
    text: 'text-1',
    component: ({position, item, setEditing}) =>
        position === 'view'
            ? <Text item={item} position={position} setEditing={setEditing} />
            : <p>{item.text}</p>
};
