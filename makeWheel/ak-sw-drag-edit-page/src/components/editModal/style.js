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
        width: '100%',
        marginBottom: 20
    },
    formControl: {
        margin: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    buttonApply: {
        // margin: theme.spacing.unit
        marginTop: 50,
        marginLeft: 10

    },
    buttonSave: {
        marginLeft: 150
    },
    buttonCancel: {},
    buttonClose: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})