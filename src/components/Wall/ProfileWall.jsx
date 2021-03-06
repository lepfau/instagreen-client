import React, { Component } from "react";
import FormCreateWall from "../Forms/FormCreateWall";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import WallPost from "../Wall/WallPost";
import loadingGif from "../../assets/loadinggif.gif";
class ProfileWall extends Component {
  state = {
    wall: [],
    loading: true,
    loadingSubmit: false,
  };

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }

  componentDidMount() {
    apiHandler
      .getProfileWall()
      .then((apiResp) => {
        this.sortByKey(apiResp, "created_at");
        setTimeout(() => {
          this.setState({
            wall: apiResp,
            loading: false,
          });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addPost = (post) => {
    apiHandler
      .getProfileWall()
      .then((apiResp) => {
        this.sortByKey(apiResp, "created_at");
        this.setState({
          wall: apiResp,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deletePost = (postId) => {
    apiHandler.deleteWall(postId).then(() => {
      this.setState({
        wall: this.state.wall.filter((it) => it._id !== postId),
      });
    });
  };

  seeNewComment = () => {
    apiHandler
      .getProfileWall()
      .then((apiResp) => {
        this.sortByKey(apiResp, "created_at");
        this.setState({
          wall: apiResp,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteComment = (commentId) => {
    apiHandler.deleteComment(commentId).then((apiResp) => {
      apiHandler
        .getProfileWall()
        .then((apiResp) => {
          this.sortByKey(apiResp, "created_at");
          this.setState({
            wall: apiResp,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  render() {
    return (
      <div className="wallFullPage">
        <div className="wallpage">
          <div className="fullbodywall">
            <FormCreateWall addPost={this.addPost} />
            <div className="wallPost">
              {this.state.loading ? (
                <img
                  className="loadinggifwall"
                  src={loadingGif}
                  alt="loading gif"
                />
              ) : (
                this.props.context.isLoggedIn &&
                this.state.wall.map((post) => {
                  return (
                    <div className="wallbody" key={post._id}>
                      <WallPost
                        userLogged={this.props.context.user.email}
                        loggedId={this.props.context.user.id}
                        id={post._id}
                        title={post.title}
                        image={post.image}
                        subtitle={post.subtitle}
                        userFirst={post.id_user.firstName}
                        userLast={post.id_user.lastName}
                        userPic={post.id_user.profileImg}
                        userId={post.id_user._id}
                        date={post.created_at}
                        userEmail={post.id_user.email}
                        deletePost={this.deletePost}
                        comments={post.id_comments}
                        likes={post.likes}
                        seeNewComment={this.seeNewComment}
                        deleteComment={this.deleteComment}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withUser(ProfileWall);
