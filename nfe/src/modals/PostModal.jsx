import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import TagInput from '../components/TagInput';
import { mainAxiosInstance } from '../api/axiosInstances';
import { resetSuccess } from '../store/slices/boardSlices';

const PostModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    images: [],
    tags: [],
    title: '',
    content: '',
  });
  const [tagName, setTagName] = useState('');
  const selectTag = (tag) => {
    setFormData({
      ...formData,
      tags: [...formData.tags, tag],
    });
  };

  const onDrop = (acceptedFiles) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...acceptedFiles]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTagClick = (imageIndex, e) => {
    if (tagName) {
      const newTag = {
        imageIndex,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        tag: tagName
      };
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
    }
  };

  const handleDeleteTag = (tagIndex) => {
    const { tags } = formData;
    setFormData({
      ...formData,
      tags: tags.filter((_, index) => index !== tagIndex),
    });
  };

  const handleDeleteImage = (imageIndex) => {
    const { images, tags } = formData;
    const newTags = tags.filter(tag => tag.imageIndex !== imageIndex);
    setFormData({
      ...formData,
      images: images.filter((_, index) => index !== imageIndex),
      tags: newTags,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    formData.images.forEach((image) => {
      data.append('images', image);
    });
    data.append('tags', JSON.stringify(formData.tags));
    data.append('title', formData.title);
    data.append('content', formData.content);
    mainAxiosInstance.post('/board/create/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('Success:', response);
      dispatch(resetSuccess());
      onRequestClose();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-auto flex">
        <div className="w-2/3 border-r">
          <div {...getRootProps()} className="p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer mb-4 h-64 flex items-center justify-center">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-center text-gray-500">Drop the files here ...</p>
            ) : (
              <p className="text-center text-gray-500">Drag & drop some files here, or click to select files</p>
            )}
          </div>
          {formData.images.length > 0 && formData.images.map((image, index) => (
            <div key={index} className="relative mb-4">
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload Preview ${index + 1}`}
                className="w-full h-auto"
                onClick={(e) => handleTagClick(index, e)}
              />
              {formData.tags.filter(tag => tag.imageIndex === index).map((tag, tagIndex) => (
                <div
                  key={tagIndex}
                  style={{ position: 'absolute', top: tag.y, left: tag.x, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '2px 5px', cursor: 'pointer' }}
                  onClick={() => handleDeleteTag(tagIndex)}
                >
                  ✖ {tag.tag}
                </div>
              ))}
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={() => handleDeleteImage(index)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/3 p-4 relative">
          <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            ✖
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md h-24"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Tag Products:</label>
              <TagInput selectedTags={tagName} setSelectedTags={setTagName} />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit</button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PostModal;