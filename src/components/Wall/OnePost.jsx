import React from "react";
import CommentsFullScreen from "../Wall/CommentsFullScreen";
import FormCommentFS from "../Forms/FormCommentFS";

function OnePost(onepost) {
  return (
    <div className="onepostfullscreen">
      <div className="oneposttitleimage">
        <h1 className="oneposttitle">{onepost.title}</h1>

        <img className="onepostimage" src={onepost.image} />
      </div>
      <div className="onepostright">
        <div style={{ width: "90%" }}>
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

export default OnePost;
