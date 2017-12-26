export const styleFooterItem = {
    item: {
        height: '100%',
        float: 'left',
        lineHeight: '64px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 99999,
        '&:after': {
            content: '" "',
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            borderRight: '1px solid #dfdfdf'
        },
        '&:hover ul': {
            display: 'block'
        }
    },
    commonItem: {
        height: 64,
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 0
    },
    commonHeight: {},
    holderSpan: {
        display: 'block',
        width: '100%',
        height: '100%'
    },
    subWrap: {
        backgroundColor: '#fff',
        width: '100%',
        display: 'none',
        position: 'absolute',
        bottom: 64
    },
    subItem: {
        paddingTop: 0,
        paddingBottom: 0
    }
};