import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { createQNAAnswer, updateQnAAnswer } from "../store/actions/qnaActions";

// function QnAAnswer({ open, handleClose, questionId }) {
//   const dispatch = useDispatch();
//   const [editorData, setEditorData] = useState("");
//   const [title, setTitle] = useState("");

//   const handleSubmit = () => {
//     if (questionId && editorData && title) {
//       dispatch(createQNAAnswer({ id: questionId, content: editorData, title }))
//         .then(() => {
//           handleClose();
//           window.location.reload(); // 페이지 새로고침
//         })
//         .catch((error) => {
//           console.error("Q&A 답변 생성 오류:", error);
//         });
//     } else {
//       console.error("Missing required fields for QnA answer creation");
//     }
//   };
function QnAAnswer({ open, handleClose, initialContent = '', initialTitle = '', isUpdate = false, answer, question }) {
  
  const dispatch = useDispatch();
  const [editorData, setEditorData] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  console.log()
  // const answerId = answer.id
  console.log("answer", answer);
  console.log("question", question);
  const handleSubmit = () => {
    if (editorData && title) {
      if (isUpdate) {
        dispatch(updateQnAAnswer({id: answer.id, content: editorData, title}))
        .then(() => {
          handleClose();
          window.location.reload(); // 페이지 새로고침
        })
        .catch((error) => {
          console.error("Q&A 답변 생성 오류:", error);
        });
      } else {
        // createQnAAnswer
        dispatch(createQNAAnswer({id: question, content: editorData, title}))
        .then(() => {
          handleClose();
          window.location.reload(); // 페이지 새로고침
        })
        .catch((error) => {
          console.error("Q&A 답변 생성 오류:", error);
        });
      }

      // const action = isUpdate ? updateQnAAnswer : createQNAAnswer;
      // dispatch(action({ answer.id, content: editorData, title }))
      //   .then(() => {
      //     handleClose();
      //     window.location.reload(); // 페이지 새로고침
      //   })
      //   .catch((error) => {
      //     console.error("Q&A 답변 생성 오류:", error);
      //   });
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
