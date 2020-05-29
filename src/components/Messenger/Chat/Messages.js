import React from "react";
import PropTypes from "prop-types";

import Avatar from "../../Layout/Avatar";
import Icon from "../../Layout/Icon";
import VideoPlayer from "../../Media/VideoPlayer";

const Messages = ({ messages = [], username }) => {
  const styledConversation = messages.map((message, i) => (
    <div
      key={i}
      className={`message-wrapper ${
        message.from === "you" ? "sent" : "received"
      }`}
    >
      {message.to === "you" && <Avatar username={username} size="medium" />}
      <div className="message">
        {message.message}
        {message.videoUrl && (
          <React.Fragment>
            <br />
            <VideoPlayer url={message.videoUrl} />
          </React.Fragment>
        )}
      </div>
      {message.from === "you" && (
        <div className="message-read">
          <Icon name="check-circle" />
        </div>
      )}
    </div>
  ));

  return (
    <div className="messages">
      <div className="list">
        {styledConversation.length ? (
          styledConversation
        ) : (
          <p>You have no messages</p>
        )}
      </div>
      <div className="new-message">
        <input
          type="text"
          placeholder="Type your message..."
          className="message-box"
        />
        <button>Send</button>
      </div>
    </div>
  );
};

Messages.propTypes = {
  conversation: PropTypes.array,
  username: PropTypes.string.isRequired,
};

export default Messages;
