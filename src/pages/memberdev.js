import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { MemberListResults } from '../components/member/member-list-results';
import { MemberListToolbar } from '../components/member/member-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const Memberdev = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiCall = async () =>  {
      const response = await axios.get('http://localhost:8080/restapi/member'); 
      setData(response.data.payload);
    };
    apiCall();
  }, [])
  console.log()
  //만든 데이터를 activeyn 'Y'인 것만 걸러내기.
  const ResultMap = data.filter((x)=> {
    return x.activeyn == 'Y'
  })
  
  return (
    <div>
      <>
        <Head>
          <title>
            Members | Byeol_ver
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <MemberListToolbar />
            <Box sx={{ mt: 3 }}>
              <MemberListResults members={ResultMap} />
            </Box>
          </Container>
        </Box>
      </>
    </div>    
  );
};
Memberdev.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Memberdev;