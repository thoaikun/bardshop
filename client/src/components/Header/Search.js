import React from 'react'
import clsx from 'clsx'
import useFetchData from '../../hooks/useFetchData'
import { Link } from 'react-router-dom'

const SearchElement = ({id, name, images, setDisappear}) => {
    return (
        <div className="search-card my-2">
            <img src={`http://localhost:3500/imgs/product/${images[images?.length ? images?.length - 1 : 0]}`} alt={name}/>
            <Link 
                to={`/products/Smartphone/${id}`}
            >
                {name}
            </Link>
        </div>
    )
}

const SearchList = ({ name, setDisappear }) => {
    const [searchedList, setSearchedList] = React.useState([])
    const { data } = useFetchData(`http://localhost:3500/product/search/${name}`)

    React.useEffect(() => {
        if (data)
            setSearchedList(data?.products)
    }, [data])

    return (
        <div className="search-bar__result">
            {searchedList?.length !== 0 && searchedList?.map((item, i) =>(
                <SearchElement
                    key={i}
                    id = {item._id}
                    name={item.name}
                    images={item.imgs}
                />
            ))
            }
            {searchedList?.length === 0 && name && <p>No product found</p>}
        </div>
    )
}

const Search = ({disappear, setDisappear}) => {
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        setName('')
    }, [disappear])

    return (
        <div 
            className={clsx("search-bar", {
                'disappear': disappear
            })}
            onClick={(e) => e.stopPropagation()}
        >
            <input 
                type="text" 
                className="form-control my-2" 
                placeholder="type to search" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <SearchList 
                name={name}
                setDisappear={setDisappear}
            />
        </div>
    )
}

export default Search