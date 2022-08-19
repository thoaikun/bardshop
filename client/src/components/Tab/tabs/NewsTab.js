import React from 'react'
import clsx from 'clsx'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import ToastMessage from '../../ToastMessage/ToastMessage'
import useFetchData from '../../../hooks/useFetchData'
import UserContext from '../../../contexts/UserContext'

const NewsTableElement = ({item, handleDeletePost}) => {
    return (
        <tr>
            <td>{item?.title ? item.title : 'Unknown'}</td>
            <td>
                <img src={item?.thumnail ? item.thumnail : ''} alt={item?.title} style={{width: '200px'}} />
            </td>
            <td>{item?.time ? new Date(item.time).toDateString() : ''}</td>
            <td>{item?.userId?.username ? item.userId.username : 'Unknown'}</td>
            <td>
                <div className='d-flex flex-column gap-2'>
                    <div 
                        className="btn btn-danger"
                        onClick={() => {
                            if(window.confirm('Are you sure want to delete this item ?'))
                                handleDeletePost(item._id)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>
                    <Link 
                        to={`/news/edit/${item._id}`}
                        className="btn btn-primary"
                    >
                        <FontAwesomeIcon icon={faPen}/>
                    </Link>
                </div>
            </td>
        </tr>
    )
}

const NewsTab = ({selectedTab}) => {
    const {accessToken} = React.useContext(UserContext)
    const { data } = useFetchData('http://localhost:3500/post')
    const [news, setNews] = React.useState([])
    const [deleteMessage, setDeleteMessage] = React.useState('')

    React.useEffect(() => {
        if (data && data?.size !== 0)
            setNews(data.posts)
    }, [data])

    const handleDeletePost = async (id) => {
        if (id) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/post/delete/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(() => {
                    let newList = news.filter(item => item._id !== id)
                    setNews(newList)
                })
                .catch(error => setDeleteMessage(error.response.data.result))
        }
    }

    return (
        <>
            {deleteMessage && deleteMessage !== '' && 
                <ToastMessage 
                    header={deleteMessage === 'success' ? "Success" : "Fail"}
                    body={`Delete new ${deleteMessage}`}
                />
            }
            <div 
                className={clsx("posts", {
                    'disappear': selectedTab !== "Post"
                })}
            >
                <div className="add-btn">
                    <Link to={`/news/add`}>Add news</Link>
                </div>

                {news && news?.length !== 0 ? 
                    <table className="item-table" style={{width: '1200px'}}>
                        <thead>
                            <tr>
                                <th>Post title</th>
                                <th>Post thumbnail</th>
                                <th>Created</th>
                                <th>By</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {news && news.length !== 0 && news.map((item, i) => (
                                <NewsTableElement
                                    key={i}
                                    item={item}
                                    handleDeletePost={handleDeletePost}
                                />
                            ))}
                        </tbody>
                    </table>
                    :
                    <p className='text-muted fs-4 pt-2'>No news found</p>
                }
            </div>
        </>
    )
}

export default NewsTab