import {Component} from 'react'
import './index.css'
import {v4 as uuid} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    const initialBgColorClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuid(),
      name,
      comment,
      date: new Date(),
      initialBgClassName: initialBgColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  renderListItem = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentItems={eachComment}
        likeDislike={this.likeDislike}
        onDeleteComment={this.onDeleteComment}
      />
    ))
  }

  likeDislike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  onDeleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  render() {
    const {name, comment, commentsList} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="inner-container">
          <div className="content-container">
            <form className="form-style" onSubmit={this.onAddComment}>
              <p className="top-text">Say something about 4.0 Technologies</p>
              <input
                className="input-heading"
                type="input"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
              />
              <textarea
                className="input-text-area"
                rows="6"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
          </div>
          <img
            className="front-image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="line" />
        <p className="count-text">
          <span className="comments-count-span">{commentsList.length}</span>
          Comments
        </p>
        <ul className="comments-list">{this.renderListItem()}</ul>
      </div>
    )
  }
}

export default Comments
