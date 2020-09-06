import React from "react";
import { Card, Icon } from "semantic-ui-react";
import AudioPlayer from "../../../containers/Audio";
import "./audioPlayerRecording.scss";

const Audio = ({
  audio,
  recordedSound,
  recording,
  startRecording,
  stopRecording,
  traductionId
}) => {
  if (audio) {
    fetch(audio)
      .then(blobContainer => blobContainer.blob())
      .then(blob => {
        console.log(blob);
      });
  }

  return recordedSound ? (
    <AudioPlayer audio={recordedSound} />
  ) : (
    <Card.Content className="audioRecorder  recordingAudioRecorder">
      <div className="audioRecorder-player">
        {!recording && (
          <>
            <Icon
              circular
              className="audioRecorder-player_mic"
              onClick={startRecording}
              name="microphone"
              disabled={traductionId ? false : true}
            />
            <div className="noAudio">Record</div>
          </>
        )}

        {recording && (
          <>
            <Icon
              circular
              className="audioRecorder-player_mic"
              onClick={stopRecording}
              name={"stop"}
            />
            <div className="loader-container">
              <div className="rectangle-1"></div>
              <div className="rectangle-2"></div>
              <div className="rectangle-3"></div>
              <div className="rectangle-4"></div>
              <div className="rectangle-5"></div>
              <div className="rectangle-6"></div>
              <div className="rectangle-5"></div>
              <div className="rectangle-4"></div>
              <div className="rectangle-3"></div>
              <div className="rectangle-2"></div>
              <div className="rectangle-1"></div>
            </div>
          </>
        )}
      </div>
    </Card.Content>
  );
};

export default Audio;
