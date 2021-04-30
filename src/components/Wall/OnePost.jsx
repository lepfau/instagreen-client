import React, { useState, useEffect } from "react";
import CommentsFullScreen from "../Wall/CommentsFullScreen";
import FormCommentFS from "../Forms/FormCommentFS";
import { withUser } from "../Auth/withUser";

function OnePost(onepost) {
  return (
    <div className="onepostfullscreen">
      <div className="oneposttitleimage">
        <h1 className="oneposttitle">{onepost.title}</h1>

        <img className="onepostimage" src={onepost.image} />
      </div>
      <div className="onepostright">
        <div style={{ width: "90%" }}>
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
            {(() => {
              if (
                onepost.likes.length === 1 &&
                onepost.likes[0].email === onepost.context.user.email
              ) {
                return <p>You like this</p>;
              } else if (onepost.likes.length === 1) {
                return (
                  <p>
                    {onepost.likes[0].firstName} {onepost.likes[0].lastName}{" "}
                    likes this
                  </p>
                );
              } else if (
                onepost.likes.length === 2 &&
                onepost.likes[1].email === onepost.context.user.email
              ) {
                return (
                  <p>
                    {"You and"} {""}
                    {onepost.likes[0].firstName} {onepost.likes[0].lastName}{" "}
                    like this
                  </p>
                );
              } else if (onepost.likes.length === 2) {
                return (
                  <p>
                    {onepost.likes[0].firstName} {onepost.likes[0].lastName}{" "}
                    {""}
                    {"and"} {""}
                    {onepost.likes.length - 1} user like this
                  </p>
                );
              } else if (
                onepost.likes.length > 2 &&
                onepost.likes[onepost.likes.length - 1].email ===
                  onepost.context.user.email
              ) {
                return (
                  <p>
                    {"You and"} {""}
                    {onepost.likes.length - 1} users like this
                  </p>
                );
              } else if (onepost.likes.length > 2) {
                return (
                  <p>
                    {onepost.likes[0].firstName} {onepost.likes[0].lastName}{" "}
                    {""} {"and"} {onepost.likes.length - 1} users like this
                  </p>
                );
              } else {
                return <p>No one likes this</p>;
              }
            })()}{" "}
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
