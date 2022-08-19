import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import useFetchData from '../../hooks/useFetchData'

const PostElement = ({item}) => {
    return (
        <div className="card-element border border-1">
            <div 
                className="card-element__img" 
                style={{
                    backgroundImage: `url(${item?.thumnail})`
                }}
            >        
            </div>
            <div className="card-element__detail p-3">
                <p className="text-muted pb-1">News</p>
                <Link 
                    to={item && item?._id ? `news/${item._id}` : ''}
                    className='fw-bold py-1'
                >
                    {item?.title}
                </Link>
            </div>
        </div>
    )
}

const NewestNews = () => {
    const [news, setNews] = React.useState([])
    const {data} = useFetchData('http://localhost:3500/post')

    React.useEffect(() => {
        if (data && data?.size !== 0)
            setNews(data?.posts?.slice(0, 3))
    }, [data])

    return (
        <div className="post grid mb-5 py-5">
            <div className="post__header mb-3">
                <h2>News</h2>
                <Link to="/news">
                    See more
                    <FontAwesomeIcon 
                        icon={faCircleArrowRight}
                        className="ms-1"
                    ></FontAwesomeIcon>
                </Link>
            </div>
            <div className="cardlist">
                {news && news?.length !== 0 && news?.map((item, i) => (
                    <PostElement 
                        key={i}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewestNews