import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './components/Product';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import PaymentScreen from './screens/PaymentScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import MyShoppingScreen from './screens/MyShoppingScreen';
import MyQAScreen from './screens/MyQAScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import MyReviewScreen from './screens/MyReviewScreen';
import UserSettingScreen from './screens/UserSettingScreen';  
import SellerMainScreen from './screens/SellerMainScreen';
import SellerManageScreen from './screens/SellerManageScreen';
import SellerRevenueScreen from './screens/SellerRevenueScreen';
import SellerQAScreen from './screens/SellerQAScreen';
import SellerSettingScreen from './screens/SellerSettingScreen';
import BoardScreen from './screens/BoardScreen';
import BoardDetailScreen from './screens/BoardDetailScreen';
import BoardCreateScreen from './screens/BoardCreateScreen';
import QAUpdateScreen from './screens/QAUpdateScreen';
import ProductUpdateScreen from './screens/ProductUpdateScreen';
import BoardUpdateScreen from './screens/BoardUpdateScreen';
import QAScreen from './screens/QAScreen';
import QACreateScreen from './screens/QACreateScreen';
import QADetailScreen from './screens/QADetailScreen';
import SellerRegisterScreen from './screens/SellerRegisterScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import SampleEditorScreen from './screens/SampleEditorScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ReviewEditScreen from './screens/ReviewEditScreen';
import OrderCreateScreen from './screens/OrderCreateScreen';
import ShippingScreen from './screens/ShippingScreen';
import ShippingAdressScreen from './screens/ShippngAdressScreen';
import OtherUserProfileNavbar from './components/OtherUserProfileNavbar';
import PasswordChangeConfirm from './screens/PasswordChangeConfirm';

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path='' element={<HomeScreen/>} />
            <Route path='/items' element={<ProductsScreen/>} />
            <Route path='/items/detail/:id' element={<ProductDetailScreen/>} />
            <Route path='/cart' element={<CartScreen/>} />
            <Route path='/items/update/:id' element={<ProductUpdateScreen/>} />
            <Route path='/items/review/:id' element={<ReviewEditScreen/>} />

            <Route path='/shipping' element={<ShippingScreen/>} />  
            <Route path='/order/:id' element={<PaymentScreen/>} />
            <Route path='/order/detail/:id' element={<OrderDetailScreen/>} />            
            <Route path='/orders/create' element={<OrderCreateScreen/>} />
            <Route path ='/shippingAdress' element={<ShippingAdressScreen/>} />

            <Route path='/login' element = {<LoginScreen/>} />
            <Route path='/register' element = {<RegisterScreen/>} />
            <Route path='/users/bookmark' element={<BookmarkScreen/>} />
            <Route path='/users/profile' element={<UserProfileScreen/>} />
            <Route path='/users/myshopping'element={<MyShoppingScreen/>} />
            <Route path='/users/myshopping/myqna'  element={<MyQAScreen/>} />
            <Route path='/users/myreview' element={<MyReviewScreen/>} />
            <Route path='/users/settings' element={<UserSettingScreen/>} />
            <Route path='/users/:id' element={<OtherUserProfileNavbar/>} />
            <Route path='/password-change-confirm' element={<PasswordChangeConfirm/>} />

            <Route path='/seller/register' element={<SellerRegisterScreen/>} />
            <Route path='/seller/index' element={<SellerMainScreen/>} />
            <Route path='/seller/manage' element={<SellerManageScreen/>} />
            <Route path='/seller/revenue' element={<SellerRevenueScreen/>} />
            <Route path='/seller/qna' element={<SellerQAScreen/>} />
            <Route path='/seller/settings' element={<SellerSettingScreen/>} />

            <Route path='/board' element={<BoardScreen/>} />
            <Route path='/board/detail/:id' element={<BoardDetailScreen/>} />
            <Route path='/board/create/' element={<BoardCreateScreen/>} />
            {/* <Route path='/board/post' element={<BoardPostScreen/>} /> */}
            <Route path='/board/update/:id' element={<BoardUpdateScreen/>} />

            <Route path='/qna' element={<QAScreen/>} />
            <Route path='/qna/create' element={<QACreateScreen/>} />
            <Route path='/qna/detail/:id' element={<QADetailScreen/>} />
            <Route path='/qna/update/:id' element={<QAUpdateScreen/>} />

            <Route path='/editor' element={<SampleEditorScreen/>} />
          </Routes>
        </Container>  
      </main>
      <Footer />
    </Router>
  )

}

export default App;
