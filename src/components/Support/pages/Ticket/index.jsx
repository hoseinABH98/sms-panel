import { makeStyles } from '@material-ui/core/styles';

// components
import { ChatMessage, TicketHeader } from '../../components';
import PageWithTitle from 'components/shared/PageWithTitle';
import Input from 'components/shared/Input';
import LoadingButton from 'components/shared/LoadingButton';
import Typography from 'components/shared/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';

// constants
import { SPACING, SPACING_HALF, SPACING_LEAST, SPACING_THIRD } from 'constants/spacing';

// icons
import SupportIcon from '@material-ui/icons/Help';
import PersonIcon from '@material-ui/icons/PersonOutline';
import ListIcon from '@material-ui/icons/ListAlt';
import TreeIcon from '@material-ui/icons/AccountTreeOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PhoneIcon from '@material-ui/icons/PhoneIphoneOutlined';
import InboxIcon from '@material-ui/icons/MoveToInboxOutlined';
import DraftIcon from '@material-ui/icons/DraftsOutlined';
import MarkAsRead from 'components/shared/icons/MarkAsRead';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(SPACING),
    paddingBottom: theme.spacing(SPACING),
  },
  form: {
    padding: theme.spacing(SPACING),
    marginTop: theme.spacing(SPACING_HALF),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(SPACING_HALF),
      marginTop: theme.spacing(SPACING),
    },
  },
  chatSection: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
  input: {
    textAlign: 'center',
    height: 4,
  },
  selectInput: {
    marginTop: theme.spacing(SPACING_LEAST),
  },
  avatar: {
    width: 72,
    height: 72,
    marginBottom: theme.spacing(SPACING_THIRD),
  },
  profileSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderLeft: '1px solid #ddd',
    [theme.breakpoints.down('md')]: {
      borderLeft: 'none',
      marginBottom: theme.spacing(SPACING_THIRD),
      borderBottom: '1px solid #ddd',
    },
  },
  textWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(SPACING_LEAST),
  },
  icon: {
    marginRight: theme.spacing(SPACING_THIRD),
    color: theme.palette.text.secondary,
  },
  chatList: {
    maxHeight: 300,
    overflowY: 'auto',
  },
}));

/**
 * @component Ticket
 */
function Ticket() {
  const classes = useStyles();

  return (
    <PageWithTitle title="????????????????" contentTitle="???????? ????" icon={SupportIcon}>
      <div className={classes.root}>
        <TicketHeader />
        <Paper variant="outlined" className={classes.form}>
          <Grid container spacing={SPACING_HALF} className={classes.chatSection}>
            <Grid item xs={12} lg={9}>
              <Grid container spacing={SPACING}>
                <Grid item xs={12} lg={11}>
                  <Grid container spacing={SPACING} className={classes.chatList}>
                    <Grid item xs={12}>
                      <ChatMessage
                        time="?????????? ?????? ???? 10 ?????? 3 ???????? ??????"
                        topic="???????? ????????"
                        avatar={`https://randomuser.me/api/portraits/men/46.jpg`}
                      >
                        <Typography lineHeight={20}>
                          ???????? ?????? ???????? ?????? ?????????? ?????? ???? ???????????? ???? ???????? ?? ?????????????? ???????? ???????? ??
                          ???? ???????? ???????? ???? ?????????? ??????????
                        </Typography>
                      </ChatMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <ChatMessage
                        myMessage
                        time="?????????? ?????? ???? 10 ?????? 3 ???????? ??????"
                        avatar={`https://randomuser.me/api/portraits/men/29.jpg`}
                      >
                        <Typography lineHeight={20}>
                          ???????? ?????? ???????? ?? ???? ?????? ???????? ?????? ???? ?????? ?????????? ???? ?????????????? ?????? ??????????
                          ?????????? ?????? ?? ?????????? ?????????? ?????? ???????????? ???? ???????? ???????????????? ???? ???????? ?????????? ??????
                          ?????? ??????????.
                        </Typography>
                      </ChatMessage>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={SPACING_LEAST}>
                    <Grid item xs={12} md={9}>
                      <Input
                        fullWidth
                        label="?????? ????????"
                        multiline
                        rows={9}
                        placeholder="???????? ???????? ?????? ???? ?????????? ???????? ????????"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        disableClearable
                        options={[{ title: '????????????' }, { title: '????????' }, { title: '????' }]}
                        classes={{
                          input: classes.input,
                        }}
                        getOptionLabel={(option) => option.title}
                        defaultValue={{ title: '????????????' }}
                        renderInput={(params) => (
                          <Input label="????????????" {...params} fullWidth />
                        )}
                      />
                      <Autocomplete
                        disableClearable
                        options={[
                          { title: '???? ?????? ??????????' },
                          { title: '???? ??????' },
                          { title: '?????????? ??????????' },
                          { title: '?????????? ????????' },
                        ]}
                        className={classes.selectInput}
                        classes={{
                          input: classes.input,
                        }}
                        getOptionLabel={(option) => option.title}
                        defaultValue={{ title: '???? ??????' }}
                        renderInput={(params) => <Input label="??????????" {...params} fullWidth />}
                      />
                      <Autocomplete
                        disableClearable
                        className={classes.selectInput}
                        options={[{ title: '??????' }, { title: '??????' }]}
                        classes={{
                          input: classes.input,
                        }}
                        getOptionLabel={(option) => option.title}
                        defaultValue={{ title: '??????' }}
                        renderInput={(params) => (
                          <Input label="?????????? ??????????" {...params} fullWidth />
                        )}
                      />
                      <LoadingButton
                        className={classes.selectInput}
                        fullWidth
                        size="small"
                        variant="contained"
                        color="success"
                      >
                        ?????????? ????????
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={3} className={classes.profileSection}>
              <Avatar
                className={classes.avatar}
                alt="user avatar"
                src={`https://randomuser.me/api/portraits/men/46.jpg`}
              />
              <div className={classes.userInfo}>
                <div className={classes.textWithIcon}>
                  <PersonIcon className={classes.icon} />
                  <Typography variant="oveline">???????? ??????????</Typography>
                </div>
                <div className={classes.textWithIcon}>
                  <ListIcon className={classes.icon} />
                  <Typography variant="oveline">??????????</Typography>
                </div>
                <div className={classes.textWithIcon}>
                  <TreeIcon className={classes.icon} />
                  <Typography variant="oveline">???????? 1</Typography>
                </div>
                <div className={classes.textWithIcon}>
                  <MailIcon className={classes.icon} />
                  <Typography variant="oveline">mohammad@gmail.com</Typography>
                </div>
                <div className={classes.textWithIcon}>
                  <PhoneIcon className={classes.icon} />
                  <Typography variant="oveline">09175594952</Typography>
                </div>
                <div className={classes.textWithIcon}>
                  <InboxIcon className={classes.icon} />
                  <Typography variant="oveline">???????? ?????? ???????????? 4 ??????</Typography>
                </div>
                <div className={classes.textWithIcon}>
                  <DraftIcon className={classes.icon} />
                  <Typography variant="oveline">???????? ?????? ???? ???????? 1 ??????</Typography>
                </div>
                <div className={classes.textWithIcon}>
                  <MarkAsRead className={classes.icon} />
                  <Typography variant="oveline">???????? ?????? ???? ?????? 3 ??????</Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </PageWithTitle>
  );
}

export default Ticket;
