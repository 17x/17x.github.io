export const styleFooterItem = {
    item: {
        height: '100%',
        float: 'left',
        lineHeight: '64px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1000,
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
        paddingBottom: 0,
        overflow: 'hidden'
    },
    level1Icon: {
        width: 30,
        height: 30,
        display: 'block',
        margin: '7px auto 0 auto'
    },
    commonHeight: {},
    holderSpan: {
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
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