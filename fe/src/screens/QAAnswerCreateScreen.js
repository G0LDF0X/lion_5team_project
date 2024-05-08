import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { createQNAAnswer } from '../actions/qnaActions';

function QAAnswerCreateScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const qnaAnswerCreate = useSelector(state => state.qnaAnswerCreate);
  const { success: successCreate, qna: createdQnAnswer } = qnaAnswerCreate;

  useEffect(() => {
    dispatch(createQNAAnswer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successCreate) {
      navigate(`/qna/answer/update/${id}/`);
    }
  }, [successCreate, navigate, createdQnAnswer]);

  return (
    <div>
      <Loading />
    </div>
  );
}

export default QAAnswerCreateScreen;