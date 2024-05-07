import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReply } from '../actions/boardActions';

const ReplyForm = ({ boardId }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // 댓글 내용이 비어있지 않은 경우에만 액션 디스패치
    if (content.trim()) {
      dispatch(createReply(boardId, content));
      setContent(''); // 입력 필드 초기화
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 작성하세요..."
      ></textarea>
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default ReplyForm;