import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listQNA, updateQNA } from "../actions/qnaActions";
import { Form } from "react-bootstrap";
import { listReviewDetails, updateReview } from "../actions/reviewActions";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { REVIEW_UPDATE_RESET } from "../constants/reviewConstants";

function ReviewEditScreen() {
  const [editorData, setEditorData] = useState("");
  const [fileName, setFileName] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);  
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [rate, setRate] = useState(0);
    const {id} = useParams();

  const dispatch = useDispatch();
    const reviewDetail = useSelector((state) => state.reviewDetail);
    const { review } = reviewDetail;
    const reviewUpdate = useSelector((state) => state.reviewUpdate);
    const { success: successUpdate, review: updatedReview } = reviewUpdate;

    
    
    
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
          fetch(`items/review/uploadImage/${id}`, {
            method: "POST",
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
    dispatch(listReviewDetails(id) );
    if (successUpdate) {
      navigate(`/items/detail/${updatedReview.item_id}`);}
      dispatch({type:REVIEW_UPDATE_RESET})
    
  }, [dispatch, id, successUpdate ]);

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
  //   function handleEditorChange(data) {
  //     console.log(data);
  //   }
  function submithandler() {
    dispatch(updateReview({title: title, content: editorData, rate: rate, id: id }));
  
  
  }
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
        data={review.content}
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
      <Box  sx={{
        '& > legend': { mt: 2 },
      }}>
      <Typography component="legend">Rate</Typography>
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </Box>
    </>
  );
}

export default ReviewEditScreen;
