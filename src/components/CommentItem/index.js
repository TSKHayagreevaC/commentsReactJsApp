import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentItems} = props
  const {id, name, comment, date, initialBgClassName, isLiked} = commentItems
  const firstLetter = name ? name[0].toUpperCase() : ''
  const postedTime = formatDistanceToNow(date)
  const likedButtonClassName = isLiked ? 'active' : ''
  const likedImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const onClickLike = () => {
    const {likeDislike} = props
    likeDislike(id)
  }
  const onClickDeleteButton = () => {
    const {onDeleteComment} = props
    onDeleteComment(id)
  }
  return (
    <li className="item-style">
      <div className="item-container">
        <div className="first-line-container">
          <div className={`round-name-container ${initialBgClassName}`}>
            <p>{firstLetter}</p>
          </div>
          <div className="name-description-container">
            <div className="name-date-container">
              <p className="comment-name">{name}</p>
              <p className="comment-time">{postedTime} ago</p>
            </div>
            <p className="comment-description">{comment}</p>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="like-container">
          <img className="like-image" src={likedImageUrl} alt="like" />
          <button
            className={`like-button ${likedButtonClassName}`}
            type="button"
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={onClickDeleteButton}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
