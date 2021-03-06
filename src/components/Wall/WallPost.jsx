import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormComment from "../Forms/FormComment";
import Comments from "./Comments";
import { withUser } from "../Auth/withUser";
import OnePost from "../Wall/OnePost";
import DeletePage from "./DeletePage";
import apiHandler from "../../api/apiHandler";
import UserLikes from "./UserLikes";

function WallPost(post) {
  const [fullscreen, setfullscreen] = useState(false);
  const [deletepage, setdeletepage] = useState(false);
  const [liked, setLiked] = useState(false);
  const [users, setUsers] = useState(false);

  function showUsers() {
    setUsers(!users);
  }

  useEffect(() => {
    post.likes.forEach((like) => {
      if (like._id === post.context.user._id) {
        setLiked(true);
      }
    });
  }, []);

  function showfull() {
    setfullscreen(!fullscreen);
  }

  function hidefull() {
    setfullscreen(false);
  }

  function hideDelete() {
    setdeletepage(!deletepage);
  }

  function addLike() {
    apiHandler.addLike(post.id).then((doc) => {
      post.seeNewComment();
      setLiked(true);
      console.log(doc);
    });
  }

  function removeLike() {
    apiHandler.removeLike(post.id).then((doc) => {
      post.seeNewComment();
      setLiked(false);
      console.log(doc);
    });
  }

  return (
    <div className="wallbody">
      {deletepage ? (
        <DeletePage
          hideDelete={hideDelete}
          deletePost={post.deletePost}
          id={post.id}
        />
      ) : null}
      {post.type === "plantadd" ? (
        <div className="wallpostcontainer">
          <div className="posttop">
            <div className="posttopuser">
              <div className="wallpostuser">
                <div className="ppusercontainer">
                  <img className="ppwall" src={post.userPic} alt="userpic" />
                </div>

                <div className="posttopuserinfo">
                  <p style={{ fontSize: "0.9em" }}>
                    <Link to={`/users/${post.userId}`}>
                      <b className="usernames">
                        {post.userFirst} {post.userLast}
                      </b>
                    </Link>
                  </p>
                  <pre className="postdate">
                    {post.date.slice(0, 10)} {post.date.slice(11, 16)}
                  </pre>
                </div>
              </div>
            </div>

            {post.userLogged === post.userEmail ? (
              <div className="posttopbtns">
                <i
                  className="fa fa-trash"
                  onClick={() => setdeletepage(!deletepage)}
                  // onClick={() => post.deletePost(post.id)}
                ></i>
                <Link to={`/wall/edit/${post.id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
              </div>
            ) : null}
          </div>

          <hr></hr>

          <h3 className="posttitle">{post.title}</h3>
          <div className="wall-new-plant">
            <img
              style={{ width: "auto", height: "100%" }}
              src={post.image}
              alt="postimg"
            />
          </div>
          <div className="likepart">
            {liked ? (
              <i
                style={{ color: "firebrick" }}
                onClick={() => removeLike()}
                className="fas fa-heart heart"
              ></i>
            ) : (
              <i className="far fa-heart heart" onClick={() => addLike()}>
                {" "}
              </i>
            )}
            <div>
              <UserLikes users={post.likes} />
            </div>
          </div>
        </div>
      ) : (
        <div className="wallpostcontainer">
          <div className="posttop">
            <div className="posttopuser">
              <div className="wallpostuser">
                <div className="ppusercontainer">
                  <img className="ppwall" src={post.userPic} alt="userpic" />
                </div>
                <div className="posttopuserinfo">
                  <p style={{ fontSize: "0.9em" }}>
                    <Link to={`/users/${post.userId}`}>
                      <b className="usernames">
                        {post.userFirst} {post.userLast}
                      </b>
                    </Link>
                  </p>
                  <pre className="postdate">
                    {post.date.slice(0, 10)} {post.date.slice(11, 16)}
                  </pre>
                </div>
              </div>
            </div>

            {post.userLogged === post.userEmail ? (
              <div className="posttopbtns">
                <i
                  className="fa fa-trash"
                  onClick={() => setdeletepage(!deletepage)}
                  // onClick={() => post.deletePost(post.id)}
                ></i>
                <Link to={`/wall/edit/${post.id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
              </div>
            ) : null}
          </div>
          <hr></hr>
          <h3
            style={{ cursor: "pointer" }}
            onClick={showfull}
            className="posttitle"
          >
            {post.title}{" "}
          </h3>
          <h6 style={{ fontSize: "0.9em" }} className="postsubtitle">
            {post.subtitle}
          </h6>
          {fullscreen && (
            <OnePost
              userPic={post.userPic}
              date={post.date}
              userId={post.userId}
              userLast={post.userLast}
              userFirst={post.userFirst}
              image={post.image}
              title={post.title}
              hidefull={hidefull}
              comments={post.comments}
              deleteComment={post.deleteComment}
              userLogged={post.userLogged}
              userpic={post.context.user.profileImg}
              postId={post.id}
              seeNewComment={post.seeNewComment}
              likes={post.likes}
              userLogged={post.userLogged}
              addLike={addLike}
              removeLike={removeLike}
              liked={liked}
              users={users}
              showUsers={showUsers}
            />
          )}
          <img
            onClick={showfull}
            className="wallpic"
            src={post.image}
            alt="postimg"
          />

          <div className="likepart" style={{ marginTop: "10px" }}>
            {liked ? (
              <i
                style={{ color: "firebrick" }}
                onClick={() => removeLike()}
                className="fas fa-heart heart"
              ></i>
            ) : (
              <i className="far fa-heart heart" onClick={() => addLike()}>
                {" "}
              </i>
            )}

            <UserLikes
              users={post.likes}
              usersshow={users}
              showUsers={showUsers}
            />
          </div>
          <hr></hr>

          <div>
            <FormComment
              userpic={post.context.user.profileImg}
              postId={post.id}
              seeNewComment={post.seeNewComment}
            />
          </div>
          {post.comments.map((comment) => {
            return (
              <div
                key={comment._id}
                className="commentpartcontainer"
                style={{ width: "100%" }}
              >
                <Comments
                  userImg={comment.id_user.profileImg}
                  userFirst={comment.id_user.firstName}
                  userLast={comment.id_user.lastName}
                  userId={comment.id_user._id}
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
      )}
    </div>
  );
}

export default withUser(WallPost);
