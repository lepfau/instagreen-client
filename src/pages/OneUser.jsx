import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import Comments from "../components/Comments";
import FormComment from "../components/Forms/FormComment";
import { withUser } from "../components/Auth/withUser";

class OneUser extends Component {
  state = {
    user: [],
    plant: [],
    wall: [],
    comments: [],
  };

  componentDidMount() {
    apiHandler.getUsers().then((apiResp) => {
      console.log(apiResp);
      const userInfo = apiResp.filter(
        (user) => user._id === this.props.match.params.id
      );
      this.setState({
        user: userInfo,
      });
    });

    apiHandler.getPlants().then((apiResp) => {
      const userPlants = apiResp.filter(
        (userplant) => userplant.id_user === this.props.match.params.id
      );
      
      this.setState({
        plant: userPlants,
      });
    });

    apiHandler.getWall().then((apiResp) => {
      console.log(apiResp);
      const userPosts = apiResp.filter(
        (userPost) => userPost.id_user._id === this.props.match.params.id
      );
      this.setState({
        wall: userPosts,
      });
    });

    apiHandler.getComment().then((apiResp) => {
      console.log(apiResp);
      const commentsPost = apiResp.filter(
        (comm) => comm.id_wall["_id"] === this.state.wall.postId_id
      );
      this.setState({
        comments: commentsPost,
      });
    });
  }

  addCommentUpdate = (comment) => {
    apiHandler.getComment().then((apiResp) => {
      console.log(apiResp);
      const commentsPost = apiResp.filter(
        (comm) => comm.id_wall._id === this.state.wall.postId_id
      );
      this.setState({
        comments: comment,
      });
    });
  };

  deleteComment = (commentId) => {
    apiHandler.deleteComment(commentId).then(() => {
      this.setState({
        comments: "this.state.posts.filter((it) => it._id == commentId)",
      });
    });
  };

  render() {
    return (
      <div className="oneuserbody">
  
        {this.state.user.map((user) => {
            
          return <h1>{user.firstName} profile page</h1>;
        })}

<h1>User plants</h1>
<div className="usersplants">
        {this.state.plant.map((plant) => {
        return (
          <div className="userplantsbody">
            <div className="userplantscontainer" key={plant._id}>
              <p className="userplantname">{plant.name}</p>
              <img className="userplantimage" src={plant.image} />
            </div>
          </div>
          );
        })}
</div>

<h1>User Posts</h1>
        {this.state.wall.map((post) => {

              return (
            <div className="wallbody" key={post._id}>
            <div className="wallpostcontainer">
              <div className="profiletoppost">
                <h3 className="posttitleprofile">{post.title}</h3>
                <div className="posttop">
           
                </div>
              </div>
              <img className="wallpic" src={post.image} />
              <h5 className="postsubtitle">{post.subtitle}</h5>
              <hr></hr>
              <FormComment
                userpic={this.props.context.user.profileImg}
                addCommentUpdate={this.addCommentUpdate}
                postId={post._id}
              />
              <Comments
                key={this.state.comments._id}
                postId={post._id}
                userCommenting={this.props.context.user.firstName}
                deleteComment={this.deleteComment}
                userEmail={this.props.context.user.email}
              />
            </div>
          </div>
        );
        })}
      </div>
    );
  }
}


export default withUser(OneUser);