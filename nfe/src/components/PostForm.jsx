import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const tags = ["Tag1", "Tag2", "Tag3", "Sample Tag"]; // Add your tags here

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [tag, setTag] = useState(tags[0]);
  const [files, setFiles] = useState([]);
  const [tagPosition, setTagPosition] = useState({ top: '10px', left: '10px' });
  const [error, setError] = useState('');

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/gif',
    onDrop: acceptedFiles => {
      const validFiles = acceptedFiles.filter(validateFile);

      if (validFiles.length === 0) {
        setError('Only image files are accepted');
        return;
      }

      setError('');
      setFiles(currentFiles => [
        ...currentFiles,
        ...validFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}`
        }))
      ]);
    },
    onDropRejected: () => {
      setError('Only image files are accepted');
    }
  });

  const handleImageClick = (e, index) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newTagPosition = { top: `${y}px`, left: `${x}px` };
    setTagPosition(newTagPosition);
    const updatedFiles = files.map((file, i) => i === index ? { ...file, tagPosition: newTagPosition, tag: tag } : file);
    setFiles(updatedFiles);
  };

  const handleRemove = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFiles = Array.from(files);
    const [movedFile] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, movedFile);

    setFiles(reorderedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    files.forEach(file => {
      formData.append('images', file);
      formData.append('tagPositions', JSON.stringify(file.tagPosition || {}));
    });

    try {
      await axios.post('/api/posts', formData);
      // Handle successful post submission
    } catch (error) {
      console.error('Error submitting post:', error);
      // Handle error in post submission
    }
  };

  const handleEditorFocus = () => {
    console.log('Editor focused');
  };

  const handleEditorInit = (evt, editor) => {
    console.log('Editor initialized', evt, editor);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-4 mb-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="files" direction="horizontal">
          {({ droppableProps, innerRef, placeholder }) => (
            <div
              {...droppableProps}
              ref={innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
            >
              {files.map((file, index) => (
                <Draggable key={file.id} draggableId={file.id} index={index}>
                  {({ draggableProps, dragHandleProps, innerRef }) => (
                    <div
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                      className="relative"
                    >
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onClick={(e) => handleImageClick(e, index)}
                        style={{ cursor: 'pointer' }}
                      />
                      {file.tagPosition && (
                        <div style={{
                          position: 'absolute',
                          top: file.tagPosition.top,
                          left: file.tagPosition.left,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '5px'
                        }}>
                          {file.tag}
                        </div>
                      )}
                      <button
                        onClick={() => handleRemove(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                      >
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mb-4">
        <label className="block mb-2">Tag</label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Caption</label>
        <div className="border border-gray-300 rounded">
        <Editor
          apiKey='cuqmugjulxoqzuwvm7ui3ff0z9nn0ou5xjgh03eig3rc6a9m'
            initialValue="<p>Type your caption here...</p>"
            init={{
              height: 400,
              menubar: false,
              selector: 'textarea',
              plugins: [
                'advlist', 'lists','link','image','charmap','preview','anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                 'media', 'table',  'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        setup: (editor) => {
                          editor.on('focus', handleEditorFocus);
                          editor.on('init', handleEditorInit);
                        }
                      
            }}
            onEditorChange={(content) => setCaption(content)}
          />

        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default PostForm;