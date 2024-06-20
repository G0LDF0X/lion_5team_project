import React, { useState, useEffect, lazy, Suspense } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDispatch, useSelector } from "react-redux";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Snackbar, Typography, Rating} from "@mui/material";
import { updateReview} from "../store/actions/reviewActions";

import Loading from "../components/Loading";
import Message from "../components/Message";
// import { reviewCreateReset } from "../store/slices/reviewSlices";
import { reviewUpdateReset } from "../store/slices/reviewSlices";
import { mainAxiosInstance } from "../api/axiosInstances";


function UpdateReviewScreen() {
  const [title, setTitle] = useState("");
  
const CKEditor = lazy(() => import("@ckeditor/ckeditor5-react").then(module => ({ default: module.CKEditor })));
const ClassicEditor = lazy(() => import("@ckeditor/ckeditor5-build-classic"));
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
  const handleClose = (event) => {
    event.preventDefault();
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
  const reviewDetails = useSelector((state) => state.reviewDetails);
  const {review} = reviewDetails;

  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [filteredOrderItems, setFilteredOrderItems] = useState([]);

  useEffect(() => {
    mainAxiosInstance.get(`/items/review/detail/${id}/`)
    .then((response) => {
      const reviewData = response.data[0];
  
      mainAxiosInstance.get(`/users/check_review/${userInfo.id}`)
      .then((response) => {
        const orderItems = response.data;
        const filteredItems = orderItems.filter((orderItem) => orderItem.item_id === reviewData.item_id);
        setFilteredOrderItems(filteredItems);
        setSelectedOrderItem(filteredItems[0].id);
      });
    });

    // 기존 리뷰를 수정하는 경우
    if (review[0]) {
      console.log(review);
      
      setEditorData(review[0].content);

      setTitle(review[0].title);
      setContent(review[0].content);
      setRate(review[0].rate);
    }
  }, [review]);

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

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateReview({ id, title, content: editorData, rate, orderitem_id: selectedOrderItem}));
  }


  useEffect(() => {
    if (success) {
      // dispatch (reviewUpdateReset());
      window.history.back()
      setState({ open: true });
        dispatch(reviewUpdateReset());
    }
    if (error) {
        window.alert(error);
        dispatch(reviewUpdateReset());
    }
  }, [error, success, navigate, id]);
  
  useEffect(() => {
    return () => {
      dispatch(reviewUpdateReset());
    };
  }
  , []);


  const formattedOrderItems = filteredOrderItems.map(item => {
    const date = new Date(item.created_at);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return { ...item, created_at: `${formattedDate} ${formattedTime}` };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        message="Review created successfully."
      />
      {/* <Link to={`/items/detail/${review[0].item_id}`} className="btn btn-light my-2">
        Go Back
      </Link> */}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Typography variant="h4" className="text-center mb-8">
            Review
          </Typography>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <select
                value={selectedOrderItem}
                onChange={(e) => setSelectedOrderItem(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {formattedOrderItems.map((filterItem) => (
                  <option key={filterItem.id} value={filterItem.id}>
                    {filterItem.name} - {filterItem.qty}개 | {filterItem.total_price}원 ({filterItem.created_at} 주문)
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
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