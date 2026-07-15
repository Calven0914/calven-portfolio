import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    title: "AI-Powered Cafe Analytics",
    stack: "Python, Flask, YOLOv8, ByteTrack, SQL",
    metric: "40%",
    metricLabel: "accuracy improvement",
    body: "Trained a real-time object detection and tracking system that turns camera footage into customer flow, dwell time, peak hour, and heatmap insights.",
  },
  {
    index: "02",
    title: "Personal AI Job Search Agent",
    stack: "N8N, Gemini, APIs, workflow automation",
    metric: "AI",
    metricLabel: "matching pipeline",
    body: "Built an automation agent that aggregates job listings, scores them against a resume, and is being extended into tailored resume and cover letter generation.",
  },
  {
    index: "03",
    title: "Employee Management System",
    stack: "C#, .NET, SQL",
    metric: "CRUD",
    metricLabel: "role-based system",
    body: "Developed secure authentication, role-based access, employee record management, salary calculation, and printable earning reports.",
  },
];

const experiences = [
  {
    role: "Quality Assurance Intern",
    company: "BASS Sdn Bhd",
    date: "May 2025 - Aug 2025",
    detail:
      "Automated HRM module testing with Ranorex, reducing manual test effort by 25% while supporting regression testing, defect validation, and root-cause analysis.",
  },
  {
    role: "Information Technology Intern",
    company: "Universiti Malaya",
    date: "Sept 2023 - Nov 2023",
    detail:
      "Optimized REST API workflows, built Laravel and SQL solutions, and created 20+ reports and dashboards to improve decision-making speed.",
  },
];

const skills = [
  "Java",
  "Python",
  "C#",
  "React",
  "Laravel",
  "Spring Boot",
  "REST APIs",
  "SQL",
  "Supabase",
  "YOLO",
  "OpenCV",
  "N8N",
  "LLM Integration",
  "CI/CD",
  "Agile",
];

function App() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const [formState, setFormState] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  function handleHeroPointerMove(event) {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5).toFixed(3);
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5).toFixed(3);

    hero.style.setProperty("--mouse-x", x);
    hero.style.setProperty("--mouse-y", y);
    hero.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    hero.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".hero-kicker, .hero-title span, .hero-copy, .hero-actions, .hero-meta", {
        y: 44,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to(".mesh-ring", {
        rotate: 360,
        duration: 42,
        repeat: -1,
        ease: "none",
      });

      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-pin",
          start: "top top",
          end: "+=3600",
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
        },
      });

      storyTimeline
        .to(".story-progress", { scaleX: 1, ease: "none", duration: 1 }, 0)
        .fromTo(
          ".chapter-1",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.22 },
          0.03,
        )
        .to(".chapter-1", { yPercent: -110, autoAlpha: 0, duration: 0.18 }, 0.28)
        .fromTo(
          ".chapter-2",
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.22 },
          0.32,
        )
        .to(".chapter-2", { yPercent: -110, autoAlpha: 0, duration: 0.18 }, 0.57)
        .fromTo(
          ".chapter-3",
          { scale: 0.86, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.24 },
          0.62,
        )
        .to(".chapter-number", { textContent: 3, snap: { textContent: 1 }, duration: 1 }, 0);

      gsap.utils.toArray(".reveal").forEach((item) => {
        gsap.from(item, {
          y: 56,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray(".project-card").forEach((card, index) => {
        gsap.from(card, {
          xPercent: index % 2 === 0 ? -8 : 8,
          y: 42,
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
          },
        });
      });

      gsap.to(".skill-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".skills-marquee",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormState("sending");
    setFormMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "The message could not be sent.");
      }

      event.currentTarget.reset();
      setFormState("sent");
      setFormMessage("Message saved. Thanks for reaching out.");
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="site" ref={rootRef}>
      <header className="nav">
        <nav aria-label="Primary navigation">
          <a href="#top">Home</a>
          <a href="#story">Story</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" ref={heroRef} onPointerMove={handleHeroPointerMove}>
          <div className="hero-interactive" aria-hidden="true">
            <div className="cursor-light" />
            <div className="mesh-ring ring-one" />
            <div className="mesh-ring ring-two" />
            <div className="mesh-core">
              <span>AI</span>
              <span>API</span>
              <span>QA</span>
            </div>
            <div className="mesh-line line-one" />
            <div className="mesh-line line-two" />
          </div>

          <div className="hero-content">
            <p className="hero-kicker">Software Developer | AI Automation | QA</p>
            <h1 className="hero-title">
              <span>Systems</span>
              <span>that think.</span>
            </h1>
            <p className="hero-copy">
              Fresh IT graduate with a 3.79 CGPA, hands-on experience in AI-powered
              applications, workflow automation, REST APIs, databases, and software
              quality. Based in Malaysia and ready for software developer roles.
            </p>
            <div className="hero-actions">
              <a className="button dark" href="#projects">View work</a>
              <a className="button light" href="#contact">Contact me</a>
            </div>
          </div>

          <div className="hero-meta" aria-label="Profile highlights">
            <span>YOLOv8 + ByteTrack</span>
            <span>25% QA effort saved</span>
            <span>20+ dashboards</span>
          </div>
        </section>

        <section id="story" className="story-pin" aria-label="Pinned profile story">
          <div className="story-meta">
            <p className="eyebrow">Profile sequence</p>
            <span className="chapter-number">1</span>
            <div className="story-progress-shell">
              <div className="story-progress" />
            </div>
          </div>

          <div className="chapter chapter-1">
            <p className="chapter-label">Chapter 01</p>
            <h2>From data problems to working products.</h2>
            <p>
              I like turning messy operational problems into systems people can use:
              dashboards, validation flows, APIs, and automation that removes repeated
              work.
            </p>
          </div>

          <div className="chapter chapter-2">
            <p className="chapter-label">Chapter 02</p>
            <h2>Comfortable where software meets intelligence.</h2>
            <p>
              My strongest projects combine backend logic, databases, computer vision,
              and AI agents: YOLO tracking for cafe analytics and N8N workflows for job
              search automation.
            </p>
          </div>

          <div className="chapter chapter-3">
            <p className="chapter-label">Chapter 03</p>
            <h2>Quality-minded from the inside out.</h2>
            <p>
              QA experience taught me to think like a tester while building: regression
              risk, reusable scripts, defect clarity, and workflows that match business
              requirements.
            </p>
          </div>
        </section>

        <section className="experience-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Experience</p>
            <h2>Internships with practical delivery.</h2>
          </div>
          <div className="experience-list">
            {experiences.map((item) => (
              <article className="experience-item reveal" key={item.role}>
                <div>
                  <p>{item.date}</p>
                  <h3>{item.role}</h3>
                </div>
                <div>
                  <span>{item.company}</span>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected work</p>
            <h2>Projects with measurable behavior.</h2>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-index">{project.index}</div>
                <div className="project-main">
                  <p>{project.stack}</p>
                  <h3>{project.title}</h3>
                  <span>{project.body}</span>
                </div>
                <div className="project-metric">
                  <strong>{project.metric}</strong>
                  <span>{project.metricLabel}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" aria-label="Technical skills">
          <div className="section-heading reveal">
            <p className="eyebrow">Skill map</p>
            <h2>Backend, AI, automation, and product UI.</h2>
          </div>
          <div className="skills-marquee" aria-hidden="true">
            <div className="skill-track">
              {[...skills, ...skills].map((skill, index) => (
                <span key={`${skill}-${index}`}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-copy reveal">
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something useful.</h2>
            <p>
              I’m looking for software developer opportunities where I can contribute
              across backend systems, automation, AI-assisted workflows, and clean user
              interfaces.
            </p>
            <a href="mailto:calvenc0914@gmail.com">calvenc0914@gmail.com</a>
          </div>

          <form className="contact-form reveal" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" required />
            </label>
            <button type="submit" disabled={formState === "sending"}>
              {formState === "sending" ? "Sending..." : "Send message"}
            </button>
            {formMessage && <p className={`form-note ${formState}`}>{formMessage}</p>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
