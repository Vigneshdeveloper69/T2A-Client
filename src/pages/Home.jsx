import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Home.css"; // Make sure this file exists
import { useNavigate } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  const navigate = useNavigate();

  const features = [
    {
      title: "Effortless Transcription for Everyone",
      text: "Whether you're a student recording lectures, a journalist capturing interviews, or a business professional documenting meetings — our tool provides fast, accurate audio-to-text conversion without manual effort.",
    },
    {
      title: "Boost Productivity with Automated Workflows",
      text: "Free yourself from hours of typing. Convert voice memos, podcasts, or conference calls into editable text to streamline note-taking, content creation, and reporting tasks.",
    },
    {
      title: "Empowering Accessibility & Inclusion",
      text: "Designed with accessibility in mind, this tool helps the hearing-impaired, non-native speakers, and fast-paced learners by turning spoken content into readable, shareable formats.",
    }
  ];

  return (
    <div className="container text-center mt-5 home-wrapper">
      {/* Title & Subtitle */}
      <h1 className="display-4 mb-3 fw-bold animate__animated animate__fadeInDown">
        Welcome to <span className="text-primary">T2A</span>
      </h1>
      <p className="lead text-secondary mb-4 animate__animated animate__fadeInUp">
        Your smart solution for converting text to speech and speech to text.
      </p>

      {/* Image */}
      <div className="mb-4" data-aos="zoom-in">
        <img
          src="public/images/text-to-speech.png"
          alt="Voice AI"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "280px" }}
        />
      </div>

      {/* CTA Button */}
      <button
        className="btn btn-lg btn-primary px-5 py-3 fw-semibold shadow animated-button"
        onClick={() => navigate("/text-to-audio")}
        data-aos="fade-up"
      >
        Convert Text to Audio
      </button>

      {/* Feature Section */}
      <section className="mt-5 pb-5">
        <h2 className="fw-bold mb-4">Why Choose T2A?</h2>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div
              className="col-md-4 d-flex"
              data-aos="fade-up"
              data-aos-delay={index * 150}
              key={index}
            >
              <div className="card flex-fill d-flex flex-column shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="card-title fw-bold" style={{ fontWeight: 700 }}>
                    {feature.title}
                  </h5>
                  <p className="card-text">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
