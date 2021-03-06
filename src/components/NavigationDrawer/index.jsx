import { memo, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

// providers
import { useNavigationDrawerState } from 'providers/NavigationDrawerProvider';

// components
import NavigationItemCore from './NavigationItem';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Scrollbar from 'components/shared/Scrollbar';

// constnats
import { SPACING, SPACING_DOUBLE } from 'constants/spacing';

// icons
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import ReportsIcon from '@material-ui/icons/AssessmentOutlined';
import ContactIcon from '@material-ui/icons/ContactPhoneOutlined';
import AccountingIcon from '@material-ui/icons/LocalAtmOutlined';
import LinesIcon from '@material-ui/icons/PhoneOutlined';
import SystemSettings from '@material-ui/icons/SettingsOutlined';
import SupportIcon from '@material-ui/icons/HelpOutlineOutlined';
import AuthIcon from '@material-ui/icons/AccountBoxOutlined';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import PackageAndTarifIcon from '@material-ui/icons/ListAltOutlined';
import UserSettings from 'components/shared/icons/UserSetting';
import UsersIcon from '@material-ui/icons/PeopleAltOutlined';

import { APPBAR_HEIGHT, DRAWER_HEADER_HEIGHT } from 'constants/mixins';

export const DRAWER_WIDTH = 250;
export const FOLDED_DRAWER_WIDTH = 64;
export const FOLDED_ANIMATION_DURATION = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: DRAWER_WIDTH,
      minWidth: DRAWER_WIDTH,
    },
  },
  rootFolded: {
    [theme.breakpoints.up('md')]: {
      width: FOLDED_DRAWER_WIDTH,
      minWidth: FOLDED_DRAWER_WIDTH,
    },
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
    marginBottom: theme.spacing(SPACING_DOUBLE),
    padding: theme.spacing(SPACING, 0, SPACING_DOUBLE, 0),
    height: DRAWER_HEADER_HEIGHT,
    flexDirection: 'column',
    position: 'relative',
  },
  appBar: {
    height: APPBAR_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
  },
  drawerPaper: {
    border: 'none',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create(['all'], { duration: FOLDED_ANIMATION_DURATION }),
    // background: theme.palette.sideBar.background,
  },
  drawerFolded: {
    width: FOLDED_DRAWER_WIDTH,
    minWidth: FOLDED_DRAWER_WIDTH,
    position: 'absolute',
    top: 0,
    bottom: 0,
    $drawer: {
      width: FOLDED_DRAWER_WIDTH,
    },
  },
  drawerFoldedOpen: {
    width: DRAWER_WIDTH,
    minWidth: DRAWER_WIDTH,
  },
  drawerFoldedClose: {
    '& $listItem': {
      width: '100%',
      borderRadius: 0,
      '&.active': {
        background: fade(theme.palette.action.active, theme.palette.action.activatedOpacity),
      },
    },
    '& $listItemText': {
      opacity: 0,
    },
    '& $listItemArrow': {
      opacity: 0,
    },
    '& $listItemIcon': {
      paddingLeft: 8,
    },
    '& $avatarWrapper': {
      padding: 0,
      bottom: '50%',
      left: '50%',
      transform: 'translate(-50%,50%)',
    },
    '& $avatar': {
      width: 40,
      height: 40,
    },
    '& $drawerHeaderContent': {
      opacity: 0,
    },
    '& $menuIconWrapper': {
      justifyContent: 'center',
    },
    '& $listItemChildrenClasses': {
      display: 'none',
      background: 'blue',
    },
  },

  listItemIcon: {},
  listItemText: {},
  listItem: {},
  listItemArrow: {},
  menuIconWrapper: {},
  listItemChildrenClasses: {},
  drawerHeaderContent: {
    transition: theme.transitions.create(['opacity']),
    color: theme.palette.primary.contrastText,
  },
  drawerHeaderContentSubtitle: {
    color: fade(theme.palette.primary.contrastText, 0.5),
  },

  content: {
    height: '100%',
    // color: theme.palette.sideBar.color,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },

  list: {
    flex: 1,
  },
  avatarWrapper: {
    background: 'white',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%,50%)',
    borderRadius: '50%',
    padding: 12,
    transition: theme.transitions.create(['transform', 'bottom', 'left', 'top', 'right']),
  },
  avatar: {
    transition: theme.transitions.create(['width', 'height']),
    width: 72,
    height: 72,
  },
}));

const data = [
  {
    text: '??????????????',
    icon: <DashboardIcon />,
    to: '/dashboard',
  },
  {
    text: '?????????? ??????????',
    icon: <SmsIcon />,
    to: '/message/new',
  },

  {
    text: '?????????? ????',
    icon: <ReportsIcon />,
    items: [
      {
        text: '?????????? ????????',
        to: '/reports/normal-sends',
      },
      {
        text: '?????????? ???? ??????????????',
        to: '/reports/contact-sends',
      },
      {
        text: '?????????? ???????? ???? ????????',
        to: '/reports/p2p-sends',
      },

      {
        text: '?????????? ?????? ??????????????',
        to: '/reports/incoming-messages',
      },

      {
        text: '???????? ?????? ????????????',
        to: '/reports/returned-charges',
      },
    ],
  },
  {
    text: '??????????????',
    icon: <ContactIcon />,
    items: [
      {
        text: '???????? ??????????????',
        to: '/contacts/groups',
      },
      {
        text: '???????? ??????????????',
        to: '/contacts',
      },
    ],
  },

  {
    text: '?????????????? ????????????',
    icon: <UserSettings />,
    items: [
      {
        text: '?????????????? ????????????',
        to: '/setting/profile',
      },
      {
        text: '?????????? ???? ?? ???????????? ????',
        to: '/setting/notifications',
      },

      {
        text: '???????? ?? ?????????? ??????????',
        to: '/setting/packages',
      },
      {
        text: '?????? ???????? ??????',
        to: '/setting/drafts',
      },
    ],
  },
  {
    text: '???????? ?? ?????????? ????',
    icon: <PackageAndTarifIcon />,
    items: [
      {
        text: '???????? ?? ?????????? ?????? ????????????',
        to: '/packages-tarifs/defaults',
      },
    ],
  },
  {
    text: '???????????? ????????',
    icon: <AccountingIcon />,
    items: [
      {
        text: '???????????? ?????? ????????',
        to: '/accounting/transactions',
      },
      {
        text: '???????? ???????????? ????',
        to: '/accounting/payments',
      },
      {
        text: '???????? ?????? ??????',
        to: '/accounting/wallet',
      },
      {
        text: '???????? ???????????? ??????????',
        to: '/accounting/message-credit',
      },
      {
        text: '???????? ?? ??????????',
        to: '/accounting/gateway-account',
      },
    ],
  },
  {
    text: '???????????? ??????????????',
    icon: <UsersIcon />,
    items: [
      {
        text: '???????? ??????????????',
        to: '/user-manager/users',
      },
    ],
  },
  {
    text: '???????????? ????????',
    icon: <LinesIcon />,
    items: [
      {
        text: '???????? ????????',
        to: '/lines',
      },
      {
        text: '?????????? ????',
        to: '/lines/order',
      },
    ],
  },
  {
    text: '?????????????? ??????????',
    icon: <SystemSettings />,
    items: [
      {
        text: '?????????????? ????',
        to: '/system/webservices',
      },
      {
        text: '??????????????',
        to: '/system/branding',
      },
    ],
  },

  {
    text: '?????????? ????????',
    icon: <AuthIcon />,
    items: [
      {
        text: '?????????? ????????',
        to: '/authentication',
      },
      {
        text: '???????????? ?????????? ????????',
        to: '/auth-process',
      },
    ],
  },

  {
    text: '????????????????',
    icon: <SupportIcon />,
    items: [
      {
        text: '???????? ???????? ????',
        to: '/support/tickets',
      },
      {
        text: '?????????? ?????????? ????',
        to: '/support/notifications',
      },
    ],
  },
];

/**
 * @component NavigationDrawer
 */
function NavigationDrawer() {
  const classes = useStyles();
  const [navigationDrawer, setNavigationDrawer] = useNavigationDrawerState();
  const [animationLoading, setAnimationLoading] = useState(false);

  const [openMenu, setOpenMenu] = useState(-1);

  const hanldeFolded = () => {
    setNavigationDrawer((prevState) => ({ ...prevState, folded: !prevState.folded }));
  };

  const handleDrawerToggle = () => {
    setNavigationDrawer((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  const handleFoldedDrawerEnter = () => {
    if (navigationDrawer.folded) {
      setAnimationLoading(true);
      setNavigationDrawer((prevState) => ({ ...prevState, foldedOpen: true }));
      const timeout = setTimeout(() => {
        onFoldedAnimationOpenEnded();
        clearTimeout(timeout);
      }, FOLDED_ANIMATION_DURATION + 100);
    }
  };

  const handleFoldedDrawerLeave = () => {
    if (navigationDrawer.folded) {
      setAnimationLoading(true);
      setNavigationDrawer((prevState) => ({ ...prevState, foldedOpen: false }));
    }
  };

  const handleMenuItemClick = (index) => {
    if (openMenu === index) setOpenMenu(-1);
    else setOpenMenu(index);
  };

  const onFoldedAnimationOpenEnded = () => {
    setAnimationLoading(false);
  };

  const renderDrawerContent = (
    <div className={classes.content}>
      <AppBar color="primary" position="relative" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Hidden smDown>
            <Box
              display="flex"
              justifyContent="flex-end"
              width="100%"
              className={classes.menuIconWrapper}
            >
              <IconButton color="inherit" onClick={hanldeFolded}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>

      <div className={classes.drawerHeader}>
        <div className={classes.drawerHeaderContent}>
          <Typography noWrap align="center" color="inherit">
            ???????? ?????????? ????????
          </Typography>
          <Typography
            noWrap
            variant="body2"
            align="center"
            gutterBottom
            className={classes.drawerHeaderContentSubtitle}
          >
            ???? ???????????? ?????? ??????????
          </Typography>

          <Typography
            className={classes.drawerHeaderContentSubtitle}
            variant="body2"
            align="center"
          >{`?????????? ${new Date().toLocaleDateString('fa-IR')}`}</Typography>
        </div>

        <div className={classes.avatarWrapper}>
          <Avatar className={classes.avatar}>M</Avatar>
        </div>
      </div>

      <Scrollbar disabled={animationLoading}>
        <List className={classes.list}>
          {data.map((item, key) => {
            return (
              <NavigationItemCore
                onClick={() => handleMenuItemClick(key)}
                open={openMenu === key}
                disabled={item.diabled}
                classes={{
                  listItemIcon: classes.listItemIcon,
                  listItemText: classes.listItemText,
                  listItem: classes.listItem,
                  listItemArrow: classes.listItemArrow,
                  listItemChildrenClasses: classes.listItemChildrenClasses,
                }}
                key={key}
                {...item}
              />
            );
          })}
        </List>
      </Scrollbar>
    </div>
  );

  const rootClasses = clsx(classes.root, { [classes.rootFolded]: navigationDrawer.folded });
  const drawerClasses = clsx(classes.drawerPaper, {
    [classes.drawerFolded]: navigationDrawer.folded,
    [classes.drawerFoldedOpen]: navigationDrawer.folded && navigationDrawer.foldedOpen,
    [classes.drawerFoldedClose]: navigationDrawer.folded && !navigationDrawer.foldedOpen,
  });

  return (
    <div className={rootClasses}>
      <Hidden mdUp implementation="js">
        <Drawer
          elevation={2}
          variant="temporary"
          disablePortal
          open={navigationDrawer.open}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {renderDrawerContent}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="js">
        <Drawer
          onMouseEnter={handleFoldedDrawerEnter}
          onMouseLeave={handleFoldedDrawerLeave}
          PaperProps={{
            elevation: 2,
            variant: 'elevation',
          }}
          elevation={2}
          classes={{
            paper: drawerClasses,
          }}
          variant="permanent"
          open
        >
          {renderDrawerContent}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default memo(NavigationDrawer);
