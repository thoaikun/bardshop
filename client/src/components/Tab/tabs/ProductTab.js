import clsx from 'clsx'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import ToastMessage from '../../ToastMessage/ToastMessage'
import useFetchData from '../../../hooks/useFetchData'
import UserContext from '../../../contexts/UserContext'

const ProductTableElement = ({id, name, images, brand, createdDate, modifiedDate, handleDelete}) => {
    return (
        <tr>
            <td>{name ? name : ''}</td>
            <td>
                <img src={`http://localhost:3500/imgs/product/${images[images?.length - 1]}`} alt={name} style={{width: '200px'}}/>
            </td>
            <td>{new Date(createdDate).toDateString()}</td>
            <td>{new Date(modifiedDate).toDateString()}</td>
            <td>
                <div 
                    className="btn btn-danger mb-2"
                    onClick={() => {
                        if (window.confirm('Are you sure want to delete this item ?'))
                            handleDelete(id)
                    }}
                >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </div>
                <Link 
                    to={`/products/edit/${id}`}
                    className="btn btn-primary"
                >
                    <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                </Link>
            </td>
        </tr>
    )
}

const ProductTab = ({selectedTab}) => {
    const {accessToken} = React.useContext(UserContext)
    const {data} = useFetchData('http://localhost:3500/product')
    const [products, setProducts] = React.useState([])
    const [deleteMessage, setDeleteMessage] = React.useState('')

    React.useEffect(() => {
        setProducts(data.products)
    }, [data])

    // handle remove toast message
    React.useEffect(() => {
        let tid = setTimeout(() => setDeleteMessage(null), 1500)

        return () => {
            clearTimeout(tid)
        }
    }, [deleteMessage])

    const handleDelete = async (id) => {
        if (id) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/product/delete/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(response => {
                    let newList = products.filter((product) => product._id !== id)
                    setProducts(newList)
                    setDeleteMessage(response.data.result)
                })
                .catch(error => setDeleteMessage(error.response.data.result))
        }
    }

    return (
        <>
            {deleteMessage && deleteMessage !== '' && 
                <ToastMessage 
                    header={deleteMessage === 'success' ? "Success" : "Fail"}
                    body={`Delete product ${deleteMessage}`}
                />
            }
            <div className={clsx('products', {
                'disappear': selectedTab !== 'Products'
            })}>
                <div className="add-btn">
                    <Link to="/products/add">
                        Add product
                    </Link>
                </div>

                <table className="item-table">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Picture</th>
                            <th>Created</th>
                            <th>Modifiled</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.length !== 0 && products?.map((product, i) => (
                            <ProductTableElement  
                                key={i}
                                id={product?._id ? product._id : ''}
                                name={product?.name ? product.name : ''}
                                images={product?.imgs ? product.imgs : ''}
                                brand={product?.brand?.name ? product.brand?.name : ''}
                                createdDate={product?.createdAt ? product.createdAt : ''}
                                modifiedDate={product?.modifiedAt ? product.modifiedAt : ''}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
                {products && products?.length === 0 && <p className='text-muted fs-4 pt-2'>No products found</p>}
            </div>
        </>
    )
}

export default ProductTab