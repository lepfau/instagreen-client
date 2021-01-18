

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


    render() {
        return (
            <div>
                <h1>comments</h1>
                {this.state.comments.map((comment) => {
                    return (
                        <div key={comment._id}>
                            <img className="ppcomment" src={comment.id_user["profileImg"]}/>
                        <p>{comment.id_user["firstName"]} </p>
                        <p>{comment.id_user["lastName"]}</p>
                        <p>{comment.text}</p>
                    </div>
                    )
                })}
            </div>
        )
    }
}
