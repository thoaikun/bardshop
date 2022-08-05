import React from 'react'
import { useNavigate, useParams } from 'react-router'
import UserContext from '../../contexts/UserContext'
import useFetchData from '../../hooks/useFetchData'
import Tab from '../../components/Tab/Tab'
import "./Account.css"

const Account = () => {
    const { login, accessToken } = React.useContext(UserContext)
    const [role, setRole] = React.useState(null)
    const { data } = useFetchData(`http://localhost:3500/user`, accessToken)
    let navigate = useNavigate()

    React.useEffect(() => {
        if (data && data?.user) {
            setRole(data.user.role === 1 ? 'admin' : 
                     data.user.role === 2 ? 'editor' : 'customer')
        }
    }, [data])

    React.useEffect(() => {
        if (!login)
            navigate('/')
    }, [login])

    React.useEffect(() => {
        window.scrollTo(0,0)
    })

    return (
        <div className='content'>
            <Tab
                tabNames={role === 'admin'  ? ['Profile', 'Products', 'Post', 'Users'] : 
                          role === 'editor' ? ['Profile', 'Post'] : ['Profile', 'Order']
                        }
                role={role}
            />
        </div>
    )
}

export default Account