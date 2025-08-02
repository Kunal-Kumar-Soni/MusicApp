import { useEffect, useRef, useState } from "react";

function useVoiceRecognition(onResultCallback, onStartCallback) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!speechRecognition) {
      alert("Your browser does not support speech Recognition");
      return;
    }

    const recognition = new speechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      onStartCallback?.();
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResultCallback(transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResultCallback]);

  const startListening = () => {
    recognitionRef.current?.start();
  };
  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return { listening, startListening, stopListening };
}

export default useVoiceRecognition;
