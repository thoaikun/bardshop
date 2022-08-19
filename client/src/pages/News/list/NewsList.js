import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import useFetchData from '../../../hooks/useFetchData'

const NewElement = ({item}) => {
    return (
        <div className="news-element">
            <img src={item?.thumnail} alt={item?.title ? item.title : ''}/>
            <div className="news-element__info">
                <h5 className="mb-2">
                    <Link to={`/news/detail/${item._id}`}>
                        {item?.title}
                    </Link>
                </h5>
                <p className="text-muted fs-7">Ngày đăng: {item?.time ? new Date(item.time).toDateString() : ''}</p>
                <p className="text-muted fs-7">{item?.userId?.username}</p>
            </div>
        </div>
    )
}

const NewsList = () => {
    const [news, setNews] = React.useState([])
    const [showedNews, setShowedNews] = React.useState([])
    const { data } = useFetchData('http://localhost:3500/post')

    React.useEffect(() => {
        if (data)
            setNews(data?.posts)
    }, [data])

    React.useEffect(() => {
        setShowedNews(news?.slice(0, Math.min(5, news?.length)))
    }, [news])

    const handleLoadMore = () => {
        let arr = [...showedNews]
        for (let i=showedNews?.length; i < Math.min(showedNews?.length + 5, news.length); i++)
            arr.push(news[i])
        setShowedNews(arr)
    }

    return (  
        <div className="news-hot grid my-5">
            <div className="news-hot__title new-title">
                <h2>All news</h2>
            </div>
            <div className="news-hot__list newlist">
                {showedNews && showedNews?.length !== 0 && showedNews.map((item, i) => (
                    <NewElement
                        key={i}
                        item={item}
                    />
                ))}
                {showedNews && showedNews?.length >= 5 &&
                     <div
                        className={clsx('btn button__submit', {
                            'disabled': showedNews?.length === news?.length
                        })}
                        onClick={handleLoadMore}
                    >   
                        Show more
                    </div>
                }
                {news && news?.length === 0 && 
                    <p className='text-muted fs-4 pt-2'>No news found</p>
                }
            </div>
        </div>
    )
}

export default NewsList