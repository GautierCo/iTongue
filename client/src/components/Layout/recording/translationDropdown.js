import React from "react";
import { Card, Dropdown } from "semantic-ui-react";

// import './translationDropdown.scss';

const TranslationDropdown = ({ options, value, onChange }) => (
    <Card.Content>
        <Dropdown
            style={{ width: "100%" }}
            selection
            placeholder="Sélectionner une expression"
            name="expressions"
            options={options}
            value={value}
            onChange={onChange}
        />
    </Card.Content>
);

export default TranslationDropdown;
