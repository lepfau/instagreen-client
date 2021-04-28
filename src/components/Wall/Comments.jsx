import React from "react";
import { Link } from "react-router-dom";

function Comments(comment) {
  return (
    <div className="commentpart">
      <div className="usercommenting">
        <div className="ppusercontainercomment">
          <Link to={`/users/${comment.userId}`}>
            <img className="ppwall" src={comment.userImg} alt="userpic" />
          </Link>
        </div>
      </div>
      <div className="commentinside">
        <div className="commetuser">
          <p className="commentuserinfo">
            <Link to={`/users/${comment.userId}`}>
              <b className="usernames">
                {comment.userFirst} {comment.userLast}
              </b>
            </Link>
          </p>
          <p className="commenttext">{comment.text}</p>

          <pre>
            {comment.date.slice(0, 10)} {comment.date.slice(11, 16)}
          </pre>
        </div>
        <div className="commentbtndelete">
          {comment.userEmail === comment.userLogged ? (
            <div className="posttopbtns">
              <i
                className="fa fa-trash"
                onClick={() => comment.deleteComment(comment.id)}
              ></i>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Comments;
