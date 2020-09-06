import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
// import './Likes.scss';

const Likes = ({ record, addLikes, unlikes, likesUser,isLogged }) => {
    const isLike = likesUser.find((likes) => likes.id === record.id);

    const [isLiked, setIsLiked] = useState(null);

    useEffect(() => {
        setIsLiked(isLike ? true : false);
    }, [isLike]);

    const handleLikes = () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            unlikes(record.id);
            record.likeCount--;
        } else {
            addLikes(record.id);
            record.likeCount++;
        }
    };
    return (
        <div onClick={() => isLogged && handleLikes()}>
            <Icon className={`${isLiked ? "isFavorite " : ""}likes`} name="thumbs up" />
            {record && record.likeCount}
        </div>
    );
};

export default Likes;
