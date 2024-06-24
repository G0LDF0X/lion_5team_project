import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { createQNAAnswer } from "../store/actions/qnaActions";
import { mainAxiosInstance } from "../api/axiosInstances"; // 가정: 이미지 업로드를 위한 Axios 인스턴스

function QnAAnswer({ open, handleClose, questionId }) {
  const dispatch = useDispatch();
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const [answerId, setAnswerId] = useState(null); // answerId 상태 추가

  class CustomUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then((file) => {
        const formData = new FormData();
        formData.append("file", file);

        // answerId를 사용하여 업로드 URL 설정
        return mainAxiosInstance.post(`/qna/uploadAnswerImage/${answerId}/`, formData)
          .then(response => ({ default: response.data.url }));
      });
    }
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  const handleSubmit = () => {
    if (questionId && editorData && title) {
      dispatch(createQNAAnswer({ id: questionId, content: editorData, title }))
        .then((response) => {
          setAnswerId(response.payload.id); // 답변 생성 후 answerId 상태 업데이트
          handleClose();
          window.location.reload(); // 페이지 새로고침
        })
        .catch((error) => {
          console.error("Q&A 답변 생성 오류:", error);
        });
    } else {
      console.error("Missing required fields for QnA answer creation");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Create Q&A Answer</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            config={{
              extraPlugins: [uploadPlugin],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QnAAnswer;