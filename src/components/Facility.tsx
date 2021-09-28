import React from 'react';
import { Container, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
      </Paper>
    </Container>
  );
};
