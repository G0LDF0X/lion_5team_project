import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { listQnADetails, updateQNA } from "../store/actions/qnaActions";
import { useParams, useNavigate } from 'react-router-dom';
import { qnaCreateReset } from "../store/slices/qnaSlices";
import { mainAxiosInstance } from "../api/axiosInstances";

function QAUpdateScreen() {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const QnaId = useParams().id;
  const dispatch = useDispatch();
  const qnaDetails = useSelector((state) => state.qnaDetails);
  const { qna } = qnaDetails;
  const qnaUpdate = useSelector((state) => state.qnaUpdate);
  const { success } = qnaUpdate;

  useEffect(() => {
    dispatch(listQnADetails(QnaId)); // 컴포넌트가 마운트될 때 Q&A 세부 정보를 불러옴
  }, [dispatch, QnaId]);

  // CKEditor 플러그인 구현 (파일 업로드)
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  // Q&A 업데이트 서브밋 핸들러
  const submithandler = () => {
    const formdata = new FormData(); 
    formdata.append("content", editorData);
    formdata.append("title", title);

    dispatch(updateQNA({ formdata, QnaId })) // updateQNA 액션 dispatch
      .then(() => {
        dispatch(qnaCreateReset()); // Q&A 생성 리셋 액션 dispatch (선택 사항)
        navigate(`/qna/detail/${QnaId}`); // 성공 시 Q&A 세부 페이지로 이동
      })
      .catch((error) => {
        console.error('Q&A 업데이트 실패:', error); // 실패 시 에러 출력
        // 실패 시 에러 처리 추가 가능
      });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Q&A</h2>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <CKEditor
          data={qna && qna.content ? qna.content : ""}
          editor={ClassicEditor}
          config={{
            extraPlugins: [uploadPlugin], // 파일 업로드 플러그인 설정
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data); // 에디터 데이터 업데이트
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={submithandler} // 서브밋 핸들러 호출
          className="mt-4"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default QAUpdateScreen;
