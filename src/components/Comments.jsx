

import React, { Component } from 'react'
import apiHandler from "../api/apiHandler";




export default class Comments extends Component {


state={
    comments: []
}

componentDidMount() {

    apiHandler.getComment()
    .then((apiResp) => {
        console.log(apiResp)
        const commentsPost = apiResp.filter((comm) => comm.id_wall === this.props.postId)
        this.setState({
            comments: commentsPost
        })
    })


}

displayUserPostButtons = (comm) => {
    
    if (this.props.userEmail === comm.id_user.email) {
      return (
      
      <div>
   <button onClick={() => {this.props.deleteComment(comm._id)}}>delete</button>
       
      </div>)
    }
  }

    render() {
        return (
            <div>
                <h1>comments</h1>
                {this.state.comments.map((comment) => {
                    return (
                      <div key={comment._id}>
                        <div  className="usercommenting">
                            <img className="ppcomment" src={comment.id_user["profileImg"]}/>
                        <p>{comment.id_user["firstName"]} {comment.id_user["lastName"]} </p>
                        <p>{comment.created_at.slice(0,10)} </p>
                        </div>
                        <p>{comment.text}</p>
                        {/* <button onClick={() => this.props.deleteComment(comment._id)}>delete</button> */}
                    {this.displayUserPostButtons(comment)}
                    </div>
                    
                    )
                })}
            </div>
        )
    }
}
