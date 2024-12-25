import React from 'react';
import {connect} from 'react-redux';
import {filterTodo} from '../actions';

let FilterTodo = ({dispatch, filter}) => {
    console.log(filter);
    const items = [
            {filterType: 'SHOW_ALL', text: 'All'},
            {filterType: 'SHOW_ACTIVE', text: 'Active'},
            {filterType: 'SHOW_COMPLETE', text: 'Complete'}
        ],
        style1 = {},
        style2 = {float: 'left', listStyle: 'none', margin: '0 5px', color: 'blue', cursor: 'pointer'},
        style3 = {float: 'left', listStyle: 'none', margin: '0 5px'};

    return <ul>
        {items.map((val, index) =>
            val.filterType === filter
                ? <li key={index} style={style3}>{val.text}</li>
                : <li key={index} style={style2} onClick={() => {dispatch(filterTodo(val.filterType));}}>{val.text}</li>
        )}
    </ul>;
};

const mapStateToProps = (state) => ({
    filter: state.filter
});

FilterTodo = connect(mapStateToProps)(FilterTodo);

export default FilterTodo;