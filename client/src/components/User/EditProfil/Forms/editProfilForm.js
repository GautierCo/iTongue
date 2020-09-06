import React, { useState } from 'react';
// import UpdateAvatar from '../../UpdateAvatar';
import UpdateAvatar from '../../../../containers/User/UpdateAvatar'
import { Checkbox, Form, Input, TextArea } from 'semantic-ui-react';

const EditProfilForm = (props) => {

    const { 
        handdleInputChange, 
        handdleSubmit, 
        profilData, 
        editProfilAvatar, 
        editProfilInput,
        editProfilDataLoading,
    } = props;

    const [ countCharBio, setCountCharBio ] = useState(profilData.bio ? profilData.bio.length : 0);

    const handdleInputChangeBio = (e) => {
        const { name, value } = e.target; 
        const dataInput =  {
            [name]: value,
        };
        editProfilInput(dataInput);
        setCountCharBio(e.target.value.length);
    };

    return (
        <div className="edit-profil_profil">
            <div className="edit-profil_container">
                <UpdateAvatar
                    avatarUrl={profilData.avatarUrl} 
                    isUserAccount={true}
                    editProfilAvatar={editProfilAvatar}
                />
                <div className="edit-profil_container__toggle">
                    <div className="toggle_container">
                        <span className="edit-profil_label">Profil Privé</span>
                        <Checkbox 
                        toggle 
                        name="toggle_privateprofil" 
                        disabled
                        />
                    </div>
                    <div className="toggle_container">
                        <span className="edit-profil_label">Notifications</span>
                        <Checkbox 
                        toggle 
                        name="toggle_notifications" 
                        disabled
                        />
                    </div>
                </div>
            </div>
            
            <Form onSubmit={handdleSubmit}>
                <Form.Field>
                    <div className="edit-profil_label">Bio 
                    (<span className={countCharBio > 130 ? "biolength-hight" : ""}>
                        { `${countCharBio} / 140` }
                        </span>)
                    </div>
                    <TextArea 
                    name="bio"
                    value={profilData.bio ? profilData.bio : ""}
                    onChange={handdleInputChangeBio}
                    placeholder={"Une petite introduction pour ton profil.."}
                    maxLength="140"
                    />
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span className="edit-profil_label">Prénom</span>
                        <Input 
                        name="firstname"
                        value={profilData.firstname}
                        onChange={handdleInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <span className="edit-profil_label">Nom</span>
                        <Input 
                        name="lastname"
                        value={profilData.lastname}
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
    );
};

export default EditProfilForm;












