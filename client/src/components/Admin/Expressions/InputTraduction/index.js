import React from 'react';

/* Components */
import { Form } from 'semantic-ui-react';

const InputTraduction = ( props ) => {

    const { 
        translation, 
        editTraductionInputValue, 
        editTraductionValue, 
        editTraductionSubmit, 
        setTraductionEditId,
        setDisableEditButton
    } = props;

    const handdleEditTraductionSubmit = (e) => {
        e.preventDefault();
        editTraductionSubmit();
        setTraductionEditId(0);
        setDisableEditButton(false);
    };

    const handdleEditTraductionValue  = (e, translation) => {
        editTraductionInputValue({
            ...translation,
            translation: e.target.value,
        });
    };

    return (
        <div className="input-traduction">
            <Form onSubmit={handdleEditTraductionSubmit}>
                <Form.Input 
                type="text"
                value={editTraductionValue.translation !== "" ?  editTraductionValue.translation : translation.text }
                onChange={(e) => handdleEditTraductionValue(e, translation)}
                />
            </Form>
        </div>
    );
};

export default InputTraduction;