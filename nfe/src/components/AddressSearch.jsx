import React, { useState, useEffect } from 'react';

const AddressSearch = ({ onAddressSelected }) => {
  const [zipCode, setZipCode] = useState('');
  const [addr, setAddr] = useState('');
  const [addrDtl, setAddrDtl] = useState('');

  useEffect(() => {
    // 상태가 변경될 때마다 상위 컴포넌트에 주소 정보를 전달합니다.
    onAddressSelected({
      zipCode,
      addr,
      addrDtl,
    });
  }, [zipCode, addr, addrDtl, onAddressSelected]);

  const handleAddrDtlChange = (e) => {
    setAddrDtl(e.target.value);
  };

  const openZipSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

        setZipCode(data.zonecode);
        setAddr(addr);
        setAddrDtl('');
      },
    }).open();
  };

  return (
    <div>
      <label>Address:</label>
      <div>
        <input
          type="text"
          value={zipCode}
          onClick={openZipSearch}
          readOnly
          placeholder="우편번호"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          value={addr}
          readOnly
          placeholder="주소"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          value={addrDtl}
          onChange={handleAddrDtlChange}
          placeholder="상세주소"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
    </div>
  );
};

export default AddressSearch;
