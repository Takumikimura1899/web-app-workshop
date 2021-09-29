import React, { useState } from 'react';
import Container from '@material-ui/core/Container/Container';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Chip from '@material-ui/core/Chip/Chip';
import Avatar from '@material-ui/core/Avatar/Avatar';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { IFacility } from '../models/IFacility';

const initFacility: IFacility = {
  id: '',
  name: 'name の初期値',
  note: 'note の初期値',
  system: {
    createDate: new Date(),
    createUser: {
      displayName: 'ebihara kenji',
      email: '',
      face: 'https://bit.ly/3pM3urc',
    },
    lastUpdateUser: {
      displayName: 'ebihara kenji',
      email: '',
      face: 'https://bit.ly/3pM3urc',
    },
    lastUpdate: new Date(),
  },
};

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  rightActions: {
    textAlign: 'right',
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Facility: React.FC = () => {
  const style = useStyle();
  const [facility, setFacility] = useState(initFacility);
  const { system } = initFacility;
  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <TextField label="設備名" fullWidth value={facility.name} />
        <TextField label="詳細" fullWidth multiline value={facility.note} />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(system.createDate).format('YYYY-MM-DD HH:mm')}
        </p>
        <InputLabel shrink>更新者</InputLabel>
        <p>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.face} />}
          />
          {dayjs(system.lastUpdate).format('YYYY-MM-DD HH:mm')}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelButton} startIcon={<DeleteIcon />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
