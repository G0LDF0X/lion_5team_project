import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Snackbar, Typography, Slider } from "@mui/material";
import { createReview } from "../store/actions/reviewActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { reviewCreateReset } from "../store/slices/reviewSlices";

function CreateReviewScreen() {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rate, setRate] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [state, setState] = useState({ open: false });

  const handleClose = () => {
    setState({ open: false });
  };

  const { open } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { loading, error, success } = reviewCreate;

  const handleImageUpload = (file) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("rate", rate);
    if (selectedFile) {
      formData.append("image_url", selectedFile);
    }
    dispatch(createReview({id, formData}));
  };

  useEffect(() => {
    if (success) {
      navigate(`/items/detail/${id}`);
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
              <Editor
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write your review..."
              />
            </div>
            <div className="mb-4">
              <Typography id="rate-slider" gutterBottom>
                Rating
              </Typography>
              <Slider
                value={rate}
                onChange={(e, newValue) => setRate(newValue)}
                aria-labelledby="rate-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={5}
              />
            </div>
            <div className="mb-4">
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </Button>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
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

export default CreateReviewScreen;