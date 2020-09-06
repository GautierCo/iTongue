import validator from "validator";
import React, { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";

import { Link } from "react-router-dom";
import {
    Input,
    Checkbox,
    Button,
    Form,
    Container,
    Message,
    Icon,
} from "semantic-ui-react";

import "./signup.scss";

/* Component */
import Layout from "../../containers/Layout";

const Signup = ({
    signupData,
    onInputChange,
    errorMessagePassword,
    errorMessageEmail,
    setErrorMessagePassword,
    setErrorMessageEmail,
    showPassword,
    togglePassword,
    signup,
    loading,
    errorMailUsed,
}) => {
    const [terms, setTerms] = useState(false);
    const [showText, setShowText] = useState(false);
    /* Destructuration de l'object state.user.signupData */

    const { firstname, lastname, email, password, confirm } = signupData;

    const handleSubmit = () => {
        // console.log("submit");
        signup();
    };

    useEffect(() => {
        if (errorMailUsed) {
            setShowText(true);
        }
        setTimeout(() => {
            setShowText(false);
        }, 3000);
    }, [errorMailUsed, errorMessageEmail]);

    const handleChange = (e) => {
        /* Extraction de l'id pour le checkbox */
        const { name, value } = e.target;

        /* Ici je créer une variable pour les input et donne leur valeur, je donne l'id et la props checked  pour la checkbox  */
        const formData = {
            [name]: value || "",
        };
        /* Dispatch de l'action pour actualiser le store user */
        onInputChange(formData);
    };

    /* Création d'une fonction pour vérifier l'igualité et la taille des mdp  */
    const checkPassword = (pass1, pass2) => {
        if (pass1 && pass2 !== "") {
            if (pass1 !== pass2 || pass1.length < 6 || pass2.length < 6) {
                setErrorMessagePassword(
                    "Les deux mot de passes doivent être identiques et supérieur à 6 charactères"
                );
                return true;
            } else {
                setErrorMessagePassword("");
                return false;
            }
        }
    };

    /* Création d'une fonction pour vérifier que le mail est valide*/
    const checkMail = (mail) => {
        if (mail === "") {
            return true;
        }
        if (mail !== "" && !validator.isEmail(mail)) {
            setErrorMessageEmail("Le mail n'est pas valide");
        } else {
            setErrorMessageEmail("");
            return false;
        }
    };

    /* Création d'une fonction pour vérifier le nombre de charactères  */
    const checkMinimumInput = (data1, data2) => {
        return data1.length < 2 || data2.length < 2;
    };

    return (
        <Layout titlePage="Signup">
            <Container>
                <Form onSubmit={handleSubmit} size="large" className="signup">
                    <h3 className="signup-title">Inscription</h3>
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            label="Prénom"
                            type="text"
                            fluid
                            name="firstname"
                            onChange={handleChange}
                            value={firstname}
                            placeholder="John"
                        />
                        <Form.Field
                            control={Input}
                            label="Nom"
                            type="text"
                            fluid
                            name="lastname"
                            onChange={handleChange}
                            value={lastname}
                            placeholder="Doe"
                        />
                    </Form.Group>

                    <Form.Field
                        control={Input}
                        label="Email"
                        type="email"
                        width="16"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        placeholder="john@example.com"
                    />
                    <Form.Field
                        control={Input}
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        width={16}
                        name="password"
                        onChange={handleChange}
                        value={password}
                        icon={
                            <Icon
                                name={showPassword ? "eye slash" : "eye"}
                                onClick={togglePassword}
                                link
                            />
                        }
                        placeholder="**********"
                    />
                    <Form.Field
                        control={Input}
                        width={16}
                        label="Confirmation du mot de passe"
                        type={showPassword ? "text" : "password"}
                        name="confirm"
                        onChange={handleChange}
                        value={confirm}
                        placeholder="**********"
                    />

                    <Form.Field
                        control={Checkbox}
                        onChange={() => setTerms(!terms)}
                        id="terms"
                        label={{
                            children:
                                "J'accepte les conditions générales d'utilisations",
                        }}
                    />

                    {errorMessagePassword && (
                        <Message negative content={errorMessagePassword} />
                    )}
                    {errorMessageEmail && (
                        <Message negative content={errorMessageEmail} />
                    )}
                    {showText && <Message negative content={errorMailUsed} />}

                    <div className="signup-button">
                        <Button
                            disabled={
                                checkMinimumInput(firstname, lastname) ||
                                checkMail(email) ||
                                checkPassword(password, confirm) ||
                                !terms
                            }
                            loading={loading}
                            className="signup-button--item"
                            type="submit"
                        >
                            S'inscrire
                        </Button>
                        <Link className="signup-link" to={"/login"}>
                            Déjà inscrit ? Connectez vous
                        </Link>
                    </div>
                </Form>
            </Container>
        </Layout>
    );
};

export default Signup;
