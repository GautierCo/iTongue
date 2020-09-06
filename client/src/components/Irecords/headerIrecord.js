import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

const HeaderIrecords = ({ user, ...props }) => (
    <Card.Content className="header-irecords">
        <div>
            <Link to={`/user/${user.slug}`}>
                <Image
                    className="header-irecords__avatar"
                    avatar
                    floated="left"
                    size="large"
                    src={
                        user.avatarUrl == null
                            ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                            : `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
                    }
                />
                <span className="header-irecords__fullname">{`${user.firstname} ${user.lastname}`}</span>
            </Link>
        </div>
        <div>{props.children}</div>
    </Card.Content>
);

export default HeaderIrecords;
