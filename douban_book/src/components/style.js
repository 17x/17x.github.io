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
            boxShadow: 'none'
        },
        contentStyle: {
            position: 'absolute',
            width: '100%',
            top: 56,
            bottom: 0,
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
                top: 48
            },
            [theme.breakpoints.up('sm')]: {
                top: 64
            }
        }
    };
};