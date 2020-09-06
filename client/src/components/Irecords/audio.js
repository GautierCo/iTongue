import React, { useRef, useState, useEffect } from "react";
import { Card, Icon, Progress } from "semantic-ui-react";
import "./audio.scss";

const Audio = ({ irecordSelectedId, setIrecordSelectedId, audio }) => {
  const { id } = audio;

  if (!audio.url) {
    fetch(audio)
      .then(blobContainer => blobContainer.blob())
      .then(blob => {
        console.log(blob);
      });
  }

  const audioRef = useRef(null);
  const progress = useRef(null);

  const [audioReady, setAudioReady] = useState(false);
  const [percent, setPercent] = useState(0);

  const [playing, setPlaying] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const togglePlaying = () => {
    setPlaying(!playing);

    if (!playing) {
      audioRef.current.play();
      setIrecordSelectedId(id);
    } else {
      audioRef.current.pause();
    }
  };

  const scrub = e => {
    if ("duration" in audioRef.current && "currentTime" in audioRef.current) {
      const scrubTime =
        (e.nativeEvent.offsetX / progress.current.offsetWidth) * audioRef.current.duration;
      audioRef.current.currentTime = scrubTime;
    }
  };

  const handleStop = () => {
    audioRef.current.currentTime = 0.0;
    setPlaying(false);
    audioRef.current.pause();
  };

  useEffect(() => {
    if (irecordSelectedId !== id) {
      setPlaying(false);
      audioRef.current.pause();
    }
  }, [irecordSelectedId, id]);

  useEffect(() => {
    audioRef.current.load();
  }, []);

  const padZero = v => {
    return v < 10 ? "0" + v : v;
  };

  const padMs = ms => {
    if (ms < 10) return "00" + ms;
    if (ms < 100) return "0" + ms;
    return ms;
  };

  const sToTime = t => {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    const ms = Math.round(1000 * (t % 1));
    return padZero(min) + ":" + padZero(sec) + ":" + padMs(ms);
  };

  const handleAudioReady = () => {
    if (audioRef.current.duration > 0 && audioRef.current.duration !== Infinity) {
      setAudioReady(true);
    } else {
      audioRef.current.addEventListener("durationChange", () => {
        if (audioRef.current.duration > 0 && audioRef.current.duration !== Infinity) {
          setAudioReady(true);
        }
      });
    }
  };

  return (
    <>
      {audioReady && (
        <Card.Content className="audioRecorder">
          <div className="audioRecorder-player">
            <button className="audioRecorder-btn stopBtn" onClick={handleStop}>
              <div className="audioRecorder-btn__icon audioRecorder-btn__icon--stop"></div>
            </button>

            <button className="audioRecorder-btn stopBtn" onClick={togglePlaying}>
              <div
                className={
                  "audioRecorder-btn__icon audioRecorder-btn__icon--" + (playing ? "pause" : "play")
                }
              ></div>
            </button>

            <div
              className="audioRecorder-player_progress"
              style={{ cursor: "ew-resize", width: "75%" }}
              ref={progress}
              onClick={scrub}
              onMouseMove={e => mouseDown && scrub(e)}
              onMouseUp={() => setMouseDown(false)}
              onMouseDown={() => setMouseDown(true)}
            >
              <Progress percent={percent} className={playing ? "orange" : null} />
              <div className="audioRecorder-player_time">
                <p className="played">{sToTime(audioRef.current.currentTime)}</p>
                <p className="total">{sToTime(audioRef.current.duration)}</p>
              </div>
            </div>
          </div>
        </Card.Content>
      )}
      <audio
        id={id}
        ref={audioRef}
        type="audio/mpeg"
        src={audio.url ? `${process.env.REACT_APP_FILES_URL}/${audio.url}` : audio}
        onCanPlayThrough={handleAudioReady}
        onTimeUpdate={() => {
          setPercent((100 * audioRef.current.currentTime) / audioRef.current.duration);
        }}
      />
    </>
  );
};

export default Audio;
