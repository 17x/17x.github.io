import {green} from 'material-ui/colors/index';

const styles = theme => ({
    homeStyle: {
        height: '100%',
        overflowY: 'auto'
    },
    homeTabsStyle: {
        backgroundColor: green[500],
        minHeight: '30px'
    },
    homeTabStyle: {
        color: '#cfc',
        height: '30px',
        minWidth: '12.4%',
        width: '12.4%',
        fontSize: '12px'
    },
    homeTabStyleActive: {
        color: '#fff'
    }
});

export default styles;