import React from 'react'
import { useNavigate } from 'react-router'
import TechTab from './tabs/TechTab'
import ReviewTab from './tabs/ReviewTab'
import ProfileTab from './tabs/ProfileTab'
import OrderTab from './tabs/OrderTab'
import ProductTab from './tabs/ProductTab'
import BriefTab from './tabs/BriefTab'
import UsersTab from './tabs/UsersTab'
import NewsTab from './tabs/NewsTab'
import UserContext from '../../contexts/UserContext'
import useFetchData from '../../hooks/useFetchData'

const ProductTabBody = ({id, selectedTab}) => {
    const { data } = useFetchData(`http://localhost:3500/product/${id}`)
    const [product, setProduct] = React.useState(null)

    React.useEffect(() => {
        setProduct(data.product)
    }, [data])

    return (
        <>
            <BriefTab
                product={product}
                selectedTab={selectedTab}
            />

            <TechTab
                model={product?.techModel}
                tech={product?.tech}
                selectedTab={selectedTab}
            />

            <ReviewTab
                id={id}
                selectedTab={selectedTab}
            />
        </>
    )
}

const CustomerView = ({selectedTab}) => {
    const { accessToken } = React.useContext(UserContext)
    const navigate = useNavigate()
    const { data, fetchErr } =  useFetchData(`http://localhost:3500/user`, accessToken)
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if (data.success === 0)
            navigate('/')
        else
            setUser(data.user)
    }, [data])

    return (
        <>
            <ProfileTab
                user={user}
                selectedTab={selectedTab}
            />
            <OrderTab
                selectedTab={selectedTab}
            />
        </>
    )
}

const AdminView = ({selectedTab }) => {
    const { accessToken } = React.useContext(UserContext)
    const navigate = useNavigate()
    const { data, fetchErr } = useFetchData(`http://localhost:3500/user`, accessToken)
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if (data.success === 0)
            navigate('/')
        else
            setUser(data.user)
    }, [data])

    return (
        <>
            <ProfileTab
                user={user}
                selectedTab={selectedTab}
            />
            <ProductTab
                selectedTab={selectedTab}
            />
            <NewsTab 
                selectedTab={selectedTab}
                user={user}
            />
            <UsersTab
                selectedTab={selectedTab}
            />
        </>
    )
}

const EditorView = ({selectedTab}) => {
    const { accessToken } = React.useContext(UserContext)
    const navigate = useNavigate()
    const { data, fetchErr } =  useFetchData(`http://localhost:3500/user`, accessToken)
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if (data.success === 0)
            navigate('/')
        else
            setUser(data.user)
    }, [data])

    return (
        <>
            <ProfileTab
                user={user}
                selectedTab={selectedTab}
            />
            <NewsTab 
                selectedTab={selectedTab}
                user={user}
            />
        </>
    )
}

const TabBody = ({ id, isProduct, role, selectedTab}) => {
    return (
        <div className="tab-option-detail">
            {isProduct && 
                <ProductTabBody
                    id={id}
                    selectedTab={selectedTab}
                />
            }
            {!isProduct && role === 'customer' &&
                <CustomerView
                    selectedTab={selectedTab}
                />
            }
            {!isProduct && role === 'admin' &&
                <AdminView
                    selectedTab={selectedTab}
                />
            }
            {!isProduct && role === 'editor' &&
                <EditorView
                    selectedTab={selectedTab}
                />
            }
        </div>
    )
}

export default TabBody