export default theme => ({
    root: {
        position: 'relative',
        width: 400,
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
        // marginBottom: 20
    },
    formControl: {
        margin: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    buttonsWrap: {
        width: 300,
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
    }
})