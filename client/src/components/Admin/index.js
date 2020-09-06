import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

/* Components */ 
import Expressions from './Expressions';
import HomeAdmin from '../../containers/Admin/HomeAdmin';
import LoginAdmin from '../../containers/Admin/LoginAdmin';
import Languages from '../../containers/Admin/Languages';

/* Styles */
import './admin.scss';

const Admin = ( { isLogged } ) => {

    return (
        <div className="admin">
            { isLogged ? 
                <Switch>
                        <Route exact path="/admin" component={HomeAdmin} />
                        <Route exact path="/admin/expressions" component={Expressions} ></Route>
                        <Route exact path="/admin/languages" component={Languages} ></Route>
                        <Route path=''>
                            <Redirect to="/admin" /> 
                        </Route>
                </Switch>
            : 
                <Switch>
                    <Route exact path="/admin/login" component={LoginAdmin} />
                    <Redirect to="/admin/login" /> 
                </Switch>
            }
        </div>
    );
};

export default Admin;