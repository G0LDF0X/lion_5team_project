import React, {useEffect} from 'react'
import UserSettingNavBar from '../components/UserSetitngNavbar'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getUserDetails, logout } from '../actions/userActions'
import { listBookMark } from '../actions/bookmarkActions'
import { listProducts } from '../actions/productActions'
import { getMyOrders } from '../actions/orderActions'
import { listMyReviews } from '../actions/reviewActions'
function UserProfileScreen() {
const dispatch = useDispatch()
const navigate = useNavigate()
const location = useLocation()
const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin
const redirect = location.state ? location.state.from : '/' 

useEffect(() => {
if (!userInfo || !userInfo.username) {
navigate('/login')
}else{
dispatch(listBookMark())
dispatch(getUserDetails(userInfo.id))
dispatch(listProducts())
dispatch(getMyOrders())
dispatch(listMyReviews())

}
}
, [navigate])
  return (
    <div>
      <UserSettingNavBar />
    </div>
  )
}

export default UserProfileScreen
