import React, { useEffect } from "react";

/* Components */
import { Header, Icon, Button } from "semantic-ui-react";

/* Containers */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";

/* Style */
import "./feed.scss";
import { Link } from "react-router-dom";

const Feed = ({ fetchFeedUser, feedUser }) => {
    useEffect(() => {
        fetchFeedUser();
    }, [fetchFeedUser]);

    return (
        <Layout titlePage='Feed'>
            <div className="feed">
                <Header size="small" content="Feed" className="feed-title" />
                <div className="feed-list">
                    {feedUser ?
                        feedUser.map((record) => (
                            <Irecords
                                key={record.id}
                                record={record}
                                user={record.user}
                                isUserRecord={record.user.id}
                            />
                        ))
                    :
                        <div className="feed-nofeed"> 
                        
                            <Icon name='ban' size="big"/>
                            <span className="feed-nofeed_text">Your news feed is empty, you need to follow some people</span>
                       
                        <Link to="/users">
                            <Button content="Check users list" size="small" className="feed-nofeed_button"/>
                        </Link>
                        
                        </div> 
                    }
                </div>
            </div>
        </Layout>
    );
};

export default Feed;
