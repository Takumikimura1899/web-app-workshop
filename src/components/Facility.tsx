import React from 'react';
import {
  Container,
  Paper,
  TextField,
  InputLabel,
  Chip,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export const Facility: React.FC = () => {
  const style = useStyle();
  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <TextField label="役職名" fullWidth />
        <TextField label="詳細" fullWidth multiline />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label="とうろくしゃ"
            avatar={<Avatar src="https://bit.ly/3pM3urc" />}
          />
          {dayjs(new Date()).format('YYYY-MM-DD HH:mm')}
        </p>
        <p>
          <Chip
            label="とうろくしゃ"
            avatar={<Avatar src="https://bit.ly/3pM3urc" />}
          />
          {dayjs(new Date()).format('YYYY-MM-DD HH:mm')}
        </p>
      </Paper>
    </Container>
  );
};
