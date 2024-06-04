import { Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

const UserAuthorizationSwitch = withStyles({
  switchBase: {
    '&$checked + $track': {
      backgroundColor: green[300],
    },
  },
  thumb: {
    boxShadow: 'none',
    backgroundColor: red[500],
  },
  track: {
    backgroundColor: red[300],
  },
  checked: {
    '& $thumb': {
      backgroundColor: green[500],
    },
  },
})(Switch);

export { UserAuthorizationSwitch };
