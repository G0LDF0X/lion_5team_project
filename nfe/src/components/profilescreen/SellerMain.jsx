import React, { useEffect, useState } from 'react';
import { LineChart, PieChart } from '@mui/x-charts';
import { mainAxiosInstance } from '../../api/axiosInstances';

function SellerMain() {
  const [monthlyRevenue, setMonthlyRevenue] = useState({ xAxis: [], series: [] });

  // 판매 통계 데이터를 하드코딩
  const salesStats = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
  ];

  useEffect(() => {
    // 로컬 스토리지에서 로그인한 사용자 ID를 가져옵니다.
    const userinfo = localStorage.getItem('userInfo');
    const parsedUserinfo = JSON.parse(userinfo);
    const sellerId = parsedUserinfo.id;
    console.log('Seller ID:', sellerId); 
    if (sellerId) {
      mainAxiosInstance.get(`/seller/monthly-revenue/${sellerId}/`)
      .then(response => {
        const monthlyData = response.data.monthly_revenue;
        const xAxis = monthlyData.map(item => item.month); // 월간 데이터의 월 정보로 x 축 설정
        const series = monthlyData.map(item => item.revenue); // 월간 수익 정보로 시리즈 설정
        setMonthlyRevenue({ xAxis, series });
        console.log('월간 수익금 데이터:', response.data);
        console.log('monthlyRevenue 상태 업데이트:', { xAxis, series });
      })
      .catch(error => {
        console.error('월간 수익금 데이터를 가져오는 중 오류가 발생했습니다!', error);
      });
    } else {
      console.error('판매자 ID를 찾을 수 없습니다.');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 mb-6">
        <h6 className="text-xl font-bold text-center mb-2">월간 수익금</h6>
        <div className="flex justify-center">
          <LineChart
            xAxis={[{ data: monthlyRevenue.xAxis }]}
            series={[{ data: monthlyRevenue.series }]}
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        <h6 className="text-xl font-bold text-center mb-2">판매 통계</h6>
        <div className="flex justify-center">
          <PieChart
            series={[{ data: salesStats }]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default SellerMain;