//start of new code
import { useEffect, useState } from "react";
// end of the new code

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import useSpeechSynthesis from "./useSpeechSynthesis";

function App() {
  const {
    transcript,
    listening,
    //start of new code
    finalTranscript,
    // end of the new code
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { speak, voices } = useSpeechSynthesis();

  //start of new code

  const [bgColor, setBgColor] = useState("white");

  const changeBGColor = (color) => {
    speak({
      text: `changing background to ${color}`,
      voice: voices[7],
    });
  };

  // end of the new code

  useEffect(() => {
    if (finalTranscript) {
      if (finalTranscript === "can you hear me") {
        speak({
          text: "yes, I can , and congratulations for your first voice assistant app",
          voice: voices[7],
        });
        console.log({ finalTranscript });
      }
      //start of new code
      else if (
        finalTranscript === "change the background to red"
      ) {
        changeBGColor("red");
        setBgColor("red");
      } else if (
        finalTranscript === "change the background to White" ||
        finalTranscript === "change the background to white"
      ) {
        changeBGColor("white");
        setBgColor("white");
      }
      // end of the new code
      else {
        console.log("i don't understand");
        speak({
          text: "i don't understand",
          voice: voices[7],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalTranscript]);
  if (!browserSupportsSpeechRecognition) {
    return (
      <span>Browser doesn't support speech recognition.</span>
    );
  }

  const commonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div
      style={{
        ...commonStyle,
        flexDirection: "column",
        height: "100vh",
        background: bgColor,
      }}
    >
      <p>Microphone: {listening ? "on" : "off"}</p>
      <div
        style={{
          ...commonStyle,
        }}
      >
        <button onClick={SpeechRecognition.startListening}>
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>
          Stop
        </button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <p>{transcript}</p>
    </div>
  );
}

export default App;
