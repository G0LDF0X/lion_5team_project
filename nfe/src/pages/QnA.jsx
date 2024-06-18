import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createQNA, listQNA } from '../store/actions/qnaActions';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function QAScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qnaList = useSelector((state) => state.qnaList);
  const { qnas } = qnaList;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const qnaCreate = useSelector((state) => state.qnaCreate);
  const { success, qna } = qnaCreate;
  
  useEffect(() => {
    dispatch(listQNA());
  }, [navigate, dispatch]);

  const qnaCreateHandler = () => {
    dispatch(createQNA());
  };

  useEffect(() => {
    if (success) {
      navigate(`/qna/update/${qna.id}`);
    }
  }, [success, navigate, qna]);

  // QNA 글을 최신순으로 정렬
  const sortedQnas = [...qnas].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // 날짜와 시간 포맷팅 함수
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('ko-KR', options);
  };

  return (
    <Container maxWidth="lg" className="mx-auto py-8">
      <Box className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="font-bold text-pink-700">
          Q&A
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={qnaCreateHandler}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Create Q&A
        </Button>
      </Box>
      <Grid container spacing={4}>
        {sortedQnas.map((qna) => (
          <Grid item key={qna.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              {qna.image_url && (
                <Link to={`/qna/detail/${qna.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${VITE_API_BASE_URL}${qna.image_url}`}
                    alt={qna.title}
                    className="object-cover"
                  />
                </Link>
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <Link to={`/qna/detail/${qna.id}`} className="no-underline text-gray-900 hover:text-blue-600">
                    {qna.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  <span dangerouslySetInnerHTML={{ __html: qna.content.replace(/<img[^>]*>/g, "") }} className="text-gray-700" />
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  {formatDateTime(qna.created_at)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default QAScreen;
