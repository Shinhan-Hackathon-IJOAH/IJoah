import React, { useState, useCallback } from "react";
import { useDiaryStore } from "../../store/DiaryStore";
const AudioRecord = () => {
  const { voice,setVoice } = useDiaryStore();

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
    const audioCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
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

  // const onSubmitAudioFile = useCallback(() => {
  //   if (audioUrl) {
  //     console.log(URL.createObjectURL(audioUrl));
  //   }
  //   if (audioUrl instanceof Blob) {
  //     const sound = new File([audioUrl], "녹음파일", {
  //       lastModified: new Date().getTime(),
  //       type: "audio/mpeg",
  //     });
  //     // 폼데이터 객체 생성 -> append로 file 객체 추가
  //     // const formData = new FormData();
  //     // formData.append("file", sound);

  //     console.log(voice)
  //     console.log(sound)
  //     setVoice({payload:sound})
      
  //   }
  // }, [audioUrl]);
  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl));
      // 파일 URL을 스토어에 저장
      setVoice(URL.createObjectURL(audioUrl));
    }
  }, [audioUrl]);

  const play = () => { 
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl));
    }
    if (audioUrl instanceof Blob) {
      const playRecord = new Audio(URL.createObjectURL(audioUrl)); // Audio 객체를 사용하여 오디오를 재생
      playRecord.volume = 1;
      playRecord.play();
      console.log(playRecord);
    }
  };

  return (
    <>
{voice}
      <button onClick={onRec ? onRecAudio : offRecAudio}>
        {onRec ? "녹음 시작" : "녹음 중지"}
      </button>

    <button onClick={play}>녹음한거 듣기</button>


      <button onClick={onSubmitAudioFile}>녹음 파일 등록하기</button>
    </>
  );
};

export default AudioRecord;
