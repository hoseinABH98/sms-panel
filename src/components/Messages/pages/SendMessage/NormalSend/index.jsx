import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { toFarsiNumber } from 'utils';

// components
import {
  DraftModal,
  ContactModal,
  SMSTextField,
  PhoneNumberTextField,
  SelectPhoneNumber,
} from '../../../components';

import Input from 'components/shared/Input';
import SimpleTable from 'components/shared/SimpleTable';
import Typography from 'components/shared/Typography';
import DateTimePicker from 'components/shared/DateTimePicker';
import LoadingButton from 'components/shared/LoadingButton';

import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

// icons
import SendIcon from '@material-ui/icons/Send';
import CalcIcon from '@material-ui/icons/ExposureOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import DraftIcon from '@material-ui/icons/PostAdd';
import ContactIcon from '@material-ui/icons/ContactPhoneOutlined';

// constants
import { SPACING_HALF, SPACING, SPACING_LEAST } from 'constants/spacing';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(SPACING),
    marginBottom: theme.spacing(SPACING),
  },
  swithFormControl: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(SPACING_LEAST),
  },
  switch: {
    marginLeft: theme.spacing(SPACING_HALF),
  },
  clacButton: {
    marginRight: theme.spacing(SPACING_HALF),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  sendButton: {
    marginLeft: theme.spacing(SPACING_HALF),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      marginTop: theme.spacing(SPACING_HALF),
    },
  },
  stickyTable: {
    position: 'sticky',
    top: 0,
    height: 'auto',
    minHeight: '300px',
  },
  buttons: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

/**
 * @component NormalSend
 */
function NormalSend() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [check, setCheck] = useState(true);
  const [draftModal, setDraftModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container spacing={SPACING_HALF}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={SPACING}>
            <Grid item xs={12}>
              <Input fullWidth name="sendTitle" label="?????????? ??????????" />
            </Grid>
            <Grid item xs={12}>
              <SMSTextField
                title="?????? ??????????"
                headerChildren={
                  <Button
                    onClick={() => setDraftModal(true)}
                    variant="outlined"
                    startIcon={<DraftIcon />}
                  >
                    ?????? ???????? ????
                  </Button>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <SelectPhoneNumber />
            </Grid>
            <Grid item xs={12}>
              <PhoneNumberTextField
                title="?????????? ????????????????"
                headerChildren={
                  <Button
                    onClick={() => setContactModal(true)}
                    variant="outlined"
                    startIcon={<ContactIcon />}
                  >
                    ???????????? ??????????
                  </Button>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disableClearable
                options={[{ title: '?????????? ???? ??????????' }, { title: '?????????? ??????' }]}
                getOptionLabel={(option) => option.title}
                defaultValue={{ title: '?????????? ???? ??????????' }}
                renderInput={({ value, ...rest }) => (
                  <Input label="???????? ??????????" value={toFarsiNumber(value)} {...rest} fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="?????????? ??????????"
                placeholder="--???????????? ??????????--"
                value={selectedDate}
                onChange={setSelectedDate}
                okLabel="??????????"
                cancelLabel="??????"
                clearLabel="?????? ????????"
                labelFunc={(date) => (date ? date.format('jYYYY/jMM/jDD') : '')}
                TextFieldComponent={(props) => (
                  <Input fullWidth {...props} variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.swithFormControl}>
                <Typography>?????? ?????????? ???? ???????? ????????</Typography>
                <Switch
                  className={classes.switch}
                  checked={check}
                  onChange={() => setCheck(!check)}
                  name="receivedSmsForward"
                  inputProps={{ 'aria-label': 'enable received sms forward checkbox' }}
                />
              </div>
              <Typography variant="body2" color="textSecondary">
                ?????? ?????????? ???????? ???????? ?????? ???? ?????????? ???? ?????????? ?????? ?????????? ???? ???????? ???????? ?????????? ????????????
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.stickyTable}>
            {/* Summary Table */}
            <SimpleTable
              titleIcon={ShoppingCartIcon}
              title="???????????? ?????????? ?????????? ??????????"
              columns={[
                {
                  field: 'operator',
                  title: '??????????????',
                  render: (row) => (
                    <Typography align="left" style={{ marginRight: 15 }}>
                      {row.operator}
                    </Typography>
                  ),
                },
                {
                  field: 'count',
                  title: '?????????? ??????????',
                  render: (row) => <Typography>{row.count}</Typography>,
                },

                {
                  field: 'tariff',
                  title: '?????????? ??????????',
                  render: (row) => <Typography>{row.tariff}</Typography>,
                },
                {
                  field: 'cost',
                  title: '????????',
                  render: (row) => <Typography>{row.cost}</Typography>,
                },
              ]}
              data={[
                {
                  operator: '??????????????',
                  count: 8,
                  tariff: 195,
                  cost: 2000,
                },
                {
                  operator: '?????????? ??????',
                  count: 5,
                  tariff: 195,
                  cost: 950,
                },
                {
                  operator: '???????? ?????????????? ????',
                  count: 0,
                  tariff: 195,
                  cost: 0,
                },
                {
                  operator: '?????? ??????????',
                  count: '',
                  tariff: '?????????? 1 ???????? ????',
                  cost: '',
                },
                {
                  operator: '?????????? ?????? ???????? ????????',
                  tariff: 0,
                  count: '',
                  cost: '',
                },
                {
                  operator: '?????????????? ???????? ??????????',
                  tariff: 0,
                  count: '',
                  cost: '',
                },
                {
                  operator: '???????? ?????????? ??????????',
                  tariff: 0,
                  count: '',
                  cost: '',
                },
              ]}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.buttons}>
            <LoadingButton
              size="small"
              className={classes.clacButton}
              variant="contained"
              color="primary"
              startIcon={<CalcIcon />}
            >
              ???????????? ?????????? ??????????
            </LoadingButton>
            <LoadingButton
              className={classes.sendButton}
              variant="contained"
              color="success"
              startIcon={<SendIcon />}
            >
              ?????????? ??????????
            </LoadingButton>
          </div>
        </Grid>
      </Grid>

      <DraftModal
        open={draftModal}
        setOpen={setDraftModal}
        onClose={() => setDraftModal(false)}
      />

      <ContactModal
        open={contactModal}
        setOpen={setContactModal}
        onClose={() => setContactModal(false)}
      />
    </div>
  );
}

export default NormalSend;
