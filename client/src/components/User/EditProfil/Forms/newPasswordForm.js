import React, { useState, useEffect } from "react";
import { Form, Input, Message } from "semantic-ui-react";

const NewPasswordForm = ({ handdleInputChange, handdleSubmit, profilData, editProfilDataLoading }) => {
  const { password, confirm } = profilData;

  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [confirmIsValid, setConfirmIsValid] = useState(false);
  const [passAndConfValid, setPassAndConfValid] = useState(false);
  const [message, setMessage] = useState(null);



  useEffect(() => {
    setMessage(null);

    const checkPasswordAndConfirm = () => {
      if (password && password.length >= 6) {
        setPasswordIsValid(true);
        if (password === confirm && password !== "") {
          setMessage(null);
          setConfirmIsValid(true);
          setPassAndConfValid(true);
        } else {
          setMessage("Les mots de passes sont différents");
          setPassAndConfValid(false);
          setConfirmIsValid(false);
        }
      } else if (password && password.length > 4) {
        setMessage("Le mot de passe doit faire au moins 6 caractères");
        setPassAndConfValid(false);
        setPasswordIsValid(false);
      }
    };
    checkPasswordAndConfirm();
  }, [password, confirm]);

  return (
    <div className="edit-profil_password">
      {message && <Message error>{message}</Message>}
      <Form onSubmit={handdleSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <span className="edit-profil_label">Nouveau mot de passe</span>
            <Input
              name="password"
              type="password"
              onChange={handdleInputChange}
              value={password}
              icon={passwordIsValid ? "check circle" : "dont"}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <span className="edit-profil_label">Confirmation du nouveau mot de passe</span>
          <Input
            name="confirm"
            type="password"
            onChange={handdleInputChange}
            value={confirm}
            icon={confirmIsValid ? "check circle" : "dont"}
          />
        </Form.Field>
        <Form.Button
          type="submit"
          content="Enregistrer le mot de passe"
          className="edit-profil_formbtn"
          size="small"
          disabled={!passAndConfValid}
          loading={editProfilDataLoading}
        />
      </Form>
    </div>
  );
};

export default NewPasswordForm;
