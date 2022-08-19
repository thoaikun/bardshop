import React from 'react'
import useFetchData from '../../../hooks/useFetchData'
import Card from '../../../components/Card/Card'

const RelatedProduct = ({ brand,id }) => {
    const { data, fetchErr } = useFetchData(`http://localhost:3500/product/getByBrand/${brand}`)
    const [relatedList, setRelatedList] = React.useState([])
    const cardListRef = React.useRef(null)
    const relatedProductRef = React.useRef(null)

    React.useEffect(() => {
        setRelatedList([])
    }, [])

    React.useEffect(() => {
        const newList = data?.products?.filter(p => p.id != id)
        if (newList?.length < 4)
            setRelatedList(newList)
        else 
            setRelatedList(newList?.slice(Math.floor(Math.random() * (newList?.length - 0 + 1) + 0)))
    }, [data, id])

    React.useEffect(() => {
        const horizontalScroll = () => {
            let scrollAmount = 50
            relatedProductRef.current.addEventListener('wheel', (e) => {
                scrollAmount += e.wheelDelta*5
                cardListRef.current.scroll({
                    top: 0,
                    left: scrollAmount,
                    behavior: 'smooth'
                })
                e.preventDefault()
            } )
        }
        horizontalScroll()
    }, [cardListRef, relatedProductRef])

    return (
        <div className="related-product grid" ref={relatedProductRef}>
            <div className="related-product__title mb-3">
                <h5>Related products</h5>
            </div>
    
            <div className="related-product__list cardlist" ref={cardListRef}>
                {relatedList?.length !== 0 && !fetchErr && relatedList?.map((product) => (
                    <Card 
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        reviewPoint={product.star}
                        images={product.imgs}
                        type={product.type.name}
                        brand={product.brand.name}
                    />
                 ) )}
                {relatedList?.length == 0 && <p>No related product found</p>}
            </div>
        </div>
    )
}

export default RelatedProduct