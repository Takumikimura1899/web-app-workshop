import dayjs from 'dayjs';
// import React from 'react';
import { IReservation } from '../models/IReservation';
import { IFacility } from '../models/IFacility';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Delete from '@material-ui/icons/Delete';
import Done from '@material-ui/icons/Done';
import { DateTimePicker } from '@material-ui/pickers';
import { useMemo, useState } from 'react';

// ダミーデータ
const dummyFacilities: IFacility[] = [
  {
    id: '01',
    name: '設備００１',
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: '',
  },
  {
    id: '02',
    name: '設備００２',
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: '',
  },
  {
    id: '03',
    name: '設備００３',
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: '',
  },
];

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
  paper: {
    padding: theme.spacing(1),
    '& > div': {
      marginBottom: theme.spacing(2),
    },
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
  const [facilities] = useState<IFacility[]>(dummyFacilities);
  const facilityMenuItems = useMemo(() => {
    return facilities.map((f) => (
      <MenuItem key={f.id} value={f.id}>
        {f.name}
      </MenuItem>
    ));
  }, [facilities]);

  return (
    <Container maxWidth="sm">
      <Paper className={style.paper}>
        <FormControl>
          <InputLabel id="facility-label">設備</InputLabel>
          <Controller
            control={control}
            name="facilityId"
            render={({ field }) => (
              <Select {...field} labelId="facility-label">
                {facilityMenuItems}
              </Select>
            )}
          />
        </FormControl>
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
