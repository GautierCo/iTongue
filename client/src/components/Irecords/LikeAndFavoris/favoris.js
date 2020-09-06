import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";

// import './Favoris.scss';

const Favoris = ({ addFavoris, unFavoris, record, favorisUser,isLogged }) => {
    const isFavorite = favorisUser.find((favoris) => favoris.id === record.id);
    const [isFavoris, setIsFavoris] = useState(null);

    useEffect(() => {
        setIsFavoris(isFavorite ? true : false);
    }, [isFavorite]);

    const handleAddFavoris = () => {
        setIsFavoris(!isFavoris);
        if (isFavoris) {
            unFavoris(record.id);
            record.bookmarkCount--;
        } else {
            addFavoris(record.id);
            record.bookmarkCount++;
        }
    };
    return (
        <div
            onClick={() => isLogged && handleAddFavoris()}
            className={`${isFavoris ? "isFavorite " : ""}favoris`}
        >
            <Icon name="favorite" />
            {record && record.bookmarkCount}
        </div>
    );
};

export default Favoris;
