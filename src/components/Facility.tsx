import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  InputLabel,
  Chip,
  Avatar,
  Grid,
  Button,
} from '@material-ui/core';
import { Done, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { IFacility } from '../models/IFacility';
import { useForm } from 'react-hook-form';

const initFacility: IFacility = {
  id: '',
  name: 'name の初期値',
  note: 'note の初期値',
  system: {
    createDate: new Date(),
    createUser: {
      displayName: 'takumi kimura',
      email: '',
      face: 'https://bit.ly/3pM3urc',
    },
    lastUpdateUser: {
      displayName: 'takumi kimura',
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
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initFacility,
    mode: 'onBlur',
  });
  const onNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newFacility: IFacility = {
        ...facility,
        name: e.target.value,
      };
      setFacility(newFacility);
    },
    [facility],
  );
  return (
    <Container maxWidth="sm" className={style.root}>
      <input {...register('name', { required: true })} />
      <p>{errors.name ? '必須です' : ''}</p>
      <Paper className={style.paper}>
        <TextField
          label="設備名"
          fullWidth
          value={facility.name}
          onChange={onNameChange}
        />
        <TextField label="詳細" fullWidth multiline value={facility.note} />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(new Date()).format('YYYY-MM-DD HH:mm')}
        </p>
        <InputLabel shrink>変更者</InputLabel>
        <p>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.displayName} />}
          />
          {dayjs(new Date()).format('YYYY-MM-DD HH:mm')}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelButton} startIcon={<Delete />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button variant="contained" color="primary" startIcon={<Done />}>
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
