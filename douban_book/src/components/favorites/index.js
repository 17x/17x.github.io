import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import DeleteIcon from 'material-ui-icons/Delete';
import {ListItemIcon, ListItemText} from 'material-ui/List';

import {setTitle} from '../../actions';
import GlobalHeaderSecond from '../global/GlobalHeaderSecond';

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({anchorEl: null});
    };

    componentDidMount() {
        this.props.dispatch(setTitle('Favorites'));
    }

    render() {

        /*
            let {transition} = this.props;

          // access the state we navigated from
          let prevState = transition.from();
          let prevParams = transition.params('from');

          // navigate to the state
          transition.router.stateService.go(prevState, prevParams);
         */
        const open = Boolean(this.state.anchorEl),
            customizeArea = <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu id="long-menu"
                      anchorEl={this.state.anchorEl}
                      open={open}
                      onRequestClose={this.handleRequestClose}
                      PaperProps={{
                          style: {
                              maxHeight: 48 * 4.5
                          }
                      }}>
                    <MenuItem onClick={this.handleRequestClose}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="delete" />
                    </MenuItem>
                </Menu>
            </div>;

        return <div className="favorites">
            <GlobalHeaderSecond customizeArea={customizeArea} />
            <Button raised>hello favorites !</Button>
            <p style={{height: 2000}}>test area</p>
        </div>;
    }
}

const FavoritesApp = connect()(Favorites);

// export default withStyles(homeStyles)(HomeApp);

export default FavoritesApp;