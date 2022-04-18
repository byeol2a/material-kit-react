import React, { useState } from 'react';
import {
    Box,
    Button,
    SvgIcon,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Divider,
    InputAdornment,
    TextField
  } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector, useDispatch } from 'react-redux'
import { editContent, removeContent } from '../store/boardReducer';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { DashboardLayout } from 'src/components/dashboard-layout';

function NoticeContent() {
    const { selectRowData } = useSelector(state => state.boardReducer)
 
    const [title, setTitle] = useState(selectRowData.title)
    const [content, setContent] = useState(selectRowData.content)
 
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
 
    const handleContent = (e) => {
        setContent(e.target.value)
    }
 
    const dispatch = useDispatch()
    const history = useRouter();
 
    const onChange = () => {
        const _inputData = {
            id: selectRowData.id,
            title: title,
            content: content
        }
        console.log('clickSave :: ', _inputData)
        dispatch(editContent(_inputData))
        setTitle('')
        setContent('')
        history.push("/notice")
    }
 
    const onRemove = () => {
    	// reducer의 removeContent 함수에 삭제할 id 값을 전달한다.
        dispatch(removeContent(selectRowData.id))
        // input 값 초기화
        setTitle('')
        setContent('')
        // 페이지 이동
        history.push("/notice")
    }
 
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
                상세보기
            </Typography>
            <Box sx={{ m: 1 }}>
              <div>
                <NextLink
                  href="/"
                  passHref
                >
                  <Button variant="outlined" color="primary">
                    메인 화면
                  </Button>
                </NextLink>{"  "}
                <NextLink
                  href="/notice"
                  passHref
                >
                  <Button variant="outlined" color="primary">
                    리스트로
                  </Button>
                </NextLink>
              </div>
            </Box> 
          </Box>
          <Divider />   
          <Card>
            <PerfectScrollbar>
              <Box sx={{ minWidth: 1050 }}>
                <Table>
                  <TableBody>
                    <TableCell>
                      <TextField fullWidth label="제목" id="texttitle" className='inputTitle' onChange={handleTitle} value={title}/>
                    </TableCell><tr/>
                    <TableCell>
                      <TextField fullWidth label="내용" id="textcontent" className='inputContent' onChange={handleContent} value={content}/>
                    </TableCell>
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </Card>
          <Card direction="row">
              <Button onClick={onChange} className='editBtn' variant="contained" color="primary" size='small'>edit</Button>{"  "}
              <Button onClick={onRemove} className='deleteBtn' variant="outlined" color="error" size="small">delete</Button>
            </Card>
          </div>
      );
    };
    NoticeContent.getLayout = (page) => (
      <DashboardLayout>
        {page}
      </DashboardLayout>
    );
    export default NoticeContent;