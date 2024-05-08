import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listQNA, listQNADetails, createQNA, updateQNA, deleteQNA } from "../actions/qnaActions";
import { Form } from "react-bootstrap";

function QAEditScreen({ match }) {
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const [image_url, setImageUrl] = useState("");


  const dispatch = useDispatch();
  const qnaDetail = useSelector((state) => state.qnaDetail);
  const { qna } = qnaDetail;
  const qnaUpdate = useSelector((state) => state.qnaUpdate);
  const { success: successUpdate } = qnaUpdate;

  useEffect(() => {
    if (!qna.title || qna._id !== match.params.id) {
      dispatch(listQNADetails(match.params.id));
    } else {
      setTitle(qna.title);
      setEditorData(qna.content);
      setImageUrl(qna.image_url);
    }
  }, [dispatch, match, qna]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateQNA({
        _id: qna._id,
        title,
        content: editorData,
        image_url,
      })
    );
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <CKEditor
          editor={ClassicEditor}
          data={qna.content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
          }}
        />

        <Form.Group controlId="image">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </>
  );
}

export default QAEditScreen;