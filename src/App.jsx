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

const education = [
  {
    credential: "Bachelor's in Information Technology (Software Engineering)",
    school: "SEGi University Kota Damansara",
    date: "2024 - 2026",
    detail: "CGPA 3.79. Project leader for PAWS Charity Fundraiser, raising RM500 for SPCA Selangor.",
  },
  {
    credential: "Diploma in Information Technology",
    school: "SEGi College Kota Damansara",
    date: "2021 - 2023",
    detail: "CGPA 3.62 with a foundation in software development, databases, and IT systems.",
  },
];

const certificates = [
  "Software Engineering",
  "AI and computer vision projects",
  "Workflow automation and LLM integration",
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

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/calven-chow-kai-wen-03703727a/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    href: "https://github.com/Calven0914",
    icon: "github",
  },
];

function SocialIcon({ type }) {
  if (type === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.68.5.1.68-.22.68-.49v-1.82c-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92v2.84c0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.38 8.95h3.4V20h-3.4V8.95ZM7.08 4a1.98 1.98 0 1 1 0 3.96A1.98 1.98 0 0 1 7.08 4Zm3.85 4.95h3.26v1.51h.05c.45-.86 1.57-1.77 3.23-1.77 3.46 0 4.1 2.28 4.1 5.24V20h-3.4v-5.37c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V20h-3.4V8.95Z" />
    </svg>
  );
}

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
      gsap.from(
        ".hero-kicker, .hero-intro, .hero-title span, .hero-copy, .hero-actions, .profile-visual, .hero-meta",
        {
          y: 44,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

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
          <a href="#education">Education</a>
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
            <div className="mesh-line line-one" />
            <div className="mesh-line line-two" />
          </div>

          <div className="hero-content">
            <p className="hero-kicker">Software Developer | AI Automation | QA</p>
            <p className="hero-intro">Hi, I'm Calven Chow Kai Wen.</p>
            <h1 className="hero-title">
              <span>I build</span>
              <span>intelligent software.</span>
            </h1>
            <p className="hero-copy">
              Fresh IT graduate with a 3.79 CGPA, hands-on experience in AI-powered
              applications, workflow automation, REST APIs, databases, and software
              quality. Based in Malaysia and ready for software developer roles.
            </p>
            <div className="hero-actions">
              <a className="button dark" href="#projects">View work</a>
              <a className="button light" href="#contact">Contact me</a>
              <div className="social-links" aria-label="Social links">
                {socials.map((social) => (
                  <a
                    className="social-link"
                    href={social.href}
                    key={social.name}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                  >
                    <SocialIcon type={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside className="profile-visual" aria-label="Calven profile preview">
            <div className="profile-orbit" aria-hidden="true" />
            <div className="profile-card">
              <div className="profile-image">
                <span>CC</span>
              </div>
              <div className="profile-card-copy">
                <p>Available for software developer roles</p>
                <strong>AI apps, automation, backend systems, QA</strong>
              </div>
            </div>
          </aside>

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

        <section id="education" className="education-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Education & credentials</p>
            <h2>Academic foundation with practical proof.</h2>
          </div>
          <div className="education-layout">
            <div className="education-list">
              {education.map((item) => (
                <article className="education-card reveal" key={item.credential}>
                  <span>{item.date}</span>
                  <h3>{item.credential}</h3>
                  <p className="school-name">{item.school}</p>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <aside className="certificate-panel reveal">
              <p className="panel-label">LinkedIn profile focus</p>
              <h3>Certificates and updates can live here.</h3>
              <div className="certificate-tags">
                {certificates.map((certificate) => (
                  <span key={certificate}>{certificate}</span>
                ))}
              </div>
              <a
                className="inline-social"
                href="https://www.linkedin.com/in/calven-chow-kai-wen-03703727a/"
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon type="linkedin" />
                View LinkedIn profile
              </a>
            </aside>
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
            <h2>Let's build something useful.</h2>
            <p>
              I'm looking for software developer opportunities where I can contribute
              across backend systems, automation, AI-assisted workflows, and clean user
              interfaces.
            </p>
            <a href="mailto:calvenc0914@gmail.com">calvenc0914@gmail.com</a>
            <div className="contact-socials" aria-label="Social links">
              {socials.map((social) => (
                <a
                  className="social-link"
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
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


