import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mainAxiosInstance } from '../../api/axiosInstances';
import { Typography} from '@mui/material';


const UserQnA = ({ userInfo }) => {
  const [userQnAs, setUserQnAs] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
  const questionContainerRef = useRef(null);
  const noAnswerRef = useRef(null);

  useEffect(() => {
    mainAxiosInstance.get('/users/profile/myuserqna/', {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    })
      .then((response) => {
        const data = response.data;

        // 질문을 최신순으로 정렬
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const promises = data.map((qna) =>
          mainAxiosInstance.get(`/qna/detail/${qna.id}`).then((res) => res.data)
        );

        Promise.all(promises).then((userAnswerData) => {
          const userQnAsWithAnswerData = data.map((qna, index) => ({
            ...qna,
            answers: userAnswerData[index],
          }));
          setUserQnAs(userQnAsWithAnswerData);
        });
      })
      .catch((error) => console.error('Error:', error));
  }, [userInfo]);

  useEffect(() => {
    mainAxiosInstance.get('/users/profile/myuseranswer/', {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    })
      .then((response) => {
        const data = response.data;
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setUserAnswers(response.data);
      })
      .catch((error) => console.error('Error:', error));
  }, [userInfo]);


  useEffect(() => {
    if (questionContainerRef.current && noAnswerRef.current) {
      noAnswerRef.current.style.height = `${questionContainerRef.current.offsetHeight}px`;
    }
  }, []);

  return (

    <div className="container mx-auto py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div ref={questionContainerRef}>
      <Typography variant="h4" className="mb-10 font-bold text-gray-800">
        나의 질문
      </Typography>
    {userQnAs && userQnAs.length > 0 ? (
      userQnAs && userQnAs.map((userQnA, index) => (
        <div key={index} className="bg-white mb-4 mt-4 p-4 border-b border-gray-200">
          <Link to={`/qna/detail/${userQnA.id}`}>
            <h3 className="text-2xl font-bold">{userQnA.title}</h3>
          </Link>
          {userQnA.content.length > 100 ? (
            <div
              dangerouslySetInnerHTML={{ __html: `${userQnA.content.substring(0, 100)}...` }}
              className="text-xl bg-white mt-2"
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: userQnA.content }}
              className="text-black bg-white mt-2"
            />
          )}

          <div className="flex items-center mt-2">
            {userInfo?.image_url ? (
                  <img src={VITE_API_BASE_URL + userInfo.image_url} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
              ) : (
                  <img src="https://placehold.co/400" alt="Placeholder" className="w-6 h-6 rounded-full mr-2" />
                )}
            <span className="font-bold text-sm mr-2">{userInfo.nickname}</span>
            <small className="text-gray-500 mr-4">{userQnA.created_at.split('T')[0]}</small>
            <small className="text-gray-500 flex items-center">
            <span role="img" aria-label="dot" style={{ marginRight: '7px' }}>•</span> 댓글 
            <small className="text-gray-500 ml-1.5">
              {userQnA.answers.answers && userQnA.answers.answers.length}
            </small>
          </small>
       
          </div>
        </div>
      ))
    ) : (
      <p>질문이 없습니다.</p>
    )}
      
    </div>
    <div>

        <Typography variant="h4" className="mb-10 font-bold text-gray-800">
          나의 답변
        </Typography>
        {userAnswers && userAnswers.length > 0 ? (
          userAnswers && userAnswers.map((userAnswer, index) => (
            <div key={index} className="bg-white mb-4 mt-4 p-4 border-b border-gray-200">
              <Link to={`/qna/detail/${userAnswer.user_qna_id}`}>
                <h3 className="text-lg font-semibold">{userAnswer.title}</h3>
              </Link>
              {userAnswer.content.length > 100 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: `${userAnswer.content.substring(0, 100)}...` }}
                  className="text-black bg-white mt-2"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: userAnswer.content }}
                  className="text-black bg-white mt-2"
                />
              )}
          <div className="flex items-center mt-2">
            {userInfo?.image_url ? (
                  <img src={VITE_API_BASE_URL + userInfo.image_url} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                   ) : (
                  <img src="https://placehold.co/400" alt="Placeholder" className="w-6 h-6 rounded-full mr-2" />
                )}
                  <span className="font-bold text-sm mr-2">{userInfo.nickname}</span>
                  <small className="text-gray-500 mr-4">{userQnA.created_at.split('T')[0]}</small>
                  <small className="text-gray-500 flex items-center">
                  <span role="img" aria-label="dot" style={{ marginRight: '7px' }}>•</span> 댓글 
                  <small className="text-gray-500 ml-1.5">
                    {userQnA.answers.answers && userQnA.answers.answers.length}
                  </small>
                </small>
            
          </div>
  
            </div>
          ))
        ) : (
          <div ref={noAnswerRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' , margin: '20px 10px' }}>
            <p><strong>답변이 없습니다.</strong></p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default UserQnA;