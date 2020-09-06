import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Header, Grid, GridColumn, Image, Container, Flag } from "semantic-ui-react";
import Recording from "../../assets/recording.png";

import Irecords from "../../assets/iRecords.png";
import Profil from "../../assets/profil.png";

import "./home.scss";

/* Components */
import MembersCard from "../MembersCard";
import Layout from "../../containers/Layout";
import Carousel from "./carousel";

/* Containers */
import IrecordsComponent from "../../containers/Irecords";

const Home = ({
  bestUsers,
  bestTranslations,
  bestIrecords,
  fetchBestUsers,
  fetchBestTranslations,
  fetchBestIrecords,
  emptyBestIrecords
}) => {
  useEffect(() => {
    fetchBestUsers();
    fetchBestTranslations();
    fetchBestIrecords();

    return () => {
      emptyBestIrecords();
    };
  }, [fetchBestUsers, fetchBestTranslations, fetchBestIrecords]);

  return (
    <Layout titlePage="Home">
      <ToastContainer autoClose={2000} />
      <Carousel />
      <Container className="homePage">
        <Header size="large" content="Faites vos premiers pas avec iTongue" />
        <p>
          iTongue est un réseau social permettant d'apprendre les expressions les plus communes dans
          d'autres langues . Vous pouvez suivre d'autres utilisateurs, vous aurez accès à toutes les
          expressions qu’ils auront gravées pour les écouter et les comparer avec les votres pour
          ainsi apprendre et s'améliorer dans votre langue favorite.
        </p>
        <Header className="homePage-header" size="medium" content="Nos fonctionnalités" />
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <GridColumn>
              <Image src={Irecords} />
            </GridColumn>
            <GridColumn>
              <p>
                Écoutez une traduction, regardez comment elle s'écrit et enregistrez vous en vous en
                inspirant.
              </p>
            </GridColumn>
          </Grid.Row>
          <Grid.Row columns={2}>
            <GridColumn>
              <p>
                Recherchez dans notre catalogue d'expressions une traductions que vous pensez être
                capable de prononcer, enregistrez vous !
              </p>
            </GridColumn>
            <GridColumn>
              <Image src={Recording} />
            </GridColumn>
          </Grid.Row>
          <Grid.Row columns={2}>
            <GridColumn>
              <Image src={Profil} />
            </GridColumn>
            <GridColumn>
              <p>
                Suivez vos personnes favorites pour voir leur aptitude dans une langue et apprendre
                à votre tour.
              </p>
            </GridColumn>
          </Grid.Row>
        </Grid>
        <Header
          size="medium"
          className="homePage-header"
          content="Les iTeachers les plus actifs par langue"
        />
        {bestUsers && bestUsers.map(user => <MembersCard user={user} key={user.id} />)}

        <Header
          size="medium"
          content="Nos expressions les plus populaires"
          className="homePage-header"
        />

        {bestTranslations &&
          bestTranslations.map(({ expression, iRecords, language, text }, index) => (
            <div key={index} className="home-translations">
              <Image
                src={`https://www.countryflags.io/${language}/flat/32.png`}
                className="flag_image"
              />

              <div className="popular_container">
                <div className="popular__name">{text}</div>
                <div className="popular__irecords">{iRecords} iRecords</div>
              </div>
            </div>
          ))}

        <Header size="medium" content="Nos derniers iRecords" className="homePage-header" />
        {bestIrecords &&
          bestIrecords.map(record => (
            <IrecordsComponent
              key={record.id}
              record={record}
              user={record.user}
              isUserRecord={record.user.id}
            />
          ))}
      </Container>
    </Layout>
  );
};

export default Home;

// <div key={index} className="users">
//                             <p>{index + 1}</p>

//                             <Image
//                                 className="users-avatar"
//                                 src={
//                                     user.avatarUrl
//                                         ? `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
//                                         : "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
//                                 }
//                                 alt="avatar itongue"
//                                 avatar
//                                 size="mini"
//                             />

//                             <p>
//                                 {user.firstname} {user.lastname}
//                             </p>

//                             <p className="users-country">
//                                 <Flag name={user.languageMostTaught.code} />
//                             </p>
//                             <p className="users-records">{user.iRecords} iRecords</p>
//                         </div>
