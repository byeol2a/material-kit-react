import React, { useState } from 'react';
import {
    Box,
    SvgIcon,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    InputAdornment,
    TextField
  } from '@mui/material';
  import { Search as SearchIcon } from 'src/icons/search';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NextLink from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectRow } from 'src/store/boardReducer';
import { useRouter } from 'next/router';
import { DashboardLayout } from 'src/components/dashboard-layout';
import NoticeAdd from './NoticeAdd';

function notice() {
    const {inputData} = useSelector(state => state.boardReducer)
    const {lastId} = useSelector(state => state.boardReducer)

    const history = useRouter();
    // page 나누고 전환용 
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    console.log(inputData);
    // 서치 관련 상태관리
    const [inputText, setInputText] = useState("");

    const onChangeInput = e => {
      setInputText(e.target.value);
    };
    const onReset = () => {
      setInputText("");
    };
    // 서치에 따라 필터링 되게 만들기.
    const searchResult = inputData.filter((data)=>{
      if(inputText == null)
          return data
      else if(data.title.toLowerCase().includes(inputText.toLowerCase())|| data.content.toLowerCase().includes(inputText.toLowerCase())){
          return data
      }
    })
    // PAGE 전환 관련
    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value,10));
        setPage(0);
      };
    
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };

// 상세페이지 빼기위한 조작
// 디스패치사용
const dispatch = useDispatch();
// reducer 의 selectRow 함수에 선택한 id값을 넘겨준다.
const selectContent = (id) => {
  dispatch(selectRow(id))
}
const { selectRowData } = useSelector(state => state.boardReducer)

    return (
        <div className="root">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              m: -1
            }}
          >
            <Typography
              sx={{ m: 3 }}
              variant="h4"
            >
              NOTICE
            </Typography>
            <Box sx={{ m: 1 }}>
              <div>
                <NoticeAdd/>
              </div>
            </Box> 
          </Box>   
          <div className="grow" />
          <div className="search">
            <div className="searchIcon">
              <TextField
                fullWidth
                onChange={onChangeInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search notice"
                variant="outlined"
              />
            </div>
          </div>
          <Card>
            <PerfectScrollbar>
              <Box sx={{ minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        NO
                      </TableCell>
                      <TableCell align="center">
                        Title
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lastId !== 0 ?
                        searchResult.slice(page * limit, (page + 1) * limit).map(rowData => (
                            rowData.id !== '' &&
                            <NextLink 
                            href="/NoticeContent"
                            >
                              <TableRow
                              hover
                              key={rowData.id}
                              onClick={() => selectContent(rowData.id)}
                              >   
                                <TableCell className='listTableIndex' align="center">
                                    <a>{rowData.id}</a> 
                                </TableCell>
                                <TableCell className='listTableTitle' align="center">
                                  <a>{rowData.title}</a>
                                </TableCell>
                              </TableRow>
                            </NextLink> 
                        )):
                        <TableRow>
                            <TableCell className='listTableIndex'></TableCell>
                            <TableCell className='listTableTitle noData'>작성된 글이 없습니다.</TableCell>
                        </TableRow>                        
                    }
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={inputData.length-1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </div>
      );
    };
    notice.getLayout = (page) => (
      <DashboardLayout>
        {page}
      </DashboardLayout>
    );
    export default notice;