// AddressSearch.jsx

import React, { useState } from 'react';

const AddressSearch = ({ onAddressSelected }) => {
  const [zipCode, setZipCode] = useState('');
  const [addr, setAddr] = useState('');
  const [addrDtl, setAddrDtl] = useState('');

  const handleAddrDtlChange = (e) => {
    const newAddrDtl = e.target.value;
    setAddrDtl(newAddrDtl);
  };

  const openZipSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = '';
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        setZipCode(data.zonecode);
        setAddr(addr);
        setAddrDtl('');

        // 상위 컴포넌트에 주소 정보 전달
        onAddressSelected({
          zipCode: data.zonecode,
          addr: addr,
          addrDtl: addrDtl,
        });
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