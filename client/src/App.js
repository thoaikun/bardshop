import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'


const App = () => {
    return (
        <div className='App'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default App