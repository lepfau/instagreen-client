

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
        const commentsPost = apiResp.filter((comm) => comm.id_wall == this.props.postId)
        this.setState({
            comments: commentsPost
        })
    })
}

displayUserPostButtons = (comm) => {
    
    if (this.props.userEmail === comm.id_user.email) {
      return (
      
      <div>
   <i class="fas fa-trash" onClick={() => {this.props.deleteComment(comm._id)}}></i>
       
      </div>)
    }
  }

    render() {
        return (
            <div class="completecomment">
            
                {this.state.comments.map((comment) => {
                    return (
                      <div className="commentpart" key={comment._id}>
                        <div  className="usercommenting">
                            <div className="ppusercontainercomment">
                            <img className="ppwall" src={comment.id_user["profileImg"]}/>
                            </div>
                         </div> 
                         <div className="commentinside">  
                         <div className="commetuser">
                        <p className="commentuserinfo"><b>{comment.id_user["firstName"]} {comment.id_user["lastName"]}</b> </p>
                        <p className="commenttext">{comment.text}</p>
                        <p className="commentuserinfo">{comment.created_at.slice(0,10)} </p>
                        </div>
                        <div className="commentbtndelete">
                        {this.displayUserPostButtons(comment)}
                        </div>
                        </div>
                       
                        
                        
                   
                    </div>
                    
                    )
                })}
            </div>
        )
    }
}
