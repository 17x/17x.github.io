import {createMuiTheme} from 'material-ui/styles';

import purpleColor from 'material-ui/colors/purple';
import greenColor from 'material-ui/colors/green';
import redColor from 'material-ui/colors/red';

const createTheme = color => createMuiTheme({palette: {primary: color}});

export const [purple, green, red] = [
    purpleColor, greenColor, redColor].map(val => createTheme(val)
);