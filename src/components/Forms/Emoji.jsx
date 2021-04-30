import React, { Component } from "react";
import InputEmoji from "react-input-emoji";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

class Emoji extends Component {
  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  return (
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder="Type a message"
      name="text"
    />
  );
}

export default withRouter(Emoji);