import React, { useState, useEffect } from "react";
import { Form, Input } from "semantic-ui-react";

const EditEmailForm = (props) => {
    const {
        handdleInputChange,
        handdleSubmit,
        profilData,
        currentUser,
        editProfilDataLoading,
    } = props;

    const [emailIsValid, setEmailIsValid] = useState(false);

    useEffect(() => {
        const checkEmailIsValid = (email) => {
            if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                setEmailIsValid(true);
            } else {
                setEmailIsValid(false);
            }
        };
        checkEmailIsValid(profilData.email);
    }, [emailIsValid, profilData.email]);

    return (
        <div className="edit-profil_email">
            <Form onSubmit={handdleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <span className="edit-profil_label">Email actuel</span>
                        <Input
                            name="old_email"
                            type="email"
                            disabled
                            value={currentUser.email}
                        />
                    </Form.Field>
                    <Form.Field>
                        <span className="edit-profil_label">Nouveau email</span>
                        <Input
                            name="email"
                            type="email"
                            value={profilData.email}
                            onChange={handdleInputChange}
                            icon={emailIsValid ? "check circle" : "dont"}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Button
                    type="submit"
                    content="Enregistrer l'email"
                    className="edit-profil_formbtn"
                    size="small"
                    disabled={!emailIsValid}
                    loading={editProfilDataLoading}
                />
            </Form>
        </div>
    );
};

export default EditEmailForm;
