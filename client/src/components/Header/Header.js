import React from 'react'
import Nav from "./Nav"
import SubNav from './SubNav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'

const Header = () => {
    const [disappear, setDisappear] = React.useState(true)

    return (
        <header id='header'>
            <Nav
                disappear={disappear}
                setDisappear={setDisappear} 
            />
            <SubNav />
        </header>
    )
}

export default Header