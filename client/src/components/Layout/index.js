import React, { useState, useEffect } from "react";
import { Menu, Segment, Sidebar, Icon } from "semantic-ui-react";
import { NavLink, Link, useLocation } from "react-router-dom";

import Header from "./menu";
import NavigationBottom from "./navigationBottom";
import Recording from "./recording/recording";

import "./header.scss";

const LayoutHeader = ({
  user,
  isRecording,
  recording,
  toggleRecording,
  logout,
  loading,
  sendIrecordsRecorded,
  isLogged,
  selectIrecordToRecord,
  setTranslationId,
  allExpressions,
  fetchAllExpressions,
  learnedLanguages,
  traductionId,
  taughtLanguages,
  titlePage,
  unreadCount,
  ...props
}) => {
  useEffect(() => {
    document.title = `iTongue - ${titlePage}`;
  }, []);

  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    setVisible(!visible);
    logout();
  };
  const classMain = "main-content user";
  //const classUser = isLogged ? " user" : "";
  const classRecording = isRecording ? " modalRecording" : "";

  return (
    <Sidebar.Pushable>
      <Sidebar.Pusher className="main main-container" dimmed={visible}>
        <Header pathname={pathname} visible={visible} setVisible={setVisible} />
        <div className="main-content" className={classMain /*classRecording*/ /*+ classUser */}>
          {props.children}
          {isRecording ? (
            <Recording
              selectIrecordToRecord={selectIrecordToRecord}
              toggleRecording={toggleRecording}
              audio={recording}
              setTranslationId={setTranslationId}
              sendIrecordsRecorded={sendIrecordsRecorded}
              loading={loading}
              allExpressions={allExpressions}
              fetchAllExpressions={fetchAllExpressions}
              learnedLanguages={learnedLanguages}
              taughtLanguages={taughtLanguages}
              traductionId={traductionId}
            />
          ) : null}
        </div>

        {isLogged ? (
          <NavigationBottom
            toggleRecording={toggleRecording}
            selectIrecordToRecord={selectIrecordToRecord}
            user={user}
            isRecording={isRecording}
            unreadCount={unreadCount}
          />
        ) : null}

        <Sidebar
          as={Menu}
          id="main-sidebar"
          className="main-sidebar"
          animation="overlay"
          icon="labeled"
          onHide={() => setVisible(false)}
          vertical
          direction="right"
          visible={visible}
          width="thin"
        >
          <div className="main-header-links">
            <div className="container first-container">
              <div className="main-header-links__burger" onClick={() => setVisible(!visible)}>
                <Icon className="header-nav__icon" name="close" size="big" />
              </div>
              <NavLink exact className="main-header-links__item" to={"/"}>
                Home
              </NavLink>
              <NavLink className="main-header-links__item" to={"/irecords"}>
                iRecords
              </NavLink>
              <NavLink className="main-header-links__item" to={"/users"}>
                iUsers
              </NavLink>
            </div>
            {isLogged ? (
              <div onClick={handleLogout} className="container">
                <Link to="/" className="main-header-links__item">
                  Logout
                </Link>
              </div>
            ) : (
              <div className="container">
                <NavLink className="main-header-links__item" to={"/login"}>
                  Login
                </NavLink>
                <NavLink className="main-header-links__item" to={"/signup"}>
                  Signup
                </NavLink>
              </div>
            )}

            <div className="container">
              <NavLink className="main-header-links__item" to={"/team"}>
                Team
              </NavLink>
              <NavLink className="main-header-links__item" to={"/contact"}>
                Contact/FAQ
              </NavLink>
              <NavLink className="main-header-links__item" to={"/terms"}>
                Terms
              </NavLink>
            </div>
          </div>
        </Sidebar>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default LayoutHeader;
