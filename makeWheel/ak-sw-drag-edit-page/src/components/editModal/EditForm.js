import React, {Component} from 'react';
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    TextField,
    withStyles
} from 'material-ui';

import Checkbox from 'material-ui/Checkbox';

const styles = {
    root: {
        width: 800,
        height: 744,
        marginLeft: 600,
        marginTop: 100,
        backgroundColor: '#efefef',
        padding: '88px 50px'
    }
};

class EditForm extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    render() {
        console.log(this.props);
        const checked = true;

        return <FormControl fullWidth={true} className={this.props.classes.root}>
            <FormGroup>
                <TextField id="text" type="text" />
                <TextField id="text" type="text" />
            </FormGroup>
        </FormControl>;
    }
}

export default withStyles(styles)(EditForm);