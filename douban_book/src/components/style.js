export default theme => {
    console.log(theme);
    return {
        root: {
            marginTop: theme.spacing.unit * 3,
            width: '100%'
        },
        flex: {
            flex: 1
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20
        },
        active: {
            backgroundColor: '#dfdfdf'
        },
        commonHeaderStyle: {
            position: 'fixed',
            top: 0,
            left: 'auto',
            right: 0,
            boxShadow: 'none'
        },
        contentStyle: {
            width: '100%',
            paddingTop: 56,
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
                paddingTop: 48
            },
            [theme.breakpoints.up('sm')]: {
                paddingTop: 64
            }
        },
        globalScrollToTopButton: {
            position: 'fixed',
            bottom: '10%',
            right: '5%',
            zIndex: 10
        }
    };
};