import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { BarChart, LineChart } from '@mui/x-charts'

function SellerSettingProfit() {
  return (
    <Row>
        <Col md={6}>    
        <h6>    클릭수</h6>

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
    </Col>
    <Col md={6}>
            <h6>날짜별 수익계산</h6>    
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
</Col>
      
    </Row>
  )
}

export default SellerSettingProfit
