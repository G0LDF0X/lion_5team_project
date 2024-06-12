import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDispatch, useSelector } from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Snackbar, Typography, Rating } from "@mui/material";
import { createReview, updateReview } from "../store/actions/reviewActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { reviewCreateReset } from "../store/slices/reviewSlices";
import { mainAxiosInstance } from "../api/axiosInstances";


function UpdateReviewScreen() {
  const [title, setTitle] = useState("");
  
  const [rate, setRate] = useState(5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [state, setState] = useState({ open: false });
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    rate: 0,
    image_url: "",
  });
  const handleClose = () => {
    setState({ open: false });
  };

  const { open } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const reviewUpdate = useSelector((state) => state.reviewUpdate);
  const { loading, error, success } = reviewUpdate


  

  const [editorData, setEditorData] = useState("");
  const [fileName, setFileName] = useState(null);

  const [uploading, setUploading] = useState(false);  
      
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
          mainAxiosInstance.post(`/items/review/uploadImage/${id}/`,   
             data,
          )
            .then((response) => response.data)
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
  // useEffect(() => {
  //   dispatch(listReviewDetails(id) );
  //   if (successUpdate) {
  //     navigate(`/items/detail/${updatedReview.item_id}`);}
  //     dispatch({type:REVIEW_UPDATE_RESET})
    
  // }, [dispatch, id, successUpdate ]);

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
  function submitHandler() {
    dispatch(updateReview({ id, title, content: editorData, rate}));
  
  
  }


  useEffect(() => {
    if (success) {
      // dispatch (reviewUpdateReset());
      window.history.back()
      setState({ open: true });
        dispatch(reviewCreateReset());
    }
    if (error) {
        window.alert(error);
        dispatch(reviewCreateReset());
    }
  }, [error, success, navigate, id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        message="Review created successfully."
      />
      <Link to={`/items/detail/${id}`} className="btn btn-light my-2">
        Go Back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Typography variant="h4" className="text-center mb-8">
            Create Review
          </Typography>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
            <CKEditor
        data={content}
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
      />
            </div>
            <div className="mb-4">
              <Typography id="rate-slider" gutterBottom>
                Rating
              </Typography>
              <Rating
                name="simple-controlled"
                value={Number(rate)} 
                onChange={(e) => {
                  setRate(e.target.value);
                }}
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateReviewScreen;