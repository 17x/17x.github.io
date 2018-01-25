export default {
    root: {
        border: '1px dashed transparent',
        '&:hover': {
            borderColor: '#000'
        },
        '&:hover span': {
            display: 'block'
        }
    },
    handleResize: {
        position: 'absolute',
        display: 'none',
        width: 10,
        height: 10,
        right: -1,
        bottom: -1,
        cursor: 'nwse-resize',
        border: '1px solid #dfdfdf',
        backgroundColor: '#d4d4d4'
    },
    rootHover: {
        borderColor: '#171717',
        zIndex: '9999!important'
    },
    subImg: {
        display: 'block',
        width: '100%',
        height: 'auto',
        margin: '0 auto'
    },
    subImgStretch: {
        width: '100%',
        height: '100%'
    },
    sliderClass: {
        height: '100%',
        '&>div': {
            height: '100%'
        },
        '&>div>div': {
            height: '100%'
        }
    },
    sliderDot: {
        bottom: 0
    }
};
