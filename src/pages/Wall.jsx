import React, { Component } from "react";
import FormCreateWall from "../components/Forms/FormCreateWall";
import FormComment from "../components/Forms/FormComment";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";

class Wall extends Component {
  state = {
    wall: [],
    comments: [],
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

  addItem = (plant) => {
    this.setState({
      wall: [plant, ...this.state.wall],
    });
  };

  showComments = () => {
    apiHandler.getWall().then((apiResp) => {
      this.sortByKey(apiResp, "created_at");
      this.setState({
        wall: apiResp,
      });
    });
  };

  displayUserPost = (post) => {


if (this.props.context.user.email === post.id_user.email) {
  return (
    <h3 className="wallpostuser">
    <img className="ppwall" src={post.id_user["profileImg"]} />
    Me
  </h3>)
} else {
    return (
      <h3 className="wallpostuser">
                  <img className="ppwall" src={post.id_user["profileImg"]} />
                  {post.id_user["firstName"]} {post.id_user["lastName"]}
                </h3>
    )
  } }

displayUserPostButtons = (post) => {
  if (this.props.context.user.email === post.id_user.email) {
    return (<div>
      <button
                  onClick={() => {
                    this.deleteItem(post._id);
                  }}
                >
                  Delete
                </button>
      <button>Edit</button>
    </div>)
  }
}

deleteItem = (itemId) => {
  apiHandler.deleteWall(itemId).then(() => {
    this.setState({
      wall: this.state.wall.filter((it) => it._id !== itemId),
    });
  });
};

  render() {
    return (
      <div>
        <FormCreateWall addItem={this.addItem} />

        <h1> Plants Wall</h1>
        <div className="wallPost">
          {this.state.wall.map((post) => {
            return (
              <div key={post._id} className="wallpostcontainer">
                {this.displayUserPost(post)}
         
                <h3>{post.title}</h3>
{this.displayUserPostButtons(post)}
                <img className="wallpic" src={post.image} />

                <h5>Comments</h5>

                {post.comments["comment"].map((comment) => {
                  return <p> {comment}</p>;
                })}
                <FormComment usercommenting={post.id_user} postId={post._id} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withUser(Wall);
