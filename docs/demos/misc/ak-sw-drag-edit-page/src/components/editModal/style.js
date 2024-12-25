export default theme => ({
    root: {
        position: 'absolute',
        width: 540,
        height: 744,
        // left: 600,
        top:50,
        right: 100,
        backgroundColor: '#efefef',
        padding: '20px 50px 88px 50px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
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
    inlineSelect: {
        width: 182,
        margin: theme.spacing.unit,
        marginTop: 16
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    },
    textFieldWithImgChoose: {
        width:'100%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    textFieldImg: {
        maxWidth: 360,
        width: '86%'
    },
    editItem: {
        width: '100%'
    },
    imgChoose: {
        marginLeft: 15
    },
    switch: {
        width: '100%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    switchRow: {
        marginLeft: -5
    },
    buttonsWrap: {
        width: 440,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20
    },
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