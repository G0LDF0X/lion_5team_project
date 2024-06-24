import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { listQnADetails, updateQNA } from "../store/actions/qnaActions";
import { useParams, useNavigate } from 'react-router-dom';
import { qnaCreateReset } from "../store/slices/qnaSlices";
import { mainAxiosInstance } from "../api/axiosInstances";
function QAUpdateScreen() {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
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

  

  class CustomUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then((file) => {
        const data = new FormData();
        data.append("file", file);
        setUploading(true);

        return mainAxiosInstance.post(`/qna/uploadImage/${QnaId}/`, data)
          .then((response) => response.data)
          .then((data) => {
            setFileName(file.name);
            setUploading(false);
            console.log(data.url)
            setUrl(data.url)
            return { default: VITE_API_BASE_URL+data.url };
          })
          .catch((error) => {
            setUploading(false);
            throw error;
          });
      });
    }
  }
  useEffect(() => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(editorData, "text/html");
    const figures = parsedHtml.querySelectorAll("figure");
    figures.forEach(figure => {
      const img = figure.querySelector("img");
      
        
        if (img.src) {
          img.src = VITE_API_BASE_URL+ url;
      }
     
    }
    )
    const serializer = new XMLSerializer();
    const updatedData = serializer.serializeToString(parsedHtml);
    console.log(updatedData)
      setEditorData(updatedData )
}, [url, editorData])
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
  // http://127.0.0.1:8000//images/user_qna_images/E3GNOr1WUAAG9VK.jpg
  // 캔슬 버튼 핸들러
  const cancelHandler = () => {
    navigate(`/qna/`); // Q&A 리스트 페이지로 이동
  };
  useEffect(() => {
    if(qna && qna.title) {
      setTitle(qna.title)
      setEditorData(qna.content)
    }
  }
  , [qna])
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
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={submithandler} // 서브밋 핸들러 호출
            className="mt-4 mr-2"
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={cancelHandler} // 캔슬 핸들러 호출
            className="mt-4"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QAUpdateScreen;
