import React, { useState, useCallback } from "react";

const AudioRecord = () => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [onRec, setOnRec] = useState<boolean>(true);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | undefined>(
    undefined
  );
  const [analyser, setAnalyser] = useState<ScriptProcessorNode | undefined>(
    undefined
  );
  const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true); // 😀😀😀
  

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream: MediaStream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          source?.disconnect();
          if (media) {
            media.ondataavailable = function (e) {
              setAudioUrl(e.data);
              setOnRec(true);
            };
          }
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    if (media) {
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);
        setOnRec(true);
      };
      stream?.getAudioTracks().forEach(function (track) {
        track.stop();
      });
      media.stop();
      analyser?.disconnect();
      source?.disconnect();
    }
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl));
    }
    if (audioUrl instanceof Blob) {
      const sound = new File([audioUrl], "soundBlob", {
        lastModified: new Date().getTime(),
        type: "audio/wav",
      });
      console.log(sound);
    }
  }, [audioUrl]);

  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>
        {onRec ? "녹음 시작" : "녹음 중지"}
      </button>
      <button onClick={onSubmitAudioFile}>결과 확인</button>
  
    </>
  );
};

export default AudioRecord;
