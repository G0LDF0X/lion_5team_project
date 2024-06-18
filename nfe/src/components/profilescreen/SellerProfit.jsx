import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';
function SellerProfit() {
  return (
    <Box className="flex flex-col md:flex-row gap-8 p-4">
      <Box className="flex-1">
        <Typography variant="h6" className="mb-4 text-center text-gray-700">
          클릭수
        </Typography>
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Box>
      <Box className="flex-1">
        <Typography variant="h6" className="mb-4 text-center text-gray-700">
          날짜별 수익계산
        </Typography>
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
      </Box>
    </Box>
  );
}

export default SellerProfit;