import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { useParams } from 'react-router-dom';

function  ItemQACreateScreen({props}) {
    const [editorData, setEditorData] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [title, setTitle] = useState('');
    const [token, setToken] = useState(null);
    const { id } = useParams();

    // Use useSelector to get the userInfo from the Redux store
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        // Set the token from userInfo
        if (userInfo) {
            setToken(userInfo.access);
        }
    }, [userInfo]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', editorData);

    
        const res = await fetch(`/items/qna/create/${id}/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userInfo.access}`,
            },
            body: formData,
        });
        
        
        const data = await res.text();
        console.log(data);

        if (res.ok) {
            alert('글이 성공적으로 작성되었습니다.');
            window.location.href = '/items/detail/'+id;
        } else {
            alert('글 작성에 실패하였습니다. 다시 시도해주세요.');
        }
    }

    return (<>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." /><br></br>

            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
            />

        <button type="submit" onClick={handleSubmit}>올리기</button>
        </>);
}

export default ItemQACreateScreen;