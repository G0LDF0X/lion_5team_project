import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 

function SampleEditorScreen({props}) {
    const [editorData, setEditorData] = useState('');
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

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/board/create/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // This line is crucial
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content: editorData }),
        });
        
        const data = await res.text();
        console.log(data);
        console.log(editorData)
    }
    return (<>
        <CKEditor
            editor={ ClassicEditor }
            data={editorData}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditorData(data);
            } }
        />
        <button type="submit" onClick={handleSubmit}>올리기</button>
        </>);
}

export default SampleEditorScreen;