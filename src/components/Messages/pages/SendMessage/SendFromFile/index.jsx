import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { collectPhoneNumbers, toFarsiNumber } from 'utils';

// components
import {
  ContactModal,
  SMSTextField,
  PhoneNumberTextField,
  SelectPhoneNumber,
  DraftModal,
} from '../../../components';

import Input from 'components/shared/Input';
import Typography from 'components/shared/Typography';
import SimpleTable from 'components/shared/SimpleTable';
import LoadingButton from 'components/shared/LoadingButton';
import FileDropzone from 'components/shared/FileDropzone';
import InfoCard from 'components/shared/InfoCard';

import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

// icons
import SendIcon from '@material-ui/icons/Send';
import CalcIcon from '@material-ui/icons/ExposureOutlined';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
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
  searchInput: {
    marginRight: theme.spacing(SPACING_HALF),
  },
  contactTable: {
    marginBottom: theme.spacing(SPACING),
  },
}));

/**
 * @component SendFromFile
 */
function SendFromFile() {
  const classes = useStyles();
  const [check, setCheck] = useState(true);

  const [draftModal, setDraftModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  return (
    <div className={classes.root}>
      <Grid container spacing={SPACING_HALF}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={SPACING}>
            <Grid item xs={12}>
              <Input fullWidth name="sendTitle" label="?????????? ??????????" />
            </Grid>
            <Grid item xs={12}>
              <InfoCard
                variant="outlined"
                icon={PhoneIcon}
                primaryText="???????? ???????? ?? ?????????? ???????????? ????"
              >
                <Typography gutterBottom variant="body2">
                  ???????? ???????? ?????????????? txt ?? ?????????? ???? ???? ???????? ?????? ?????? ???????? ?????????????? ?????? :
                </Typography>
                <Typography gutterBottom variant="body2">
                  00989XXXXXXX
                </Typography>
                <Typography gutterBottom variant="body2">
                  0998XXXXXXXX
                </Typography>
                <Typography gutterBottom variant="body2">
                  998XXXXXXXXX
                </Typography>
                <Typography gutterBottom variant="body2">
                  9XXXXXXXXXX
                </Typography>
              </InfoCard>
            </Grid>

            <Grid item xs={12}>
              <FileDropzone
                options={{
                  accept: '.txt',
                }}
                onChange={(files) => {
                  const file = files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onloadend = (e) => {
                      const content = reader.result;
                      const phoneNumbers = collectPhoneNumbers(content, true);

                      setPhoneNumbers(phoneNumbers);
                    };
                  } else {
                    setPhoneNumbers([]);
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                fullWidth
                inputProps={{ min: 0, style: { textAlign: 'center' } }} // the change is here
                readOnly
                value={toFarsiNumber(phoneNumbers.length)}
                label="?????????? ?????????? ?????? ?????????????? ??????"
              />
            </Grid>
            <Grid item xs={12}>
              <PhoneNumberTextField
                title="???????? ???????? ??????????"
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
              <Autocomplete
                options={[{ title: '?????????? ???? ??????????' }, { title: '?????????? ??????' }]}
                defaultValue={{ title: '?????????? ???? ??????????' }}
                disableClearable
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <Input label="???????? ??????????" {...params} fullWidth />}
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
                  tariff: 1000,
                  cost: 2000,
                },
                {
                  operator: '?????????? ??????',
                  count: 5,
                  tariff: 900,
                  cost: 950,
                },
                {
                  operator: '???????? ?????????????? ????',
                  count: 1,
                  tariff: 1200,
                  cost: 1260,
                },
                {
                  operator: '?????? ??????????',
                  tariff: '?????????? 1 ???????? ????',
                  count: '',
                  cost: '',
                },
                {
                  operator: '?????????? ?????? ???????? ????????',
                  tariff: '0',
                  count: '',
                  cost: '',
                },
                {
                  operator: '?????????????? ???????? ??????????',
                  tariff: '0',
                  count: '',
                  cost: '',
                },
                {
                  operator: '???????? ?????????? ??????????',
                  tariff: '0',
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

      {/* Start Draft Modal */}
      <DraftModal
        open={draftModal}
        setOpen={setDraftModal}
        onClose={() => setDraftModal(false)}
      />
      {/* End Draft Modal */}

      {/* Start Contact Modal */}
      <ContactModal
        open={contactModal}
        setOpen={setContactModal}
        onClose={() => setContactModal(false)}
      />
      {/* End Contact Modal */}
    </div>
  );
}

export default SendFromFile;
