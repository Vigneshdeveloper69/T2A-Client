import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/About.css"; // Make sure this exists

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container mt-5 about-wrapper">
      <h1 className="text-center fw-bold mb-4 animate__animated animate__fadeInDown">
        About <span className="text-primary">T2A</span>
      </h1>

      {/* T2A Info */}
      <section className="mb-5" data-aos="fade-up">
        <p className="lead text-muted text-center">
          T2A (Text-to-Audio / Audio-to-Text) is an intelligent web application built using React and Bootstrap to provide a seamless and real-time voice-text conversion experience.
        </p>
        <div className="row mt-4 text-center">
          <div className="col-md-4" data-aos="fade-right">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="fw-bold">Smart Conversion</h5>
                <p>Supports both text-to-speech and speech-to-text using reliable AI engines.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4" data-aos="zoom-in">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="fw-bold">User Friendly</h5>
                <p>Modern UI/UX with animations and responsiveness for all screen sizes.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-left">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="fw-bold">Performance</h5>
                <p>Fast execution and low-latency response with scalable architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="mt-5" data-aos="fade-up">
        <h2 className="fw-bold text-center mb-4">Meet the Developer</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-3 text-center">
              <img
  src="/images/developer.jpeg"
  alt="Developer"
  className="img-fluid rounded-circle mb-3 mx-auto d-block"
  style={{ maxWidth: "150px" }}
/>

              <h5 className="fw-bold">Vignesh</h5>
              <p className="text-muted mb-2">Full Stack Developer | AI Enthusiast</p>
              <p className="small">
                A passionate developer dedicated to building intelligent web systems and mobile solutions. Experienced in Java, React, Firebase, Python, and machine learning integrations.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-2">
                <a href="https://github.com/Vigneshdeveloper69" target="_blank" rel="noopener noreferrer" className="text-dark">
                  <i className="bi bi-github fs-4"></i>
                </a>
                <a href="https://www.linkedin.com/in/vignesh-m-4b9aa1282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-primary">
                  <i className="bi bi-linkedin fs-4"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
