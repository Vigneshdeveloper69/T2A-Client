import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/AudioToText.css";

export default function AudioToText() {
  const [audioFile, setAudioFile] = useState(null);
  const [convertedText, setConvertedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [errorText, setErrorText] = useState("");
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  const handleFileUpload = (e) => {
    setAudioFile(e.target.files[0]);
    setConvertedText("");
    setErrorText("");
  };

  const handleConvert = async () => {
    if (!audioFile) return;
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const res = await axios.post("https://t2a-server.onrender.com/api/audio-to-text", formData);
      setConvertedText(res.data.text);
      setErrorText(""); // Clear error if successful
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Conversion failed. Please try again.";
      setConvertedText(""); // Clear success text if failed
      setErrorText(errMsg);
    }
  };

  const handleDownloadText = (text, filename = "converted_text.txt") => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCopyText = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy.");
      });
  };

  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      recordedChunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "audio/mp3" });
        const file = new File([blob], "recorded_audio.mp3", { type: "audio/mp3" });
        setAudioFile(file);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center flex-column text-center" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 fw-bold">🎤.wav Audio to Text</h2>

      <input
        className="form-control mb-3"
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
      />

      <button className={`btn ${isRecording ? "btn-danger" : "btn-warning"} mb-3`} onClick={handleRecord}>
        {isRecording ? "⏹️ Stop Recording" : "🎙️ Record Audio"}
      </button>

      <button className="btn btn-primary mb-4" onClick={handleConvert} disabled={!audioFile}>
        🔄 Convert
      </button>

      {convertedText && (
        <div className="w-100 text-start bg-light border rounded p-3 mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
          <h5 className="fw-semibold mb-2">📝 Converted Text:</h5>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{convertedText}</pre>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-success" onClick={() => handleDownloadText(convertedText)}>
              ⬇️ Download as .txt
            </button>
            <button className="btn btn-secondary" onClick={() => handleCopyText(convertedText)}>
              📋 Copy Text
            </button>
          </div>
        </div>
      )}

      {errorText && (
        <div className="w-100 text-start bg-danger-subtle border border-danger rounded p-3 mb-3 text-danger-emphasis" style={{ maxHeight: "300px", overflowY: "auto" }}>
          <h5 className="fw-semibold mb-2">❌ Conversion Failed:</h5>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{errorText}</pre>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-danger" onClick={() => handleDownloadText(errorText, "conversion_error.txt")}>
              ⬇️ Download Error as .txt
            </button>
            <button className="btn btn-outline-secondary" onClick={() => handleCopyText(errorText)}>
              📋 Copy Error
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
