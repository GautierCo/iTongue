import React from "react";
import { Card, Image } from "semantic-ui-react";
// import './TranslationLabel.scss';

const TranslationLabel = ({ translation }, index) => (
    <Card.Content className="recording-widget__text-selected">
        <Image
            src={`https://www.countryflags.io/${translation.language.code}/flat/32.png`}
            className="flag_image"
        />
        <div className="recording-widget__text-selected-text">{translation.text}</div>
        {translation.language.code === "gb" && <div className="separator"></div>}
    </Card.Content>
);

export default TranslationLabel;
