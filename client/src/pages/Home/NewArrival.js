import React from 'react'
import ProductCard from '../../components/Card/Card'
import useFetchData from '../../hooks/useFetchData'

const NewArrival = () => {
    const [newArrivalProducts, setNewArrivalProducts] = React.useState([])
    const {data} = useFetchData('http://localhost:3500/product')

    React.useEffect(() => {
        if (data?.size !== 0) {
            setNewArrivalProducts(data?.products?.slice(0, Math.min(8, data?.products?.length)))
        }
    }, [data])

    return (
        <div className="new-arrival grid mb-3 py-5">
            <div className="new-arrival__header h3 mb-3">
                New arrival
                <hr/>
            </div>
            <div className="cardlist">
                {newArrivalProducts && newArrivalProducts?.length !== 0 && newArrivalProducts?.map((product) => (
                    <ProductCard 
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        reviewPoint={product.star}
                        images={product.imgs}
                        type={product?.type?.name}
                        brand={product?.brand?.name}
                    />
                ))}
                {newArrivalProducts && newArrivalProducts?.length === 0 && <p>No product found</p>}
            </div>
        </div>
    )
}

export default NewArrival