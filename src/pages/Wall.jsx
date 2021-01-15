import React, { Component } from "react";
import FormCreateWall from "../components/Forms/FormCreateWall";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

class Wall extends Component {
  state = {
    wall: [],
    author: this.props.context.user.firstName
   
  };
  componentDidMount() {
    apiHandler
      .getWall()
      .then((apiResp) => {
       ;
        this.setState({
          wall: apiResp,
     
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addItem = (plant) => {
    this.setState({ wall: [...this.state.wall, plant] });
  };


 handleChange = (event) => {
    const value = event.target.value;
  this.setState({
    comments: value
  })
};

preventRefresh = (event) => {
  event.preventDefault()
}

handleSubmit = (wallId) => {
 
  
  const commentData = this.state.comments

  apiHandler
  .editWall(wallId, { $push: {comments: commentData}}).then((data) => {
    console.log(data)
  })

  apiHandler
      .getWall()
      .then((apiResp) => {
        console.log(apiResp);
        this.setState({
          wall: apiResp,
          comments: ""
          
        });
      })
      .catch((error) => {
        console.log(error);
      });
  
};


// apiHandler.editItem(itemId, { waterDate: today }


  render() {
    return (
      <div>
        <h1> Plants Wall</h1>

        <FormCreateWall addItem={this.addItem} />
        <div className="wallPost">
          {this.state.wall.map((post) => {
            return (
              <div key={post._id}>
                <h2>{post.title}</h2>
                <h3>
                  <img className="ppwall" src={post.id_user["profileImg"]} />
                  {post.id_user["firstName"]} {post.id_user["lastName"]}
                </h3>
                <img className="wallpic" src={post.image} />
                <h3>Comments</h3>

                <form onClick={() => this.handleSubmit(post._id)} onSubmit={this.preventRefresh}>
                    <label htmlFor="comment"></label>
                    <input onChange={this.handleChange} type="textarea" id="comment" placeholder="Write your comment here..."></input>
                <button  >Post comment</button>
              
              {post.comments.map((comment) => {
                return (
                  <p> {comment}</p>
                )
              })}


                </form>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withUser(Wall);
