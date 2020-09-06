import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

const EditSlugForm = (props) => {

    const { 
        editProfilSlug,
        editProfilSlugInput,
        editProfilData,
        editProfilSlugMsg,
    } = props;
    
    const handdleSubmit = (e) => {
        e.preventDefault();
        editProfilSlug();
    }

    const handdleInputChange = (e) => {
        editProfilSlugInput(e.target.value);
    }

    return (
        <div className="edit-profil_slug">
            <Form onSubmit={handdleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span className="edit-profil_label">Adresse de votre profil</span>
                        <Input 
                        label='https://itongue.io/user/'
                        name="slug"
                        type="text"
                        value={editProfilData.slug}
                        onChange={handdleInputChange}
                        />
                        { (editProfilSlugMsg !== "") && 
                            <Label basic color='red' pointing>
                                {editProfilSlugMsg}
                            </Label>
                        }
                    </Form.Field>
                    <Form.Button 
                    type="submit"
                    content="Enregistrer le slug"
                    className="edit-profil_formbtn"
                    size="small"
                    />
                </Form.Group>
            </Form>
        </div>
    );
};

export default EditSlugForm;