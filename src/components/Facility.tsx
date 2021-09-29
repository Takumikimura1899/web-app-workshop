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
import { useForm, Controller } from 'react-hook-form';

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
    control,
  } = useForm({
    defaultValues: initFacility,
    mode: 'onBlur',
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="設備名"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? '必須です' : ''}
            />
          )}
        />
        <Controller
          name="note"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="詳細"
              fullWidth
              error={!!errors.note}
              helperText={errors.note ? '必須です' : ''}
            />
          )}
        />
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
