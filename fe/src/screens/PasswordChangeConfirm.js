import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const PasswordChangeConfirm = () => {
    return (
        <div>
        <h1>비밀번호 변경이 완료되었습니다.</h1>
        <p>5초 후에 로그인 페이지로 이동합니다.</p> <br />
        <Link to="/">
            <Button variant='primary'>다시 로그인하기</Button>
        </Link>
        </div>
    );
};

export default PasswordChangeConfirm;