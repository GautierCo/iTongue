import React from 'react';

/* Components */
import { Form, Segment, Header, Message } from 'semantic-ui-react';

/* Styles */
import './loginadmin.scss';

const LoginAdmin = (props) => {

    const { 
        loginData, 
        loginSubmit, 
        loginInputValue, 
        loading, 
        message,
    } = props;

    const handdleInputChange = (e) => {

        const { name, value } = e.target;

        loginInputValue({
            [name] : value
        });
    };

    const handdleSubmit = (e) => {
        e.preventDefault();
        loginSubmit();
    };

    return (
        <div className="login-admin">
            <Segment className="login-admin_container" loading={loading} >
                <Header size="large" content="Dashboard admin"/>
                <Form onSubmit={handdleSubmit}>
                    <Form.Input 
                    placeholder="example@email.com"
                    name="email"
                    type="text"
                    onChange={handdleInputChange}
                    value={loginData.email}
                    icon='mail'
                    iconPosition='left'
                    />
                    <Form.Input 
                    placeholder="********"
                    name="password"
                    type="password"
                    onChange={handdleInputChange}
                    value={loginData.password}
                    icon='key'
                    iconPosition='left'
                    />
                    <Form.Checkbox 
                    label="Rester connecté"
                    name="stayconnect"
                    />
                    <Form.Button
                    content="Connexion"
                    type="submit"
                    />
                </Form>
                { message && <Message content={message} error/> }
            </Segment>
        </div>
    );
};

export default LoginAdmin;