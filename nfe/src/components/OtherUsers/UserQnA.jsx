
import React, {useRef, useEffect, useState } from 'react';
import { mainAxiosInstance } from '../../api/axiosInstances';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const UserQnAProfile = ({ userId, userDetail }) => {
  const [userQnAs, setUserQnAs] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const questionContainerRef = useRef(null);
  const noAnswerRef = useRef(null);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  useEffect(() => {
    mainAxiosInstance.get(`/users/${userId}/myqna/`)
      .then((response) => {
        const qnaList = response.data;
        setUserQnAs(qnaList);


      const answerRequests = qnaList.map((qna) => {
        return mainAxiosInstance.get(`/qna/detail/${qna.id}`)
          .then((response) => {
            const answers = response.data.answers;
            qna.answerCount = answers.length;
            return qna; 
          });
      });

      Promise.all(answerRequests)
        .then((updatedQnAs) => {
          setUserQnAs(updatedQnAs);
        })
        .catch((error) => console.error('Error fetching answers:', error));
    })
    .catch((error) => console.error('Error fetching questions:', error));
}, [userId]);

    useEffect(() => {
        mainAxiosInstance.get(`/users/${userId}/myanswer/`)
          .then((response) => {
            setUserAnswers(response.data);
          })
          .catch((error) => console.error('Error fetching answers:', error));
      }, [userId]);

      useEffect(() => {
        if (questionContainerRef.current && noAnswerRef.current) {
          noAnswerRef.current.style.height = `${questionContainerRef.current.offsetHeight}px`;
        }
      }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
      <Typography variant="h4" className="mb-10 font-bold text-gray-800">
          {userDetail.nickname || userDetail.username }님이 작성한 질문
          </Typography>
          {userQnAs.length > 0 ? (
            userQnAs.map((qna) => (
              <div key={qna.id} className="bg-white mb-4 mt-4 p-4 border-b border-gray-200">
                <Link to={`/qna/detail/${qna.id}`}>
                  <h3 className="text-2xl font-bold">{qna.title}</h3>
                </Link>
                <div
                  dangerouslySetInnerHTML={{ __html: qna.content }}
                  className="text-xl bg-white mt-2"
                />
                <div className="flex items-center mt-2">
                {userDetail?.image_url ? (
                  <img src={VITE_API_BASE_URL + userDetail.image_url} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
              ) : (
                  <img src="https://placehold.co/400" alt="Placeholder" className="w-6 h-6 rounded-full mr-2" />
                )}
            <span className="font-bold text-sm mr-2">{userDetail.nickname}</span>
            <small className="text-gray-500 mt-2 block">{qna.created_at.split('T')[0]}</small>
            <small className="text-gray-500 flex items-center">
            <span role="img" aria-label="dot" style={{ marginLeft : '7px', marginRight : '7px'}}>•</span> 댓글 
            <small className="text-gray-500 ml-1.5">
              {qna.answerCount}
            </small>
          </small>
          </div>
              </div>
            ))
          ) : (
            <div ref={noAnswerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' , margin: '20px 10px' }}>
            <p><strong>작성된 질문이 없습니다.</strong></p>
          </div>
          )}
        </div>
        <div>
        <Typography variant="h4" className="mb-10 font-bold text-gray-800">
          {userDetail.nickname || userDetail.username }님이 작성한 답변
          </Typography>
          {userAnswers.length > 0 ? (
            userAnswers.map((answer) => (
              <div key={answer.id} className="bg-white mb-4 mt-4 p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">{answer.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: answer.content }}
                  className="text-black bg-white mt-2"
                />
                  <div className="flex items-center mt-2">
                {userDetail?.image_url ? (
                  <img src={VITE_API_BASE_URL + userDetail.image_url} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
              ) : (
                  <img src="https://placehold.co/400" alt="Placeholder" className="w-6 h-6 rounded-full mr-2" />
                )}
            <span className="font-bold text-sm mr-2">{userDetail.nickname}</span>
            <small className="text-gray-500 mt-2 block">{answer.created_at.split('T')[0]}</small>
            <small className="text-gray-500 flex items-center">
          </small>
          </div>

              </div>
            ))
          ) : (
            <div ref={noAnswerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' , margin: '20px 10px' }}>
            <p><strong>작성된 답변이 없습니다.</strong></p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserQnAProfile;