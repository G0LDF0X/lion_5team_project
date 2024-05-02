import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
import { Row, Col} from 'react-bootstrap';
import { PieChart, LineChart } from '@mui/x-charts';
// import { Col } from 'react-bootstrap';

export default function SellerSettingMainChart() {
  return (
    <Row>
        <Col md={6}>
            <h6>월간 수익금</h6>    
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
<Col md={6}>
    <h6>판매 통계</h6>
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
</Col>
    </Row>
  );
}