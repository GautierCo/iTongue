import React from "react";
import { Header } from "semantic-ui-react";

import MembersCard from "../MembersCard";
import Layout from "../../containers/Layout";
import data from "../Search/data";

const IusersPage = (props) => {

    const { allUsersList, isLoadingallUsers, usersListError} = props;

    return (
        <Layout>
            <Header as="h1">Tout nos utilisateurs</Header>
                {allUsersList.map((element) => (
                    <MembersCard user={element} key={element.id} />
                ))}
        </Layout>
    );
};

export default IusersPage;
