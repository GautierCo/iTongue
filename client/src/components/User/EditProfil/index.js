import React, { useEffect } from 'react';
import './editprofil.scss';
import { Divider, Image, Checkbox, Form, Label, Input, Dropdown } from 'semantic-ui-react';
import Layout from '../../../containers/Layout';

const EditProfil = ({ currentUser, allLanguagesList, fetchAllLanguages, editProfil, editProfilInput, editProfilData }) => {

    useEffect(() => {
        fetchAllLanguages();
    }, []);

    const optionsLanguages = allLanguagesList.map(language => {
        return {
            key: language.id,
            value: language.id,
            text: language.name,
            flag: language.code,
        };
    });

    const selectedLanguages = (role) => {
        const map = role.map((language, index) => {
            return language.id || index + 1 ;
        });
        return map;
    };

    const handdleInputChange = (e, data) => {

        const { name, value } = e.target.value ? e.target : data; // Pour les languages cela me retourne un tableau de language_id

        const test =  {
            [name]: value,
        };

        editProfilInput(test);
        console.log(test);
    };

/*
    const handdleInputChange = (e, data) => {

        const { name, value } = e.target.value ? e.target : data; // Pour les languages cela me retourne un tableau de language_id

        const test = () => {

            if(name === ("learnedLanguages" || "taughtLanguages")) {

                let addPropertyToLangId = allLanguagesList.filter(language => language.id === value);
                return {
                    [name]: addPropertyToLangId,
                }
            } else {
                return {
                    [name]: value,
                }
            }
        };

        editProfilInput(test);
        console.log(test);
    };
*/
    
    const handdleSubmit = (e) => {
        e.preventDefault();
        editProfil();
    };

    return (
        <Layout>
            <div className="edit-profil">

                <div className="edit-profil_profil">
                    <h3 className="edit-profil_title">Modification du profil</h3>

                    <div className="edit-profil_container">

                        <Image src={editProfilData.avatarUrl} avatar size="big" className="edit-profil_container__avatar"/>

                        <div className="edit-profil_container__toggle">
                            <div className="toggle_container">
                                <span>Profil Privé</span>
                                <Checkbox 
                                toggle 
                                name="toggle_privateprofil" 
                                disabled
                                />
                            </div>
                            <div className="toggle_container">
                                <span>Notifications</span>
                                <Checkbox 
                                toggle 
                                name="toggle_notifications" 
                                disabled
                                />
                            </div>
                        </div>
                    </div>

                    <Form onSubmit={handdleSubmit}>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>Prénom</span>
                                <Input 
                                name="firstname"
                                value={editProfilData.firstname}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <span>Nom</span>
                                <Input 
                                name="lastname"
                                value={editProfilData.lastname}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <span>iTeach</span>
                                <Dropdown 
                                multiple 
                                selection 
                                placeholder="iTeach" 
                                name="taughtLanguages" 
                                options={optionsLanguages}
                                defaultValue={selectedLanguages(editProfilData.taughtLanguages)}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <span>iLearn</span>
                                <Dropdown 
                                multiple 
                                selection 
                                placeholder="iLearn" 
                                name="learnedLanguages" 
                                options={optionsLanguages}
                                defaultValue={selectedLanguages(editProfilData.learnedLanguages)}
                                onChange={handdleInputChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Button 
                        type="submit"
                        content="Enregistrer"
                        className="edit-profil_formbtn"
                        />
                    </Form>
                </div>

                <div className="edit-profil_password">
                    <h3 className="edit-profil_title">Modification du mot de passe</h3>
                </div>

                <Divider horizontal />

                <div className="edit-profil_email">
                    <h3 className="edit-profil_title">Modification de l'email</h3>
                </div>

                <Divider horizontal />

                <div className="edit-profil_slug">
                    <h3 className="edit-profil_title">Modification du slug</h3>
                </div>
            </div>
        </Layout>
    );
};

export default EditProfil;