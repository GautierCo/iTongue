import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";

import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";
// import './Favoris.scss';

const Favoris = ({ favorisUser, fetchFavoris }) => {
    useEffect(() => {
        fetchFavoris();
    }, [fetchFavoris]);
    return (
        <Layout titlePage="Bookmarks">
            <div className="feed">
                <Header size="small" content="Bookmarks" className="feed-title" />

                <div className="feed-list">
                    {favorisUser.length > 0 ? (
                        favorisUser.map((record) => (
                            <Irecords
                                key={record.id}
                                record={record}
                                user={record.user}
                                isUserRecord={record.user.id}
                            />
                        ))
                    ) : (
                        <div className="">Aucun favoris</div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Favoris;
