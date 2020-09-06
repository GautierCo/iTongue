import React, { useState } from "react";
import emailjs from "emailjs-com";
import Layout from "../../containers/Layout";
import FAQ from "./FAQ";
import { Form, Input, TextArea, Button, Message } from "semantic-ui-react";
import { toast } from "react-toastify";
import validator from "validator";
import "./style.scss";

toast.configure();
const Contact = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    const checkMinimumInput = (data1, data2, data3) => {
        return data1.length < 2 || data2.length < 2 || data3.length < 10;
    };

    const checkMail = (mail) => {
        if (mail === "") {
            return true;
        }
        if (!validator.isEmail(mail)) {
            console.log("mail not ok");
            return true;
        } else {
            console.log("mail ok");
            return false;
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("onSubmit");
        if (
            !checkMail(email) &&
            !checkMinimumInput(firstname, lastname, message)
        ) {
            console.log("email sent");
            sendEmail(evt);
            toast.success("Nous vous répondons au plus vite.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else if (name === "message") {
            setMessage(value);
        } else if (name === "email") {
            setEmail(value);
        }
    };
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "gmail",
                "itongueform",
                e.target,
                "user_5aEwx2fJS3ZncS69QRI3a"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );

        e.target.reset();
    };

    return (
        <Layout titlePage='Contact'>
            <FAQ />
            <div className="contactForm">
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Field
                            id="form-input-control-first-name"
                            control={Input}
                            name="firstName"
                            label="Prénom"
                            value={firstname}
                            placeholder="Prénom"
                            onChange={handleChange}
                        />
                        <Form.Field
                            id="form-input-control-last-name"
                            control={Input}
                            name="lastName"
                            value={lastname}
                            label="Nom"
                            placeholder="Nom"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Field
                        id="form-textarea-control-opinion"
                        control={TextArea}
                        name="message"
                        label="Message"
                        value={message}
                        placeholder="Message"
                        onChange={handleChange}
                    />
                    <Form.Field
                        id="form-input-control-error-email"
                        control={Input}
                        name="email"
                        value={email}
                        label="E-mail"
                        placeholder="joe@schmoe.com"
                        onChange={handleChange}
                        // error={{
                        //     content: 'Please enter a valid email address',
                        //     pointing: 'below',
                        // }}
                    />
                    {email !== "" && checkMail(email) && (
                        <Message negative content={"Email incorrect"} />
                    )}
                    <div className="centerButton">
                        <Form.Field
                            className="contactForm-button"
                            id="form-button-control-public"
                            control={Button}
                            disabled={
                                checkMinimumInput(
                                    firstname,
                                    lastname,
                                    message
                                ) || checkMail(email)
                            }
                            type="submit"
                            content="Envoyez votre message"
                        />
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default Contact;
