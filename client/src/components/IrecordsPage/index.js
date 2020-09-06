import React, { useEffect } from "react";

/* Components */
import { Header } from "semantic-ui-react";

/* Containers */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";

/* Style */
import "./irecordsPage.scss";

const IrecordsPage = props => {
  const { allRecordsList, fetchAllRecords, emptyRecordsList } = props;

  useEffect(() => {
    fetchAllRecords();

    return () => {
      emptyRecordsList();
    };
  }, [fetchAllRecords]);

  return (
    <Layout titlePage="iRecords">
      <div className="irecordsPage">
        <Header size="small" content="Lastest iRecords" className="title" />
        <div className="irecords-list">
          {allRecordsList &&
            allRecordsList.map(recordUser => {
              return (
                <Irecords
                  key={recordUser.id}
                  record={recordUser}
                  user={recordUser.user}
                  isUserRecord={recordUser.user.id}
                />
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default IrecordsPage;
