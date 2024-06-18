
import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Snackbar, Typography } from "@mui/material";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { mainAxiosInstance } from "../api/axiosInstances";
import { productQnaReset } from "../store/slices/productSlices";
import { updateProductQnA } from "../store/actions/productActions";


function ProductQnAUpdate() {
  const [title, setTitle] = useState("");
  
const CKEditor = lazy(() => import("@ckeditor/ckeditor5-react").then(module => ({ default: module.CKEditor })));
const ClassicEditor = lazy(() => import("@ckeditor/ckeditor5-build-classic"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [state, setState] = useState({ open: false });
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const handleClose = () => {
    setState({ open: false });
  };


  const { open } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [editorData, setEditorData] = useState("");
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);  
  const productQnA = useSelector((state) => state.productQnA);
    const {loading, error, productQnA:QnA, successUpdate} = productQnA;
  

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
          mainAxiosInstance.post(`/items/qna/uploadImage/${id}/`,   
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
  function submitHandler(e) {
    e.preventDefault();
    dispatch(updateProductQnA({ id, title, content: editorData, image_url: fileName}));
  
  
  }
useEffect(() => {
    if (QnA&& QnA.title, QnA.content) {
      setTitle(QnA.title);
      setContent(QnA.content);
      console.log(QnA.content)
    }
  }, [QnA]);


  useEffect(() => {
    if (successUpdate) {
      window.history.back()
      setState({ open: true });
        dispatch(productQnaReset());
    }
    if (error) {
        window.alert(error);
        dispatch(productQnaReset());
    }
  }, [error, navigate, id, successUpdate    ]);
  
  useEffect(() => {
    return () => {
      dispatch(productQnaReset());
    };
  }
  , []);
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
            Product Q&A
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

export default ProductQnAUpdate;