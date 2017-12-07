import React from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import {GridList, GridListTile, GridListTileBar} from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';

import {withStyles} from 'material-ui';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

// const
const HomeTab1 = (props) => {
    let {tab1Data} = props;
    //console.log(tab1Data);
    const {classes} = props;
    return <div>
        {
            (tab1Data && tab1Data.length > 0)
                ? <GridList className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>
                        <Subheader component="div">虚构类</Subheader>
                    </GridListTile>
                    {tab1Data.map((tile, index) =>
                        <GridListTile key={index}>
                            <img src={tile.cover} alt={tile.name} />
                            <GridListTileBar title={<span>{tile.name}</span>}
                                             subtitle={<span>{tile.subTitle}</span>}
                                             actionIcon={
                                                 <IconButton>
                                                     <InfoIcon color="rgba(255, 255, 255, 0.54)" />
                                                 </IconButton>
                                             } />
                        </GridListTile>)}
                </GridList>
                : <p>no result</p>
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

export default withStyles(styles)(HomeTab1);

// export default HomeTab1;