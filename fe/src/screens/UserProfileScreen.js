import React, {useEffect} from 'react'
import UserSettingNavBar from '../components/UserSetitngNavbar'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../actions/userActions'
function UserProfileScreen() {
const dispatch = useDispatch()
const navigate = useNavigate()
const location = useLocation()
const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin
const redirect = location.state ? location.state.from : '/' 

useEffect(() => {
if (!userInfo) {
navigate('/login')
}
}
, [userInfo, navigate])
  return (
    <div>
      <UserSettingNavBar />
    </div>
  )
}

export default UserProfileScreen
