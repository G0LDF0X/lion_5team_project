import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listQNA, updateQNA, listQNADetails } from "../actions/qnaActions";
import { Form } from "react-bootstrap";
import {updqteQNA} from "../actions/qnaActions";
import { useParams } from 'react-router-dom'


function QAUpdateScreen() {
  const [editorData, setEditorData] = useState("");
  const [fileName, setFileName] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);  
  const QnaId = useParams().id;
  const dispatch = useDispatch();
    const qnaDetails = useSelector((state) => state.qnaDetails);
    const { qna } = qnaDetails;


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
          // data.append("name", file.name);
          data.append("file", file);
          setUploading(true);
          fetch(`/qna/uploadImage/${qna.id}/`, {
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
                  default: data.url, // Assuming the server responds with JSON that has a 'url' property
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
    // setEditorData({ content: updatedData, id: board.id, title:"title", product_url:"product_url" });
    // console.log(editorData);
  }, [fileName, editorData]);
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }
  function submithandler() {
    
    dispatch(updateQNA({ id: qna.id, content: editorData, title: title, product_url: "product_url"}));
  }
  useEffect(() => { 
    if (!qna || qna.id === undefined) {
    dispatch(listQNADetails(QnaId)); 
    }}
  , [dispatch]);
    
  return (
    <>
                <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
      <CKEditor
        data={qna &&qna.content ? qna.content : ""}
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
      />
      <Button onClick={submithandler}>Submit</Button>
    </>
  );
}

export default QAUpdateScreen;
