import { useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

// components
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: ({ randomColor }) => ({
    background: `#${randomColor}`,
    color: theme.palette.getContrastText(`#${randomColor}`),
  }),
}));

/**
 * @component UserWithAvatar
 */
function UserWithAvatar({ username, avatar, id }) {
  const randomColor = useMemo(() => Math.floor(Math.random() * 16777215).toString(16), []);

  const classes = useStyles({ randomColor });

  return (
    <ListItem component="div" disableGutters>
      <ListItemAvatar>
        <Avatar className={classes.avatar} alt={username} src={avatar}>
          {username?.slice(0, 1)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={username} secondary={id} />
    </ListItem>
  );
}

export default UserWithAvatar;
