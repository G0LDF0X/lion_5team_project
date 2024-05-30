import React from 'react';
import { LineChart, PieChart } from '@mui/x-charts';

function SellerMain() {
  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 mb-6">
        <h6 className="text-xl font-bold text-center mb-2">월간 수익금</h6>
        <div className="flex justify-center">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        <h6 className="text-xl font-bold text-center mb-2">판매 통계</h6>
        <div className="flex justify-center">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default SellerMain;