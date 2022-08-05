import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"
import SignIn from "./pages/Signin/SignIn"
import SignUp from "./pages/Signup/SignUp"
import Home from "./pages/Home/Home";
import { AddNew, NewDetail, EditNew, News } from './pages/News'
import { AddProduct, ProductDetail, EditProduct, ProductList } from './pages/Product'
import Account from './pages/Account/Account'
import Cart from './pages/Cart/Cart'
import About from './pages/About/About'
import NotFound from "./pages/Notfound/NotFound"
import { UserProvider } from "./contexts/UserContext"

import './index.css'
import 'animate.css'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route index element={<Home />}></Route>
                        <Route path="account/:id" element={<Account/>}></Route>
                        <Route path="products">
                            <Route index element={<ProductList/>}></Route>
                            <Route path=":brand" element={<ProductList/>}></Route>
                            <Route path=":brand/:id" element={<ProductDetail/>}></Route>
                            <Route path="add" element={<AddProduct />}></Route>
                            <Route path="edit/:id" element={<EditProduct />}></Route>
                        </Route>
                        <Route path="news">
                            <Route index element={<News/>}></Route>
                            <Route path=":id" element={<NewDetail/>}></Route>
                            <Route path="add/:userid" element={<AddNew/>}></Route>
                            <Route path="edit/:id" element={<EditNew/>}></Route>
                        </Route>
                        <Route path="cart" element={<Cart />}></Route>
                        <Route path="about" element={<About/>}></Route>
                        <Route path="*" element={<NotFound/>}></Route>
                    </Route>
                    <Route path="signin" element={<SignIn/>}></Route>
                    <Route path="signup" element={<SignUp/>}></Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>
)