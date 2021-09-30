import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import { IReservation } from '../models/IReservation';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
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
import { Delete, Done } from '@material-ui/icons';
import { DateTimePicker } from '@material-ui/pickers';

const initReservation: IReservation = {
  id: '001',
  facilityId: '001',
  subject: '目的01',
  description: '説明001',
  startDate: dayjs(),
  endDate: dayjs().add(1, 'hour'),
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

export const Reservation: React.FC = () => {
  const style = useStyle();

  const { system } = initReservation;
  const {
    register,
    formState: { errors },
    control,
  } = useForm<IReservation>({
    defaultValues: initReservation,
    mode: 'onBlur',
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DateTimePicker
              {...field}
              label="開始日時"
              format="YYYY/MM/DD HH:mm"
              ampm={false}
              minutesStep={15}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <DateTimePicker
              {...field}
              label="終了日時"
              format="YYYY/MM/DD HH:mm"
              ampm={false}
              minutesStep={15}
            />
          )}
        />
        <Controller
          name="subject"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="設備名"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject ? '必須です' : ''}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="詳細"
              fullWidth
              error={!!errors.description}
              helperText={errors.description ? '必須です' : ''}
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
