import React, { useEffect } from "react";
import Likes from "./likes";
import Favoris from "./favoris";
import "./likeandfavoris.scss";

const LikeAndFavoris = ({
    record,
    addFavoris,
    unFavoris,
    addLikes,
    unlikes,
    favorisUser,
    likesUser,
    isLogged
}) => {
    return (
        <div className="likeandfavoris">
            <Likes
                likesUser={likesUser}
                record={record}
                addLikes={addLikes}
                unlikes={unlikes}
                isLogged={isLogged}
            />
            <Favoris
                favorisUser={favorisUser}
                record={record}
                unFavoris={unFavoris}
                addFavoris={addFavoris}
                isLogged={isLogged}
            />
        </div>
    );
};

export default LikeAndFavoris;
