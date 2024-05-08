import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';



    const SellerApplication = () => {
       
        const token = useSelector((state) => state.userLogin.userInfo.access);
        
        const [bsNumber, setBsNumber] = useState('');
        const [error, setError] = useState('');
        const handleBsNumberChange = (event) => {
            setBsNumber(event.target.value);
            };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const formData = new FormData();

        // formData.append('bs_Number', bsNumber);

        const pattern = /^\d{10}$/;
        if (!pattern.test(bsNumber)) {
        setError('BS_NUMBER는 10자리 숫자로 입력해주세요.');
        } else {
        try {
            const response = await fetch('/seller/apply/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({ bs_number: bsNumber }),

            });

            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response data1:', data);
            setBsNumber('');
            setError('');
            alert('판매자 신청이 완료되었습니다.');
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while saving the data.');
        }
        }
    };

    return (
        <div>
        <h1>판매자 신청하기</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="bs_Number">BS_NUMBER:</label>
            <input
            type="text"
            id="bs_Number"
            value={bsNumber}
            onChange={handleBsNumberChange}
            />
            <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
        </div>
    );
    };

export default SellerApplication;