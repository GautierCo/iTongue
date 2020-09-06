import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import './follow.scss';

const Follow = ({ userSlugInfos, user, follow, unFollow, checkIfUserFollow, isUserFollowThisUser }) => {

    const { slug } = useParams();

    const handdleClickFollow = () => {
        follow(userSlugInfos.id);
    };

    const handdleClickUnFollow = () => {
        unFollow(userSlugInfos.id);
    };

    useEffect(() => {
        checkIfUserFollow(slug);
    }, [checkIfUserFollow]);

    return (
        <div className="follow">
            { user.id && slug !== user.slug ? 
                isUserFollowThisUser ?
                    <Button size="mini" onClick={handdleClickUnFollow} className="follow-unfollow">
                        Unfollow
                    </Button>
                    :
                    <Button size="mini" onClick={handdleClickFollow} className="follow-follow">
                        Follow
                    </Button>
                : 
                <></>
            }
        </div>
    );
};

export default Follow;