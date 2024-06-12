import React, { useEffect, useState } from 'react';
import { LineChart, PieChart } from '@mui/x-charts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { mainAxiosInstance } from '../../api/axiosInstances';

function SellerMain() {
  const [monthlyRevenue, setMonthlyRevenue] = useState({ xAxis: [], series: [] });
  const [salesStats, setSalesStats] = useState([]);
  const [filter, setFilter] = useState('all'); // 필터 상태 추가
  const [dateRange, setDateRange] = useState(''); // 날짜 범위 상태 추가

  useEffect(() => {
    const userinfo = localStorage.getItem('userInfo');
    const parsedUserinfo = JSON.parse(userinfo);
    const sellerId = parsedUserinfo.id;

    if (sellerId) {
      mainAxiosInstance.get(`/seller/monthly-revenue/${sellerId}/?filter=${filter}`)
      .then(response => {
        const monthlyData = response.data.monthly_revenue;
        const xAxis = monthlyData.map(item => item.month);
        const series = monthlyData.map(item => item.revenue);
        setMonthlyRevenue({ xAxis, series });
      })
      .catch(error => {
        console.error('월간 수익금 데이터를 가져오는 중 오류가 발생했습니다!', error);
      });

      mainAxiosInstance.get(`/seller/item-sales-stats/${sellerId}/?filter=${filter}`)
      .then(response => {
        const itemStats = response.data.item_stats;
        setSalesStats(itemStats);
      })
      .catch(error => {
        console.error('판매 통계 데이터를 가져오는 중 오류가 발생했습니다!', error);
      });
    } else {
      console.error('판매자 ID를 찾을 수 없습니다.');
    }

    // 선택된 필터에 따라 정확한 날짜 범위를 설정
    setDateRange(getDateRange(filter));
  }, [filter]);

  // 선택된 필터에 따라 정확한 날짜 범위 반환하는 함수
  const getDateRange = (filter) => {
    const today = new Date();
    let startDate, endDate;
    if (filter === 'week') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - startDate.getDay());
      endDate = new Date(today);
      endDate.setDate(startDate.getDate() + 6);
    } else if (filter === 'month') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else {
      // 전체 기간
      startDate = new Date(2024, 0, 1); // 예시로 고정된 시작 날짜
      endDate = new Date(); // 현재 날짜로 고정된 종료 날짜
    }
    // 정확한 형식으로 날짜 범위 반환
    return `${startDate.getFullYear()}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getDate().toString().padStart(2, '0')} ~ ${endDate.getFullYear()}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
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
          <p>날짜 범위: {dateRange}</p>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>팔린 아이템 이름</TableCell>
                <TableCell align="right">팔린 수량</TableCell>
                <TableCell align="right">총 금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesStats.map((row) => (
                <TableRow key={row.item_name}>
                  <TableCell component="th" scope="row">
                    {row.item_name}
                  </TableCell>
                  <TableCell align="right">{row.total_sales}</TableCell>
                  <TableCell align="right">{row.total_revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-center mt-4">
          <button className="mx-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => setFilter('all')}>전체</button>
          <button className="mx-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => setFilter('month')}>월간</button>
          <button className="mx-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => setFilter('week')}>주간</button>
        </div>
      </div>
    </div>
  );
}

export default SellerMain;
