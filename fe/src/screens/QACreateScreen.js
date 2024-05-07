import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 

function SampleEditorScreen({props}) {
    const [editorData, setEditorData] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [token, setToken] = useState(null);

    // Use useSelector to get the userInfo from the Redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        // Set the token from userInfo
        if (userInfo) {
            setToken(userInfo.access);
        }
    }, [userInfo]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', editorData);
        formData.append('image_url', imageUrl);
    
        const res = await fetch('/qna/create/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        
        const data = await res.text();
        console.log(data);

        // If the request was successful, show an alert and redirect to /qna/
        if (res.ok) {
            alert('질문이 성공적으로 작성되었습니다.');
            window.location.href = '/qna/';
        } else {
            alert('질문 작성에 실패하였습니다. 다시 시도해주세요.');
        }
    }

    return (<>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." /><br></br>
        <input type="file" onChange={handleImageUpload} /><br></br>
        <CKEditor
            editor={ ClassicEditor }
            data={editorData}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditorData(data);
            } }
        />
        <button type="submit" onClick={handleSubmit}>질문 올리기</button>
        </>);
}

export default SampleEditorScreen;