import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CancleModal from './canclemodal';
import WithdrawModal from './withdrawmodal';
import ModifyModal from './modifymodal';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const AccountProfileDetails = (props) => {
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiCall = async () =>  {
      const response = await axios.get('http://localhost:8080/restapi/member/1'); 
          setData(response.data.payload);
        };
      apiCall();
    }, [])

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
        >
          <WithdrawModal/>
        </Box> 
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography
                gutterBottom
                color="textSecondary"
                variant='caption'
              >
              ID
              </Typography>
              <Div>{data.id}</Div>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="[경고] 비밀번호 값이 존재하면 비밀번호가 변경됩니다."
                label="Password"
                name="password"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography
                gutterBottom
                color="textSecondary"
                variant='caption'
              >
              Email address
              </Typography>
              <Div>{data.email}</Div>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="text"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Stack direction="row" spacing={2}>
            <Box>
              <CancleModal/>
            </Box>
            <Box>
              <ModifyModal/>
            </Box>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};
