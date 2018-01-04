export default theme => ({
    root: {
        position: 'relative',
        width: 540,
        height: 744,
        marginLeft: 600,
        marginTop: 100,
        backgroundColor: '#efefef',
        padding: '20px 50px 88px 50px',
        display: 'flex',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 25,
        width: '100%'
    },
    formControl: {
        margin: theme.spacing.unit
    },
    textFieldWrap: {
        height: 600,
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: '20px 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    switch: {
        width: '100%'
    },
    buttonsWrap: {
        width: 440,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20
    },
    buttonApply: {
        // marginRight: theme.spacing.unit
    },
    buttonSave: {
        // marginLeft: theme.spacing.unit
    },
    buttonCancel: {},
    buttonClose: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    chipsWrap: {
        /*display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',*/
        '&>div': {
            float: 'left'
        }
    },
    chip: {
        margin: theme.spacing.unit / 2
    },
    chipImg: {
        '&>img': {
            height: '100%'
        }
    }
})