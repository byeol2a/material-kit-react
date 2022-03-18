import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { MemberListResults } from '../components/member/member-list-results';
import { MemberListToolbar } from '../components/member/member-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { members } from '../__mocks__/members';

const Memberdev = (props) => {

  useEffect(() => {
    const apiCall = async () =>  {
      const response = await axios.get('http://localhost:8080/restapi/member'); 
      console.log(response.data); 
    };
    apiCall();
  }, [])
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
              <MemberListResults members={members} />
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