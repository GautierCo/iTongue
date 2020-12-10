import React, { useState, useEffect } from 'react';

/* Components */
import { Icon, Form, Table, Segment, Header, Confirm } from 'semantic-ui-react';

const ExpressionsList = ( props ) => {

    console.log(props);

    const {
        fetchExpression, 
        newExpressionInputValue, 
        newExpressionLoading,
        addExpressionInputValue, 
        addExpressionSubmit,
        expressionsList,
        setTraductionsByExpression,
        expressionIdSelect,
        expressionId,
        deleteExpression,
    } = props;

    useEffect(() => {
        fetchExpression();
    }, [newExpressionLoading, fetchExpression]);
    
    const [ confirm, setConfirm ] = useState(false); // true || false
    const [ expressionDeleteId, setExpressionDeleteId ] = useState(0);

    const handdleAddExpressionInputChange = (e) => {
        addExpressionInputValue(e.target.value);
    };

    const handdleAddExpressionSubmit = (e) => {
        e.preventDefault();
        addExpressionSubmit();
    };

    const handdleShowTraductionsByExpression = (exprId) => {
        expressionIdSelect(exprId);
        setTraductionsByExpression();
    };

    const handdleDeleteExpressionConfirm = (exprId) => {
        setConfirm(true)
        setExpressionDeleteId(exprId)
    };

    const handdleDeleteExpression = () => {
        setConfirm(false)
        deleteExpression(expressionDeleteId);
    };

    return (
        
    <Segment className="expressions-list" basic>
       
        <Segment>
            <Header size='medium' content='Expressions' />
            <Form onSubmit={handdleAddExpressionSubmit}>
                <Form.Group>
                    <Form.Input 
                    icon="add" 
                    placeholder="Ajouter une expression" 
                    width="16" 
                    value={newExpressionInputValue}
                    onChange={handdleAddExpressionInputChange}
                    loading={newExpressionLoading}
                    />
                    <Form.Button type="submit" content="Ajouter"/>
                </Form.Group>
            </Form>
        </Segment>
        
        <Segment className="expression-list__table">
            <Confirm
            open={confirm}
            onCancel={() => setConfirm(false)}
            onConfirm={handdleDeleteExpression}
            content="Vous souhaitez vraiment supprimer cette expression ?"
            size="tiny"
            />

            <Form className="expressions-form">
                <Form.Input icon='search' fluid placeholder='Search..' />
            </Form>

            <Table celled selectable sortable striped>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Label</Table.HeaderCell>
                        <Table.HeaderCell>NbrTraduction</Table.HeaderCell>
                        <Table.HeaderCell>Supprimer</Table.HeaderCell>
                        <Table.HeaderCell>Afficher</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { expressionsList && expressionsList.map((expression, key) => (
                        <Table.Row 
                        textAlign='center' 
                        key={key} 
                        active={expressionId === expression.id ? true : false }
                        >
                            <Table.Cell>{expression.id}</Table.Cell>
                            <Table.Cell>
                                { expression.label }
                            </Table.Cell>
                            <Table.Cell>
                                {expression.translations.length}
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="delete" 
                                link 
                                onClick={() => handdleDeleteExpressionConfirm(expression.id)}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="eye" 
                                link
                                onClick={() => handdleShowTraductionsByExpression(expression.id) }
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Segment>
    </Segment>
    );
};

export default ExpressionsList;