import React, { Component } from "react";
import FormCreateWall from "../components/Forms/FormCreateWall";
import FormComment from "../components/Forms/FormComment";
import Comments from "../components/Comments"
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";

class Wall extends Component {
  state = {
    wall: [],
    comments: [],
    showForm: false
  };

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }

  showForm = () => {
    if (this.state.showForm === false) {
      this.setState({ showForm: true})
    } else {
      this.setState({ showForm: false})
    }
      }

      renderForm () {
        return (
          <FormCreateWall addItem={this.addItem} />
        )
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
        showForm: false
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
  apiHandler.getComment()
  .then((apiResp) => {
      console.log(apiResp)
      const commentsPost = apiResp.filter((comm) => comm.id_wall["_id"] === this.state.wall.postId_id )
      this.setState({
          comments: comment
      })
  })

 }



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
                <button>
                  <Link to={`/wall/edit/${post._id}`}>Edit</Link>
                </button>
    </div>)
  }
}



deleteItem = (itemId) => {
  apiHandler.deleteWall(itemId).then(() => {
    this.setState({
      wall: this.state.wall.filter((it) => it._id !== itemId),
    });
  })
  
};


  render() {

    const { showForm } = this.state;
    return (
      <div>
        {/* <FormCreateWall addItem={this.addItem} /> */}
        <button onClick={() => this.showForm()}>Add a new post !</button>
        {showForm && this.renderForm()}
        <h1 className="myplantstitle"> Plants Wall</h1>
        <div className="wallPost">
          {this.state.wall.map((post) => {
            return (
              <div key={post._id} className="wallpostcontainer">
                {this.displayUserPost(post)}
         
                <h3>{post.title}</h3>
{this.displayUserPostButtons(post)}
                <img className="wallpic" src={post.image} />

             <FormComment addCommentUpdate={this.addCommentUpdate} postId={post._id}/>
             <Comments key={this.state.comments._id} postId={post._id} userCommenting={this.props.context.user.firstName} deleteComment={this.deleteComment} userEmail={this.props.context.user.email} />
           
              <h4>{post.created_at.slice(0,10)}</h4>
              </div>

            );
          })}
        </div>
      </div>
    );
  }
}
export default withUser(Wall);
