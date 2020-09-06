import React, { useState } from "react";
import AudioPlayer from "../../../containers/AudioPlayerRecording";
import AudioRecorder from "audio-recorder-polyfill";
import mpegEncoder from "audio-recorder-polyfill/mpeg-encoder";

AudioRecorder.encoder = mpegEncoder;
AudioRecorder.prototype.mimeType = "audio/mpeg";
window.MediaRecorder = AudioRecorder;

const ReactMicComponent = ({ setRecordedSound, recordedSound, traductionId }) => {
    // const [micLoading, setMicLoading] = useState(true);
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    const startRecording = async () => {
        console.log("about to record some sound");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const rcd = new MediaRecorder(stream);
        rcd.addEventListener("dataavailable", (e) => {
            setRecordedSound(URL.createObjectURL(e.data));
        });

        rcd.start();
        setRecording(true);
        setRecorder(rcd);
    };

    const stopRecording = () => {
        if (recorder) {
            // Stop recording
            recorder.stop();
            setRecording(false);

            // Remove “recording” icon from browser tab
            recorder.stream.getTracks().forEach((i) => i.stop());
        }
    };
    // const linkAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    return (
        <div className="reactMicComponent">
            <AudioPlayer
                audio={recordedSound}
                recording={recording}
                recordedSound={recordedSound}
                startRecording={startRecording}
                stopRecording={stopRecording}
                traductionId={traductionId}
            />
        </div>
    );
};

export default ReactMicComponent;
