import React from 'react';

import {connect} from 'react-redux';
import {filterTodo} from '../actions';

const style = {marginRight: '5px'};
let Footer = ({dispatch}) => <p>
    {['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETE'].map(
        (val, index) => <span key={index}
                              style={style}
                              onClick={() => {dispatch(filterTodo(val));}}>{val}</span>
    )}
</p>;

Footer = connect()(Footer);

export default Footer;
