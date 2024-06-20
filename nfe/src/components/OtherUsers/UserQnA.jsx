import React, { useEffect, useState } from "react";
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserQnA = ({ userId, userDetail }) => {
  const [userQnAs, setUserQnAs] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    mainAxiosInstance.get(`/qna/${userId}/qna/`)
      .then(response => {
        const data = response.data;
        
        // 질문을 최신순으로 정렬
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setUserQnAs(data);
      })
      .catch(error => console.error('Error:', error));
  }, [userId]);

  useEffect(() => {
    mainAxiosInstance.get(`/qna/${userId}/answers/`)
      .then(response => {
        const data = response.data;

        // 답변을 최신순으로 정렬
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setUserAnswers(data);
      })
      .catch((error) => console.error('Error:', error));
  }, [userId]);

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-8 font-bold text-gray-800">
        {userDetail.nickname}의 질문과 답변
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">{userDetail.nickname}의 질문</h2>
          {userQnAs && userQnAs.map((userQnA, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
              <Link to={`/qna/detail/${userQnA.id}`}>
                <h3 className="text-lg font-semibold">{userQnA.title}</h3>
              </Link>
              {userQnA.content.length > 100 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: `${userQnA.content.substring(0, 100)}...` }}
                  className="text-black bg-white mt-2"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: userQnA.content }}
                  className="text-black bg-white mt-2"
                />
              )}
              <small className="text-gray-500 mt-2 block">{userQnA.created_at.split('T')[0]}</small>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{userDetail.nickname}의 답변</h2>
          {userAnswers && userAnswers.map((userAnswer, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
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
              <small className="text-gray-500 mt-2 block">{userAnswer.created_at.split('T')[0]}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserQnA;
