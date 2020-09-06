import React, {useEffect} from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

const EditLangsForm = (props) => {

    const { 
        handdleInputChange, 
        handdleSubmit, 
        profilData, 
        allLanguagesList, 
        fetchAllLanguages ,
        editProfilDataLoading,
    } = props;

    useEffect(() => {
        fetchAllLanguages();
    }, [fetchAllLanguages]);

    const optionsLanguages = allLanguagesList.map(language => {
        return {
            key: language.id,
            value: language.id,
            text: language.name,
            flag: language.code,
        };
    });

    return (
        <div className="edit-profil_langs">
            <div className="edit-profil_container">
                <Form onSubmit={handdleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <span className="edit-profil_label">iTeach</span>
                            <Dropdown 
                            multiple 
                            selection 
                            placeholder="iTeach" 
                            name="taughtLanguages" 
                            options={optionsLanguages}
                            defaultValue={profilData.modifyTaughtLanguages}
                            onChange={handdleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <span className="edit-profil_label">iLearn</span>
                            <Dropdown 
                            multiple 
                            selection 
                            placeholder="iLearn" 
                            name="learnedLanguages" 
                            options={optionsLanguages}
                            defaultValue={profilData.modifylearnedLanguages}
                            onChange={handdleInputChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Button 
                    type="submit"
                    content="Enregistrer le profil"
                    className="edit-profil_formbtn"
                    size="small"
                    loading={editProfilDataLoading}
                    />
                </Form>
            </div>
        </div>
    );
};

export default EditLangsForm;