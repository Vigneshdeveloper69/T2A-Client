import React, { useState } from "react";
import axios from "axios";
import "../styles/TextToAudio.css";

export default function TextToAudio() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [audioUrl, setAudioUrl] = useState(null);

  // Use Render backend URL when not localhost
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : "https://t2a-server.onrender.com";

  const handleTextUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText(res.data.text);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    }
  };

  const handleConvert = async () => {
    if (!text.trim()) {
      alert("Please enter some text before converting.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("lang", language);

    try {
      const res = await axios.post(`${BASE_URL}/api/tts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAudioUrl(res.data.audio_url);
    } catch (err) {
      console.error("Conversion error:", err.response?.data || err.message);
    }
  };

  const handleDownload = async () => {
    if (!audioUrl) return;

    try {
      const response = await axios.get(audioUrl, { responseType: "blob" });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName =
        (text.substring(0, 20).replace(/[^a-z0-9]/gi, "_") || "speech") + ".mp3";

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5 text-center" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Text to Audio</h2>

      <textarea
        className="form-control mb-3"
        rows={4}
        placeholder="Enter your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        className="form-control mb-3"
        accept="audio/wav,audio/*"
        onChange={handleTextUpload}
      />

      <select
        className="form-select mb-3"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ta">Tamil</option>
        <option value="hi">Hindi</option>
      </select>

      <button className="btn btn-primary mb-3" onClick={handleConvert}>
        Convert
      </button>

      {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
          <br />
          <button className="btn btn-success mt-3" onClick={handleDownload}>
            Download
          </button>
        </div>
      )}
    </div>
  );
}
