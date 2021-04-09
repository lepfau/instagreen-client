import React from "react";
import { Link } from "react-router-dom";
import FormComment from "../Forms/FormComment";
import Comments from "./Comments";
import { withUser } from "../Auth/withUser";

function WallPost(post) {
  return (
    <div className="wallbody">
      <div className="wallpostcontainer">
        <div className="posttop">
          <div className="posttopuser">
            <div className="wallpostuser">
              <div className="ppusercontainer">
                <img className="ppwall" src={post.userPic} alt="userpic" />
              </div>

              <div className="posttopuserinfo">
                <p>
                  <Link to={`/users/${post.userId}`}>
                    <b>
                      {post.userFirst} {post.userLast}
                    </b>
                  </Link>
                </p>
                <div className="postdate">{post.date.slice(0, 10)} </div>
              </div>
            </div>
          </div>

          {post.userLogged === post.userEmail ? (
            <div className="posttopbtns">
              <i
                className="fa fa-trash"
                onClick={() => post.deletePost(post.id)}
              ></i>
              <Link to={`/wall/edit/${post.id}`}>
                <i className="fas fa-edit"></i>
              </Link>
            </div>
          ) : null}
        </div>

        <hr></hr>
        <h3 className="posttitle">{post.title}</h3>
        <img className="wallpic" src={post.image} alt="postimg" />
        <h5 className="postsubtitle">{post.subtitle}</h5>
        <hr></hr>
        <FormComment
          userpic={post.context.user.profileImg}
          postId={post.id}
          seeNewComment={post.seeNewComment}
        />
        {post.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <Comments
                userImg={comment.id_user.profileImg}
                userFirst={comment.id_user.firstName}
                userLast={comment.id_user.lastName}
                text={comment.text}
                date={comment.created_at}
                userEmail={comment.id_user.email}
                userLogged={post.userLogged}
                id={comment._id}
                deleteComment={post.deleteComment}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withUser(WallPost);
