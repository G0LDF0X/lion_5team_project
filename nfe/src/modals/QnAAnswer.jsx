import React, {  useState, lazy, Suspense } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function QnAAnswer({ open, handleClose , submithandler}) {
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const CKEditor = lazy(() => import("@ckeditor/ckeditor5-react").then(module => ({ default: module.CKEditor })));
const ClassicEditor = lazy(() => import("@ckeditor/ckeditor5-build-classic"));

 

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
          <Suspense fallback={<div>Loading...</div>}>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
          </Suspense>
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