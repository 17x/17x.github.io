import React from 'react';
import Text from '../EditAbleItems/Text';

export default {
    uniqueBlockKey: 'text-1',
    component: (position, item) =>
        position === 'view' ? <Text item={item} /> : <p>{item.text}</p>

};
