import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

/* Components */
import { Form, Input, Image, Header, Icon, Label } from "semantic-ui-react";
import GifComponennt from "../Gif";
import { Gif } from "@giphy/react-components";

/* Containers */
import Layout from "../../../containers/Layout";

/* Styles */
import "./message.scss";

import giphyLogo from "../../../assets/img/giphy-icon.png";

const Message = props => {
  const {
    socketEmitMessage,
    socketEmitTyping,
    currentUser,
    socketSetRecipient,
    socketRecipient,
    fetchAllMessages,
    allMessages,
    setMessageInAllMessages,
    userTyping,
    emptyAllMessages
  } = props;

  const params = useParams();
  const messageListRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [gifVisible, setGifVisible] = useState(false);

  useEffect(() => {
    const scrollY = messageListRef.current.scrollHeight;
    console.log("scrollY", scrollY);
    messageListRef.current.scrollTo(0, scrollY);
  }, [allMessages]);

  useEffect(() => {
    socketSetRecipient({ id: params.id });

    return () => {
      socketSetRecipient({});
    };
  }, [socketSetRecipient]);

  useEffect(() => {
    fetchAllMessages();

    return () => {
      emptyAllMessages();
    };
  }, [fetchAllMessages]);

  let typing = null;
  const handleChange = e => {
    setInputValue(e.target.value);
    if (typing) {
      clearTimeout(typing);
    }
    typing = setTimeout(() => {
      socketEmitTyping({
        authorFirstname: currentUser.firstname,
        authorLastName: currentUser.lastname,
        recipientId: socketRecipient.id
      });
      typing = null;
    }, 200);
  };

  const contact = allMessages.contact;

  const handleNewMessage = text => {
    setMessageInAllMessages({
      id: Date.now(),
      createdAt: new Date(),
      text,
      sender: {
        id: currentUser.id,
        avatarUrl: currentUser.avatarUrl
      }
    });

    socketEmitMessage({
      text,
      authorFirstname: currentUser.firstname,
      authorLastname: currentUser.lastname,
      authorAvatarUrl: currentUser.avatarUrl,
      recipientId: socketRecipient.id,
      recipientAvatarUrl: contact.avatarUrl
    });
  };

  const handleSubmit = () => {
    handleNewMessage(inputValue);
    setInputValue("");
  };

  const handleGifSelect = gif => {
    handleNewMessage(JSON.stringify(gif));
  };

  /* Récupère l'objet de message pour vérifier si c'est un gif ou du text   */
  const getContent = text => {
    try {
      const content = JSON.parse(text);
      if (content.type !== "gif") throw new Error("Not a gif");
      return (
        <Gif
          gif={content}
          width={content.images.fixed_height.width}
          height={content.images.fixed_height.height}
        />
      );
    } catch (err) {
      return text;
    }
  };

  return (
    <Layout titlePage={`Chat - ${contact && contact.firstname}`}>
      <div className="messages-container">
        <Header size="tiny" className="message_back">
          <Link to="/messages" className="message_link__back">
            <Icon name="chevron circle left" size="small" />
            Retour aux messages
          </Link>
          {contact && (
            <Link to={`/user/${contact.slug}`} className="message_link__user">
              <div>{contact.firstname}</div>

              <Image
                className="message_avatar__user"
                src={
                  !contact.avatarUrl
                    ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                    : process.env.REACT_APP_FILES_URL + "/" + contact.avatarUrl
                }
              />
            </Link>
          )}
        </Header>
        <div className="message-list" ref={messageListRef}>
          {allMessages.messages &&
            allMessages.messages.map(message => (
              <div
                className={`message_container${
                  message.sender.id === currentUser.id ? "--right" : ""
                }`}
                key={message.id}
              >
                <div
                  className={`message__user${
                    message.sender.id === currentUser.id ? "--right" : ""
                  }`}
                >
                  <Image
                    className="message-avatar"
                    src={
                      !message.sender.avatarUrl
                        ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                        : process.env.REACT_APP_FILES_URL + "/" + message.sender.avatarUrl
                    }
                  />
                </div>
                <div
                  className={`message_wrapper${
                    message.sender.id === currentUser.id ? "--right" : ""
                  }`}
                >
                  <div
                    className="message-text"
                    className={`message-text${
                      message.sender.id === currentUser.id ? "--right" : ""
                    }`}
                  >
                    {getContent(message.text)}
                  </div>
                  <div
                    className="message-date"
                    className={`message-date${
                      message.sender.id === currentUser.id ? "--right" : ""
                    }`}
                  >
                    {moment(message.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="message-typing">
          {userTyping.typing ? (
            <>
              <strong>{userTyping.authorFirstname + " écrit"}</strong>
              <div className="typing-loader_wrapper">
                <div className="typing-loader"></div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="message-form_container">
          <div className="message-form_btns">
            <Label
              size="small"
              className="message-forms_btn__label"
              onClick={() => setGifVisible(!gifVisible)}
            >
              <img src={giphyLogo} />
            </Label>
            <Form onSubmit={handleSubmit} className="message-forms_btn__submit">
              <Input
                icon={<Icon name="send" link onClick={handleSubmit} />}
                fluid
                className="send-message"
                placeholder="Type your message here"
                onChange={handleChange}
                value={inputValue}
              />
            </Form>
          </div>
          <div className="gifselect_container">
            <GifComponennt handleGifSelect={handleGifSelect} gifVisible={gifVisible} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Message;
