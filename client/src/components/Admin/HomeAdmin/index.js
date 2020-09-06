import React, { useEffect } from "react";

/* Components */
import { Segment, Statistic, Icon, Header } from "semantic-ui-react";
import HeaderAdmin from "../../../containers/Admin/HeaderAdmin";

/* Style */
import "./homeadmin.scss";
import MemberCard from "../../MembersCard";

const HomeAdmin = ({ fetchStats, stats }) => {

    const { userCount, recordCount, languageCount, translationCount, recentUsers,  /* recentRecords */ } = stats;

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <HeaderAdmin>
            <div className="home-admin">
                <Segment>
                    <Statistic.Group widths="four">
                        <Statistic>
                            <Statistic.Value>{userCount}</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="user" />
                                Utilisateurs
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{recordCount}</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="microphone" />
                                iRecords
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{languageCount}</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="flag" />
                                Langues
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{translationCount}</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="book" />
                                Traductions
                            </Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Segment>

                <div className="home-admin_container">
                    <Segment className="home-admin_container stats-left">
                    <Header size="medium" content="Derniers utilisateurs inscrits"/>
                        {/* { recentUsers && recentUsers.map(user => (
                            <MemberCard user={user}/>
                        ))} */}
                    </Segment>

                    <Segment className="home-admin_container stats-right">
                        
                    </Segment>
                </div>
            </div>
        </HeaderAdmin>
    );
};

export default HomeAdmin;
