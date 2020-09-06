import React, { useState } from "react";
import { useParams, Redirect, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* Components */
import { Accordion, Icon, Header } from "semantic-ui-react";
import NewPasswordForm from "./Forms/newPasswordForm";
import EditEmailForm from "./Forms/editEmailForm";

/* Containers */
import EditProfilForm from "../../../containers/User/Forms/EditProfilForm";
import EditLangsForm from "../../../containers/User/Forms/EditLangsForm";
import EditSlugForm from "../../../containers/User/Forms/EditSlugForm";
import Layout from "../../../containers/Layout";

/* Style */

import "./editprofil.scss";

const EditProfil = props => {

  const [activeIndex, setActiveIndex] = useState(null);
  let slug = useParams();

  const handleAccordionClick = (_, titleProps) => {
    const index = titleProps.index;
    const setNewIndex = activeIndex === index ? -1 : index;
    setActiveIndex(setNewIndex);
  };

  const { currentUser, editProfil, editProfilInput, editProfilData, editProfilDataLoading } = props;

  let profilData = { ...editProfilData };

  const handdleInputChange = (e, data) => {
    // Pour les languages cela me retourne un tableau de language_id
    const { name, value } = e.target.value ? e.target : data;
    const dataInput = {
      [name]: value
    };
    editProfilInput(dataInput);
  };

  const handdleSubmit = e => {
    e.preventDefault();
    editProfil();
  };

  return (
    <Layout titlePage="Edit Profil">
      {currentUser.slug !== slug.slug && <Redirect to={`/user/${currentUser.slug}`} />}
      <ToastContainer autoClose={2000} />
      <div className="edit-profil">
        <Header size="tiny" className="edit-profil_back">
          <Link to={`/user/${currentUser.slug}`}>
            <Icon name="chevron circle left" size="small" />
            Retour au profil
          </Link>
        </Header>

        <Accordion className="edit-profil_accordion">
          <Accordion.Title onClick={handleAccordionClick} active={activeIndex === 0} index={0}>
            <h3 className={`edit-profil_title ${activeIndex === 0 ? " activeAccordion" : ""}`}>
              <Icon name="user" /> Modification du profil
              {activeIndex === 0 ? (
                <Icon className="edit-profil_title__arrow active" name="chevron circle down" />
              ) : (
                <Icon className="edit-profil_title__arrow" name="chevron circle right" />
              )}
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <EditProfilForm
              handdleInputChange={handdleInputChange}
              handdleSubmit={handdleSubmit}
              profilData={profilData}
              editProfilInput={editProfilInput}
              editProfilDataLoading={editProfilDataLoading}
            />
          </Accordion.Content>

          <Accordion.Title onClick={handleAccordionClick} active={activeIndex === 1} index={1}>
            <h3 className={`edit-profil_title ${activeIndex === 1 ? " activeAccordion" : ""}`}>
              <Icon name="flag" /> Modification des langues
              {activeIndex === 1 ? (
                <Icon className="edit-profil_title__arrow active" name="chevron circle down" />
              ) : (
                <Icon className="edit-profil_title__arrow" name="chevron circle right" />
              )}
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <EditLangsForm
              handdleInputChange={handdleInputChange}
              handdleSubmit={handdleSubmit}
              profilData={profilData}
              editProfilDataLoading={editProfilDataLoading}
            />
          </Accordion.Content>

          <Accordion.Title onClick={handleAccordionClick} active={activeIndex === 2} index={2}>
            <h3 className={`edit-profil_title ${activeIndex === 2 ? " activeAccordion" : ""}`}>
              <Icon name="key" /> Modification du mot de passe
              {activeIndex === 2 ? (
                <Icon className="edit-profil_title__arrow active" name="chevron circle down" />
              ) : (
                <Icon className="edit-profil_title__arrow" name="chevron circle right" />
              )}
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <NewPasswordForm
              handdleInputChange={handdleInputChange}
              handdleSubmit={handdleSubmit}
              profilData={profilData}
              editProfilDataLoading={editProfilDataLoading}
            />
          </Accordion.Content>

          <Accordion.Title onClick={handleAccordionClick} active={activeIndex === 3} index={3}>
            <h3 className={`edit-profil_title ${activeIndex === 3 ? " activeAccordion" : ""}`}>
              <Icon name="at" /> Modification de l'email
              {activeIndex === 3 ? (
                <Icon className="edit-profil_title__arrow active" name="chevron circle down" />
              ) : (
                <Icon className="edit-profil_title__arrow" name="chevron circle right" />
              )}
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <EditEmailForm
              handdleInputChange={handdleInputChange}
              handdleSubmit={handdleSubmit}
              profilData={profilData}
              currentUser={currentUser}
              editProfilDataLoading={editProfilDataLoading}
            />
          </Accordion.Content>

          <Accordion.Title onClick={handleAccordionClick} active={activeIndex === 4} index={4}>
            <h3 className={`edit-profil_title ${activeIndex === 4 ? " activeAccordion" : ""}`}>
              <Icon name="linkify" />
              Modification du slug
              {activeIndex === 4 ? (
                <Icon className="edit-profil_title__arrow active" name="chevron circle down" />
              ) : (
                <Icon className="edit-profil_title__arrow" name="chevron circle right" />
              )}
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 4}>
            <EditSlugForm
              handdleInputChange={handdleInputChange}
              handdleSubmit={handdleSubmit}
              profilData={profilData}
            />
          </Accordion.Content>
        </Accordion>
      </div>
    </Layout>
  );
};

export default EditProfil;
