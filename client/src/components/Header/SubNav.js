import React from 'react'
import { Link } from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'

const SubNavElement = ({brand}) => {
    return (
        <div className="category-bar__element">
            <div className="category-bar__line"></div>
            <Link to={`/products/${brand?.name}`} className="text-muted">{brand?.name}</Link>
        </div>
    )
}

const SubNav = () => {
    const {data} = useFetchData('http://localhost:3500/product/getbrand')
    const [brands, setBrands] = React.useState([])

    React.useEffect(() => {
        if (data && data?.size !== 0) 
            setBrands(data?.brands)
    }, [data])

    return (
        <div className='bg-white'>
            <div className="category-bar grid">
                {brands && brands?.length !== 0 &&  brands?.map((brand, i) => (
                    <SubNavElement 
                        key={i}
                        brand={brand}
                    />
                ))}
            </div>
        </div>

    )
}

export default SubNav