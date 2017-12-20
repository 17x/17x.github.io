import React, {Component} from 'react';
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    TextField,
    withStyles,
    Button
} from 'material-ui';

const styles = theme => ({
    root: {
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
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    buttonSubmit: {
        margin: theme.spacing.unit
    },
    buttonCancel: {}
});

const textFiledList = [
    {
        id: 'width',
        label: '宽'

    },
    {
        id: 'height',
        label: '高'

    },
    {
        id: 'top',
        label: '顶部'

    },
    {
        id: 'right',
        label: '右边'

    },
    {
        id: 'right',
        label: '底部'

    },
    {
        id: 'right',
        label: '左边'

    },
    {
        id: 'background',
        label: '背景图地址'

    },
    {
        id: 'url',
        label: '指向地址'

    }
];

class EditForm extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        style: null
    });

    componentDidMount(){
        console.log(this.props);

    }
    handleChange = name => event => {
        //this.setState({[name]: event.target.checked});
    };

    render() {
        const checked = true,
            {classes} = this.props;

        return <form className={classes.root}>
            <h2 className={classes.title}>编辑</h2>
            {textFiledList.map((val, index) =>
                <TextField
                    key={index}
                    id={val.id}
                    label={val.label}
                    margin="normal"
                    className={classes.textField}
                />)
            }
        </form>;
    }
}

export default withStyles(styles)(EditForm);