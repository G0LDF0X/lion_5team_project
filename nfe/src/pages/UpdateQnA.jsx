import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { listQnADetails, updateQNA } from "../store/actions/qnaActions";
import { useParams, useNavigate } from 'react-router-dom';
import { qnaCreateReset } from "../store/slices/qnaSlices";

function QAUpdateScreen() {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [fileName, setFileName] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const QnaId = useParams().id;
  const dispatch = useDispatch();
  const qnaDetails = useSelector((state) => state.qnaDetails);
  const { qna } = qnaDetails;
  const qnaUpdate = useSelector((state) => state.qnaUpdate);
  const { success } = qnaUpdate;

  class CustomUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then((file) => {
        localStorage.setItem("file", file.name);
        setFileName(file.name);

        return new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("file", file);
          setUploading(true);
          fetch(`/qna/uploadImage/${QnaId}/`, {
            method: "PUT",
            body: data,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                reject(data.error);
                setUploading(false);
              } else {
                resolve({
                  default: data.url,
                });
                setUploading(false);
              }
            })
            .catch((error) => {
              reject(error.message);
            });
        });
      });
    }
  }

  useEffect(() => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(editorData, "text/html");
    const figures = parsedHtml.querySelectorAll("figure");
    figures.forEach((figure) => {
      const img = figure.querySelector("img");
      if (img) {
        img.src = "/images/" + fileName;
      }
    });
    const serializer = new XMLSerializer();
    const updatedData = serializer.serializeToString(parsedHtml);
  }, [fileName, editorData]);

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  function submithandler() {
    console.log({ id: QnaId, content: editorData, title: title, product_url: "product_url" })
    const formdata = new FormData(); 
    formdata.append("content", editorData);
    formdata.append("title", title);
    formdata.append("product_url", "product_url");

    dispatch(updateQNA({formdata, QnaId}));
    // dispatch(qnaCreateReset());
    // window.history.back()
  }
  useEffect(() => {
    if (success) {
      dispatch(qnaCreateReset());
      navigate(`/qna/detail/${QnaId}`);
    }
  }
    , [success, navigate, QnaId]);
  useEffect(() => {
    if (!qna || qna.id === undefined) {
      dispatch(listQnADetails(QnaId));
    }
  }, [dispatch]);

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
            extraPlugins: [uploadPlugin],
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={submithandler}
          className="mt-4"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default QAUpdateScreen;