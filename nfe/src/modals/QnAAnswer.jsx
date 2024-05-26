import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { createQNAAnswer } from "../store/actions/qnaActions";
// import { QNA_ANSWER_DETAILS_RESET, QNA_ANSWER_UPDATE_RESET } from "../store/constants/qnaConstants";
import { useParams, useNavigate } from 'react-router-dom';

function QnAAnswer({ open, handleClose }) {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  function submithandler() {
    dispatch(createQNAAnswer({ id: qna.id, content: editorData, title: title }));
    dispatch({ type: QNA_ANSWER_UPDATE_RESET });
    dispatch({ type: QNA_ANSWER_DETAILS_RESET });
    handleClose();
    navigate(`/qna/detail/${qna.id}`);
  }

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
        <Button onClick={submithandler} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QnAAnswer;