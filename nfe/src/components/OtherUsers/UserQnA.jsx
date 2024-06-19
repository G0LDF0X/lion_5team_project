import React, { useEffect, useState } from "react";
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserQnA = ({ userId, userDetail }) => {
  const [qnaItems, setQnaItems] = useState([]);

  useEffect(() => {
    mainAxiosInstance.get(`/qna/${userId}/qna/`)
      .then(response => {
        console.log('QnA Response Data:', response.data);
        setQnaItems(response.data);
      })
      .catch(error => console.error('Error:', error));
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="mb-8 font-bold text-gray-800">
        {userDetail.nickname}의 질문과 답변
      </Typography>
      <div className="flex flex-wrap">
        {qnaItems && qnaItems.length > 0 ? (
          qnaItems.map((qna) => (
            <div
              key={qna.question.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <Link to={`/qna/detail/${qna.question.id}`}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{qna.question.title}</h2>
                  {qna.answers.map((answer) => (
                    <p key={answer.id} className="text-gray-700 mt-2">
                      {answer.content}
                    </p>
                  ))}
                </div>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="w-full p-4 text-center">
            <h1 className="text-center text-2xl font-bold text-gray-700">
              등록된 질문과 답변이 없습니다.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQnA;
