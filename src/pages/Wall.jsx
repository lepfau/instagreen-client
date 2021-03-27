import React, { Component } from "react";
import FormCreateWall from "../components/Forms/FormCreateWall";
import FormComment from "../components/Forms/FormComment";
import Comments from "../components/Comments";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";
import Users from "../pages/Users";

class Wall extends Component {
  state = {
    wall: [],
    comments: [],
    showForm: true,
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
      .getWall()
      .then((apiResp) => {
        console.log(apiResp);
        this.sortByKey(apiResp, "created_at");

        this.setState({
          wall: apiResp,
          currentUser: this.props.context.user.firstName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteComment = (commentId) => {
    apiHandler.deleteComment(commentId).then(() => {
      this.setState({
        comments: this.state.wall.filter((it) => it._id == commentId),
      });
    });
  };

  addItem = (plant) => {
    apiHandler
      .getWall()
      .then((apiResp) => {
        console.log(apiResp);
        this.sortByKey(apiResp, "created_at");

        this.setState({
          wall: apiResp,
          currentUser: this.props.context.user.firstName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      wall: [plant, ...this.state.wall],
    });
  };

  addCommentUpdate = (comment) => {
    apiHandler.getComment().then((apiResp) => {
      console.log(apiResp);
      const commentsPost = apiResp.filter(
        (comm) => comm.id_wall["_id"] === this.state.wall.postId_id
      );
      this.setState({
        comments: comment,
      });
    });
  };

  displayUserPost = (post) => {
    if (this.props.context.user.email === post.id_user.email) {
      return (
        <div className="posttopuser">
          <div className="wallpostuser">
            <div className="ppusercontainer">
              <img className="ppwall" src={post.id_user["profileImg"]} />
            </div>

            <div className="posttopuserinfo">
              <p>
                <Link to={"/profile"}>
                  {" "}
                  <b>Me</b>{" "}
                </Link>{" "}
              </p>

              <div className="postdate">{post.created_at.slice(0, 10)} </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="posttopuser">
          <div className="wallpostuser">
            <div className="ppusercontainer">
              <img className="ppwall" src={post.id_user["profileImg"]} />
            </div>

            <div className="posttopuserinfo">
              <p>
                <Link to={`/users/${post.id_user._id}`}>
                  <b>
                    {post.id_user["firstName"]} {post.id_user["lastName"]}
                  </b>
                </Link>
              </p>

              <div className="postdate">{post.created_at.slice(0, 10)} </div>
            </div>
          </div>
        </div>
      );
    }
  };

  displayUserPostButtons = (post) => {
    if (this.props.context.user.email === post.id_user.email) {
      return (
        <div className="posttopbtns">
          <Link to={`/wall/edit/${post._id}`}>
            <i className="fas fa-edit"></i>
          </Link>
          <i
            className="fas fa-trash"
            onClick={() => {
              this.deleteItem(post._id);
            }}
          ></i>
        </div>
      );
    }
  };

  deleteItem = (itemId) => {
    apiHandler.deleteWall(itemId).then(() => {
      this.setState({
        wall: this.state.wall.filter((it) => it._id !== itemId),
      });
    });
  };

  render() {
    return (
      <div className="wallFullPage">
        <div className="wallpage">
          <div className="fullbodywall">
            {/* <FormCreateWall addItem={this.addItem} /> */}

            <h1 className="walltitle"> Main Wall</h1>

            <FormCreateWall addItem={this.addItem} />
            <div className="wallPost">
              {this.state.wall.map((post) => {
                return (
                  <div className="wallbody" key={post._id}>
                    <div className="wallpostcontainer">
                      <div className="posttop">
                        {this.displayUserPost(post)}
                        {this.displayUserPostButtons(post)}
                      </div>
                      <hr></hr>
                      <h3 className="posttitle">{post.title}</h3>

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
          </div>
          <div className="userswallpageee">
            <Users />
          </div>
        </div>
      </div>
    );
  }
}
export default withUser(Wall);
