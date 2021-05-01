import React, { useState } from "react";
import InputEmoji from "react-input-emoji";

export default function Emoji(props) {
  const [comment, setComment] = useState("");

  function handleText(value) {
    setComment(value);
    props.onSubmit(comment);
  }

  return (
    <InputEmoji
      value={comment}
      onChange={handleText}
      placeholder="Type a message"
    />
  );
}
