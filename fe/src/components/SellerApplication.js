import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';



const SellerApplication = () => {
    const token = useSelector((state) => state.userLogin.userInfo.access);
    const [bsNumber, setBsNumber] = useState('');
    const [error, setError] = useState('');
    const [isSeller, setIsSeller] = useState(false); // 추가된 상태

    useEffect(() => {
        const checkSellerStatus = async () => {
            try {
                const response = await fetch('/seller/apply/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setIsSeller(!!data.id);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkSellerStatus();
    }, [token]);


    const handleBsNumberChange = (event) => {
        setBsNumber(event.target.value);
        };

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            
            // 판매자 신청이 성공하면, isSeller 상태 UPDATE.
            setIsSeller(true);

        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while saving the data.');
        }
        }
    };
    // 판매자 인지 확인 후, 이미 판매자면 페이지 숨김.

    if (isSeller) {
        return null;
    }

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