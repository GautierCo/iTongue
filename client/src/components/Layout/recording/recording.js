import React, { useState, useEffect } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { motion } from "framer-motion";

import ReactMicComponent from "./reactMicComponent";
import AccordionTranslation from "./accordionTranslation";
// import TranslationDropdown from "./translationDropdown";
import TranslationLabel from "./tranlationLabel";
import "./recording.scss";

const Recording = ({
  audio,
  toggleRecording,
  sendIrecordsRecorded,
  loading,
  selectIrecordToRecord,
  setTranslationId,
  fetchAllExpressions,
  allExpressions,
  taughtLanguages,
  learnedLanguages,
  traductionId
}) => {
  const [recordedSound, setRecordedSound] = useState(null);

  useEffect(() => {
    fetchAllExpressions();
  }, [fetchAllExpressions]);

  const onSave = () => {
    if (recordedSound) {
      sendIrecordsRecorded(recordedSound);
    }
    toggleRecording(false);
    setTranslationId(null);
  };

  const handleClose = () => {
    selectIrecordToRecord(null);
    toggleRecording(false);
    setTranslationId(null);
  };

  const handleReset = () => {
    setRecordedSound(null);
    // selectIrecordToRecord(null);
    // if (expressionSelected || translationSelected) {
    // setExpressionSelected(null);
    // seTranslationSelected(null);
    // }
  };

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Card
        id="recording-widget"
        // className={`${
        //     audio ? "recording-copy" : "recording-selecting"
        // } recording-widget`}
        className={`${
          audio && audio.englishTranslation.id !== audio.translation.id
            ? "recording-copy"
            : audio && audio.englishTranslation.id === audio.translation.id
            ? "recording-copy-sameLanguageExpression"
            : "recording-selecting"
        }`}
      >
        <Card.Meta className="recording-widget__closeIcon">
          <Icon
            onClick={handleClose}
            className="recording-widget__closeIcon_item"
            name="close"
            corner="top right"
          />
        </Card.Meta>
        {audio && (
          <div>
            {audio.englishTranslation.id !== audio.translation.id && (
              <TranslationLabel translation={audio.englishTranslation} />
            )}

            <TranslationLabel translation={audio.translation} />
          </div>
        )}

        {!audio && (
          <div className="container-dropdown">
            {allExpressions && (
              <AccordionTranslation
                allExpressions={allExpressions}
                taughtLanguages={taughtLanguages}
                learnedLanguages={learnedLanguages}
                setTranslationId={setTranslationId}
                traductionId={traductionId}
              />
            )}
          </div>
        )}
        <Card.Content>
          <ReactMicComponent
            recordedSound={recordedSound}
            setRecordedSound={setRecordedSound}
            traductionId={traductionId}
          />
        </Card.Content>

        <Card.Content extra>
          <div className="ui two buttons">
            {recordedSound && (
              <Button onClick={handleReset} className="recording-widget__cancel-btn" basic>
                <Icon name="refresh" />
              </Button>
            )}

            <Button
              disabled={recordedSound ? false : true}
              onClick={onSave}
              basic
              loading={loading}
              className="recording-widget__save-btn"
            >
              Sauvegarder
            </Button>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
};

export default Recording;

// <TranslationDropdown
//                     options={optionsText}
//                     value={expressionSelected}
//                     onChange={handleChangeExpression}
//                 />
//                 <TranslationDropdown
//                     options={translationsSelected && translationsSelected}
//                     value={translationSelected && translationSelected}
//                     onChange={handleChangeTranslation}
//                 />
