import React from "react";
import { Statistic } from "semantic-ui-react";

import "./statistics.scss";
import { NavLink } from "react-router-dom";

const Statistics = (props) => {
    const {
        totalRecords,
        totalFollower,
        totalFollowed,
        setSelectedUserToFetchSubscriptions,
        userId,
        userSlug,
    } = props;
    return (
        <Statistic.Group widths="three" size="mini" className="statistics-group">
            <Statistic>
                <Statistic.Value>{totalRecords}</Statistic.Value>
                <Statistic.Label>iRecords</Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value>{totalFollower}</Statistic.Value>
                <Statistic.Label>
                    <NavLink
                        onClick={() =>
                            setSelectedUserToFetchSubscriptions({ userId, userSlug })
                        }
                        to="/ifollowers"
                    >
                        iFollowers
                    </NavLink>
                </Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value>{totalFollowed}</Statistic.Value>
                <Statistic.Label>
                    <NavLink
                        onClick={() =>
                            setSelectedUserToFetchSubscriptions({ userId, userSlug })
                        }
                        to="/ifollowing"
                    >
                        iFollowing
                    </NavLink>
                </Statistic.Label>
            </Statistic>
        </Statistic.Group>
    );
};

export default Statistics;
