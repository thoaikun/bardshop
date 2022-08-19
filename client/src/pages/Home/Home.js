import React from 'react'
import AdSlider from './AdSlider'
import NewArrival from './NewArrival'
import TopProduct from './TopProduct'
import NewestNews from './NewestNews'
import Banner from './Banner'
import './Home.css'

const Home = () => {
    React.useEffect(() => {
        window.scrollTo(0,0)
        document.title = "Bardshop"
    }, [])
    
    return (
        <div className='content'>
            <AdSlider />
            <NewArrival />
            <Banner />
            <TopProduct />
            <NewestNews />
        </div>
    )
}

export default Home