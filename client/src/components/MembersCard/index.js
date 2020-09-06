import React from "react";
import { Image, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./memberCard.scss";

const MemberCard = ({ user }) => (
  <Link to={`user/${user.slug}`}>
    <div className="member-card">
      <div className="member-card_left">
        <Image
          floated="left"
          size="mini"
          className="avatar"
          avatar
          src={
            user.avatarUrl == null
              ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
              : `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
          }
        />
        <div>
          <Header className="fullname">
            {user.firstname} {user.lastname}
          </Header>
          <p className="records">
            {(user.records && user.records.length) || user.iRecords || 0} iRecords
          </p>
        </div>
      </div>

      <div className="member-card_right">
        {user.taughtLanguages ? (
          user.taughtLanguages.map((language, index) => {
            return (
              index < 3 && (
                <Image
                  key={language.id}
                  src={`https://www.countryflags.io/${language.code}/flat/32.png`}
                  className="membercard_flag_image"
                />
              )
            );
          })
        ) : (
          <Image
            src={`https://www.countryflags.io/${user.languageMostTaught.code}/flat/32.png`}
            className="membercard_flag_image"
          />
        )}
      </div>
    </div>
  </Link>
);

export default MemberCard;
