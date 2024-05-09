import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { updateQNAAnswer, listQNADetails } from "../actions/qnaActions";
import { QNA_ANSWER_DETAILS_RESET, QNA_ANSWER_UPDATE_RESET } from "../constants/qnaConstants";
import { useParams, useNavigate } from 'react-router-dom'

function QAAnswerUpdateScreen() {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const QnaId = useParams().id;
  const dispatch = useDispatch();
  const qnaDetails = useSelector((state) => state.qnaDetails);
  const { qna } = qnaDetails;

  const qnaAnswerDetails = useSelector((state) => state.qnaAnswerDetails);
  const { qnaAnswer } = qnaAnswerDetails;
  console.log("UPDATE QNA :", qna);

  useEffect(() => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(editorData, "text/html");
    const figures = parsedHtml.querySelectorAll("figure");

    const serializer = new XMLSerializer();
    const updatedData = serializer.serializeToString(parsedHtml);
    // setEditorData({ content: updatedData, id: board.id, title:"title", product_url:"product_url" });
    // console.log(editorData);
  }, [editorData]);

  function submithandler() {
    dispatch(updateQNAAnswer({ id: qna.id, content: editorData, title: title}));
    dispatch({ type: QNA_ANSWER_UPDATE_RESET });
    dispatch({ type: QNA_ANSWER_DETAILS_RESET });
    navigate(`/qna/detail/${qna.id}`)
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
        data={qnaAnswer &&qnaAnswer.content ? qnaAnswer.content : ""}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
      />
      <Button onClick={submithandler}>Submit</Button>
    </>
  );
}

export default QAAnswerUpdateScreen;
