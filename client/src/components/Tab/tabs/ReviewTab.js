import React from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import useFetchData from '../../../hooks/useFetchData'
import UserContext from '../../../contexts/UserContext'
import ToastMessage from '../../ToastMessage/ToastMessage'

const Comment = ({ review }) => {
    const handleStarPoint = (point) => {
        let pointStar = []
        for (let i=0; i < 5; i++) {
            if (i < point) {
                pointStar.push(true)
            }
            else {
                pointStar.push(false)
            }
        }

        return pointStar.map((item, i) => (
            <span key={i}>
                <FontAwesomeIcon 
                    icon={faStar}
                    className={clsx("text-muted", {
                        'review--select': item
                    })}
                ></FontAwesomeIcon>
            </span>
        ))
    }

    let date = new Date(review?.modifiedAt)

    return (
        <div className="review__element">
            <h5 className="mb-2">{review?.userId?.username}</h5>
            <p className='text-muted mb-2'>{date.toDateString()}</p>
            <div className="mb-2">
                <div>
                    {handleStarPoint(review.rating)}
                </div>
            </div>
            <p>{review?.body}</p>
            <hr/>
        </div>
    )
}


const ReviewTab = ({ id,selectedTab }) => {
    const {login, handleAddComment} = React.useContext(UserContext)
    const { data } = useFetchData(`http://localhost:3500/review/${id}`)
    const [reviews, setReviews] = React.useState([])
    const [showedReviews, setShowedReviews] = React.useState([])
    const [commentInput, setCommentInput] = React.useState('')
    const [rateInput, setRateInput] = React.useState(0)
    const [addCommentErr, setAddCommentErr] = React.useState('')

    React.useEffect(() => {
        setReviews(data?.reviews)
        setShowedReviews([])
    }, [data])

    React.useEffect(() => {
        let temp = [...showedReviews]
        for (let i=0; i < Math.min(5, reviews?.length); i++) {
            temp.push(reviews[i])
        }
        setShowedReviews(temp)
    }, [reviews])

    const handleLoadMore = () => {
        let temp = [...showedReviews]
        for (let i=showedReviews?.length; i < Math.min(showedReviews?.length+5, reviews?.length); i++) {
            temp.push(reviews[i])
        }
        setShowedReviews(temp)
    }

    const handleLoadNewComment = (comment) => {
        let temp = [comment,...showedReviews]
        setShowedReviews(temp)
    }

    return (
        <>
            {addCommentErr && addCommentErr !== '' && 
                <ToastMessage 
                    header={addCommentErr === "success" ? "Success" : "Fail"}
                    body={`You have already commented`}
                />
            }
            <div
                className={clsx("review", {
                    'disappear': selectedTab !== 'Reviews'
                })}
            >
                {showedReviews?.length !== 0 &&  showedReviews.map((review, i) => (
                    <Comment 
                        key={i}
                        review={review}
                    />
                ))}
                {showedReviews?.length === 0 && <p className='fs-5 px-2 mb-3'>No reviews found</p>}

                <div className='review__add mb-3'>
                    <label>Rate</label>
                    <input
                        type='number'
                        max={5}
                        min={0}
                        className = 'form-control'
                        value={rateInput}
                        onChange={(e) => setRateInput(e.target.value)}
                    />
                    <input 
                        type='text'
                        placeholder={login ? 'Leave a comment' : 'Please login to leave a comment'}
                        className='form-control'
                        disabled={login ? false : true}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <div 
                        className={clsx('btn button__submit', {
                            'disabled': !login
                        })}
                        onClick={() => {
                            const newComment = {
                                productId: id,
                                rating: rateInput,
                                body: commentInput
                            }
                            handleAddComment(newComment)
                                .then(res => {
                                    if (res)
                                        handleLoadNewComment(newComment)
                                    else
                                        setAddCommentErr('error')
                                })
                        }}
                    >
                        <FontAwesomeIcon 
                            icon={faPaperPlane}
                        />
                    </div>
                </div>

                {showedReviews?.length !== reviews?.length &&
                    <div 
                        className="load-more"
                        onClick={handleLoadMore}
                    ></div>
                }
            </div> 
        </>
    )
}

export default ReviewTab