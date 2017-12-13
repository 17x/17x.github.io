import {green} from 'material-ui/colors/index';

const styles = theme => ({
    homeTabsStyle: {
        backgroundColor: green[500],
        minHeight: '30px'
    },
    homeTabStyle: {
        color: '#cfc',
        height: '30px',
        minWidth: '12.4%',
        // width: '12.4%',
        fontSize: '12px'
    },
    homeTabStyleActive: {
        color: '#fff'
    },
    // Screen's height sub APPToolbar's height and homeTabHead's height
    swipeAbleViews: {
        minHeight: window.innerHeight - (56 + 30),
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            minHeight: window.innerHeight - (48 + 30)
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: window.innerHeight - (64 + 30)
        }
    },
    tab1ListItem: {
        width: '100%',
        height: 265
    }
});

export default styles;