import React, { useState, useEffect } from 'react';

/* Components */
import { Icon, Form, Table, Flag, Segment, Header, Confirm } from 'semantic-ui-react'

/* Fake Data */
import InputTraduction from './InputTraduction';

const ExpressionsResult = ( props ) => {

    const {
        traductionsList,
        addTraductionInputValue,
        newTraductionInputValue,
        addTraductionSubmit,
        expressionId,
        deleteTraduction,
        editTraductionValue,
        editTraductionInputValue,
        editTraductionSubmit,
        fetchLanguages,
        languagesList,
    } = props;

    const expressionIdIsSelect = expressionId !== 0 ? false : true;
    const [ confirm, setConfirm ] = useState(false); // true || false
    const [ traductionDeleteId, setTraductionDeleteId ] = useState(0);
    const [ traductionEditId, setTraductionEditId ] = useState(0);
    const [ disableEditButton, setDisableEditButton ] = useState(false);

    useEffect(() => {
        fetchLanguages();
    }, [fetchLanguages]);

    /* Remise en forme des datas pour le dropDown des langues */
    const dropDownOptions = languagesList.map(language => {
        return {
            ...language,
            value: language.id,
            text: language.name,
            flag: language.code,
        };
    });

    const handdleAddTraductionInputChange = (e, data) => {

        const { name, value} = e.target.value ? e.target : data;

        addTraductionInputValue({
            [name] : value,
        });
    };

    const handdleAddTraductionSubmit = (e) => {
        e.preventDefault();
        addTraductionSubmit();
        fetchLanguages();
    };

    const handdleDeleteTraductionConfirm = (exprId) => {
        setConfirm(true);
        setTraductionDeleteId(exprId);
    };

    const handdleDeleteTraduction = () => {
        setConfirm(false);
        deleteTraduction(traductionDeleteId);
    };

    return (
    <Segment className="expressions-result" basic>
        <Segment>
            <Header size='medium' content='Traductions'/>
            <Form onSubmit={handdleAddTraductionSubmit}>
                <Form.Group>
                    <Form.Input 
                    icon="add" 
                    placeholder="Ajouter une traduction" 
                    width='15'
                    onChange={handdleAddTraductionInputChange}
                    name="text"
                    value={newTraductionInputValue.text}
                    type="text"
                    disabled={expressionIdIsSelect}
                    />
                    <Form.Dropdown 
                    options={dropDownOptions} 
                    search 
                    selection 
                    placeholder="Langues"
                    name="language_id"
                    value={newTraductionInputValue.language.code}
                    onChange={handdleAddTraductionInputChange}
                    disabled={expressionIdIsSelect}
                    />
                    <Form.Button 
                    type="submit" 
                    content="Ajouter"
                    disabled={expressionIdIsSelect}
                    />
                </Form.Group>
            </Form>
        </Segment>

        <Segment className="expression-result__table" disabled={expressionIdIsSelect}>
        
            <Confirm
            open={confirm}
            onCancel={() => setConfirm(false)}
            onConfirm={handdleDeleteTraduction}
            content="Vous souhaitez vraiment supprimer cette traduction ?"
            size="tiny"
            />

            <Table celled selectable striped>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Langue</Table.HeaderCell>
                        <Table.HeaderCell>Traduction</Table.HeaderCell>
                        <Table.HeaderCell>Editer</Table.HeaderCell>
                        <Table.HeaderCell>Supprimer</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { traductionsList && traductionsList.map((translation, key) => (
                        <Table.Row textAlign='center' key={key}>
                            <Table.Cell>
                                {translation.id}
                            </Table.Cell>
                            <Table.Cell> 
                                <Flag name={translation.language.code} />
                            </Table.Cell>
                            <Table.Cell>
                               
                                { translation.id ===  traductionEditId ? 
                                    <InputTraduction 
                                    translation={translation} 
                                    traductionEditId={traductionEditId}
                                    editTraductionInputValue={editTraductionInputValue}
                                    editTraductionValue={editTraductionValue}
                                    editTraductionSubmit={editTraductionSubmit}
                                    setTraductionEditId={setTraductionEditId}
                                    setDisableEditButton={setDisableEditButton}
                                    /> 
                                    :
                                    translation.text
                                }
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="edit" 
                                link 
                                onClick={() => {
                                    editTraductionInputValue(translation);
                                    setTraductionEditId(translation.id);
                                    setDisableEditButton(true);
                                }}
                                disabled={disableEditButton}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Icon 
                                name="delete" 
                                link 
                                
                                onClick={() => handdleDeleteTraductionConfirm(translation.id)}
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

export default ExpressionsResult;