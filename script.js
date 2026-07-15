gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".step-card");

gsap.set(cards, {
  yPercent: 70,
  autoAlpha: 0,
  rotate: 3,
});

gsap.set(cards[0], {
  yPercent: -50,
  autoAlpha: 1,
  rotate: 0,
});

const flowTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-stage",
    start: "top top",
    end: "+=2600",
    scrub: 0.7,
    pin: true,
    anticipatePin: 1,
  },
});

flowTimeline
  .to(".progress-bar", { scaleX: 1, ease: "none", duration: 1 }, 0)
  .to(cards[0], { yPercent: -170, autoAlpha: 0, rotate: -4, duration: 0.32 }, 0.18)
  .to(cards[1], { yPercent: -50, autoAlpha: 1, rotate: 0, duration: 0.34 }, 0.27)
  .to(cards[1], { yPercent: -170, autoAlpha: 0, rotate: -4, duration: 0.32 }, 0.56)
  .to(cards[2], { yPercent: -50, autoAlpha: 1, rotate: 0, duration: 0.34 }, 0.66);

gsap.from(".hero-copy > *", {
  y: 28,
  autoAlpha: 0,
  stagger: 0.08,
  duration: 0.75,
  ease: "power3.out",
});

gsap.from(".hero-visual", {
  y: 40,
  autoAlpha: 0,
  scale: 0.96,
  duration: 0.9,
  ease: "power3.out",
});

gsap.utils.toArray(".status-card, .deploy-grid article").forEach((item) => {
  gsap.from(item, {
    y: 42,
    autoAlpha: 0,
    duration: 0.65,
    ease: "power3.out",
    scrollTrigger: {
      trigger: item,
      start: "top 82%",
    },
  });
});

async function loadSupabaseStatus() {
  const dot = document.querySelector("[data-status-dot]");
  const label = document.querySelector("[data-status-label]");
  const detail = document.querySelector("[data-status-detail]");

  try {
    const response = await fetch("/api/env");
    const config = response.ok ? await response.json() : {};

    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      dot.classList.add("is-error");
      label.textContent = "Supabase env vars are not configured yet.";
      detail.innerHTML =
        "Set <code>SUPABASE_URL</code> and <code>SUPABASE_ANON_KEY</code> in Vercel, then redeploy.";
      return;
    }

    const { createClient } = await import(
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
    );

    createClient(config.supabaseUrl, config.supabaseAnonKey);
    dot.classList.add("is-ready");
    label.textContent = "Supabase browser client is ready.";
    detail.textContent =
      "Public configuration loaded from the Vercel API route and the client initialized successfully.";
  } catch (error) {
    dot.classList.add("is-error");
    label.textContent = "Could not complete the Supabase check.";
    detail.textContent = error instanceof Error ? error.message : "Unknown error.";
  }
}

loadSupabaseStatus();
