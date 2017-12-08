import React from 'react';
import {GridList, GridListTile, GridListTileBar} from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';

import {withStyles} from 'material-ui';

// const
const Tab1 = ({classes, tab1Data1, tab1Data2}) => {

    let dataArr = [];
    tab1Data1 && dataArr.push(tab1Data1);
    tab1Data2 && dataArr.push(tab1Data2);

    return <div>
        {
            dataArr.map((val1, index1) =>
                <GridList key={index1} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{width: '100%', height: 'auto'}}>
                        <Subheader component="div">{index1 === 0 ? '虚构' : '非虚构'}</Subheader>
                    </GridListTile>
                    {val1.data.map((val2, index2) =>
                        <GridListTile key={index2}>
                            <img src={val2.cover} alt={val2.name} />
                            <GridListTileBar title={<span>{val2.name}</span>}
                                             subtitle={<span>{val2.subTitle}</span>}
                                             actionIcon={
                                                 <IconButton>
                                                     <InfoIcon color="rgba(255, 255, 255, 0.54)" />
                                                 </IconButton>
                                             } />
                        </GridListTile>)
                    }
                </GridList>)
        }


    </div>;
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper
    },
    gridList: {
        width: '100%'
        // height: 450
    }
});

export default withStyles(styles)(Tab1);