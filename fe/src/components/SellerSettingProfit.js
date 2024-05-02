import React from 'react'
import SellerClickChart from './SellerClickChart'
import SellerProfitChart from './SellerProfitChart'
import { Row } from 'react-bootstrap'

function SellerSettingProfit() {
  return (
    <Row>
        <SellerClickChart />
        <SellerProfitChart />
      
    </Row>
  )
}

export default SellerSettingProfit
