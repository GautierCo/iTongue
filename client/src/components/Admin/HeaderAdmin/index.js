import React from "react";

/* Components */
import { Header, Menu, Image, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

/* Styles */
import "./headeradmin.scss";

const HeaderAdmin = ( { logout, userConnect, ...props } ) => {
    
    const handdleLogout = () => {
        logout();
    };

    const options = [
        { key: 'sign-out', text: 'Déconnexion', icon: 'sign out', onClick:handdleLogout },
    ];
    
    const trigger = (
        <Image
            src={userConnect.avatarUrl == null ?
                "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg" 
                :
                `${process.env.REACT_APP_FILES_URL}/${userConnect.avatarUrl}`
            }
            avatar
            size="mini"
            spaced="left"
        />
    );

    return (
        <>
            <Menu borderless className="header-admin" secondary>
                <Menu.Item>
                    <NavLink to="/admin" activeClassName="active">
                        <Header size="large">Dashboard</Header>
                    </NavLink>
                </Menu.Item>
                <Menu.Item className="header-admin links">
                    <NavLink
                        to="/admin"
                        exact
                        activeClassName="active"
                        className="header-admin links__item"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/admin/expressions"
                        activeClassName="active"
                        className="header-admin links__item"
                    >
                        Expressions
                    </NavLink>
                    <NavLink
                        to="/admin/languages"
                        activeClassName="active"
                        className="header-admin links__item"
                    >
                        Langues
                    </NavLink>
                </Menu.Item>
                <Menu.Item>
                    <span><b>{userConnect.firstname} {userConnect.lastname}</b></span>
                    <Dropdown
                    trigger={trigger}
                    options={options}
                    pointing='top right'
                    icon={null}
                    />
                </Menu.Item>
            </Menu>

            <div className="main">{props.children}</div>
        </>
    );
};

export default HeaderAdmin;
