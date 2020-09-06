import React from 'react';
import { ToastContainer } from "react-toastify";

/* Containers */
import ExpressionsList from '../../../containers/Admin/Expressions/ExpressionsList';
import ExpressionsResult from '../../../containers/Admin/Expressions/ExpressionsResult';
import HeaderAdmin from "../../../containers/Admin/HeaderAdmin";

/* Style */
import './expressions.scss';

const Expressions = () => {
    return (
        <HeaderAdmin>
            <div className="expressions">
                <ToastContainer autoClose={2000} />
                <ExpressionsList />
                <ExpressionsResult />
            </div>
        </HeaderAdmin>
    );
};

export default Expressions;