import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
import { Row, Col} from 'react-bootstrap';
import { PieChart, LineChart } from '@mui/x-charts';
// import { Col } from 'react-bootstrap';

export default function SellerProfitChart() {
  return (
    <Row>
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
  );
}