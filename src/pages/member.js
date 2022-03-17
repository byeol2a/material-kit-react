import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { MemberListResults } from '../components/member/member-list-results';
import { MemberListToolbar } from '../components/member/member-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Members = () => (
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
          <MemberListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Members.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Members;
