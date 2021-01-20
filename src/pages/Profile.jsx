import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import Comments from "../components/Comments";
import FormComment from "../components/Forms/FormComment";

class Profile extends Component {
  state = {
    plants: [],
    posts: [],
    comments: [],
  };

  componentDidMount() {
    apiHandler
      .getPlants()
      .then((apiResp) => {
        console.log(apiResp);
        const userPlants = apiResp.filter(
          (plant) => plant.id_user === this.props.context.user._id
        );
        this.setState({
          plants: userPlants,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    apiHandler
      .getWall()
      .then((apiRes) => {
        console.log(apiRes);
        const userPost = apiRes.filter(
          (post) => post.id_user._id === this.props.context.user._id
        );
        console.log();
        this.setState({
          posts: userPost,
        });
      })
      .catch((error) => {
        console.log(error);
      });

      apiHandler.getComment().then((apiResp) => {
        console.log(apiResp);
        const commentsPost = apiResp.filter(
          (comm) => comm.id_wall["_id"] === this.state.posts.postId_id
        );
        this.setState({
          comments: commentsPost,
        });
      });

  }


  deleteItem = (itemId) => {
    apiHandler.deleteWall(itemId).then(() => {
      this.setState({
        posts: this.state.posts.filter((it) => it._id !== itemId),
      });
    });
  };

  addCommentUpdate = (comment) => {
    apiHandler.getComment().then((apiResp) => {
      console.log(apiResp);
      const commentsPost = apiResp.filter(
        (comm) => comm.id_wall["_id"] === this.state.posts.postId_id
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
      <div>
        <h1>My plants</h1>
        <div className="profilemyplants">
          {this.state.plants.map((plant) => {
            return (
              <div className="profilemyplants" key={plant._id}>
                <div className="profileplantcard">
                  <p className="">{plant.name}</p>
                  <img className="profileplant" src={plant.image} />
                  
                </div>
              </div>
            );
          })}
        </div>
        <h1> My Posts</h1>
        {this.state.posts.map((post) => {
          return (
            <div className="wallbody" key={post._id}>
            <div className="wallpostcontainer">
              <div className="profiletoppost">
          
             
              <h3 className="posttitleprofile">{post.title}</h3>
              <div className="posttop">
              <i
className="fas fa-trash"
onClick={() => {
  this.deleteItem(post._id);
}}
></i>
              </div>
            
</div>
              <img className="wallpic" src={post.image} />
              <h5 className="postsubtitle">{post.subtitle}</h5>
              <hr></hr>
              <FormComment userpic={this.props.context.user.profileImg}
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

export default withUser(Profile);


