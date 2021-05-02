import React, { useState, useEffect } from "react";
import CommentsFullScreen from "../Wall/CommentsFullScreen";
import FormCommentFS from "../Forms/FormCommentFS";
import { withUser } from "../Auth/withUser";
import { Link } from "react-router-dom";
import UserLikes from "./UserLikes";

function OnePost(onepost) {
  return (
    <div className="onepostfullscreen">
      <div className="oneposttitleimage">
        <h1 className="oneposttitle">{onepost.title}</h1>

        <img className="onepostimage" src={onepost.image} />
      </div>
      <div className="onepostright">
        <div style={{ width: "90%" }}>
          <div className="posttopuser">
            <div className="wallpostuser">
              <div className="ppusercontainer">
                <img className="ppwall" src={onepost.userPic} alt="userpic" />
              </div>
              <div className="posttopuserinfo">
                <p style={{ fontSize: "0.9em" }}>
                  <Link to={`/users/${onepost.userId}`}>
                    <b className="usernames">
                      {onepost.userFirst} {onepost.userLast}
                    </b>
                  </Link>
                </p>
                <pre className="postdate">
                  {onepost.date.slice(0, 10)} {onepost.date.slice(11, 16)}
                </pre>
              </div>
            </div>
          </div>
          <hr style={{ marginTop: "7px" }}></hr>
          <div className="likepart" style={{ marginTop: "10px" }}>
            {onepost.liked ? (
              <i
                style={{ color: "red" }}
                onClick={() => onepost.removeLike()}
                className="fas fa-heart heart"
              ></i>
            ) : (
              <i
                className="far fa-heart heart"
                onClick={() => onepost.addLike()}
              >
                {" "}
              </i>
            )}
            <UserLikes
              users={onepost.likes}
              usersshow={onepost.users}
              showUsers={onepost.showUsers}
            />
          </div>
          <FormCommentFS
            userpic={onepost.userpic}
            postId={onepost.postId}
            seeNewComment={onepost.seeNewComment}
          />
          {onepost.comments.map((comment) => {
            return (
              <div key={comment._id} className="commentpartcontainer">
                <CommentsFullScreen
                  userImg={comment.id_user.profileImg}
                  userFirst={comment.id_user.firstName}
                  userLast={comment.id_user.lastName}
                  userId={comment.id_user._id}
                  text={comment.text}
                  date={comment.created_at}
                  userEmail={comment.id_user.email}
                  userLogged={onepost.userLogged}
                  id={comment._id}
                  deleteComment={onepost.deleteComment}
                />
              </div>
            );
          })}
        </div>
        <a className="closefull" onClick={() => onepost.hidefull()}>
          X
        </a>
      </div>
    </div>
  );
}

export default withUser(OnePost);
