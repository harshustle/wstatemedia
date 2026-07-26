import React, { useState, useEffect } from "react";
import "./OfferPage.css";

const faqs = [
  {
    q: "Do you run Meta and Google ad campaigns for US real estate?",
    a: "Yes. We launch and scale Meta & Google ad campaigns engineered specifically for US real estate lead generation, targeting active buyers and investors.",
  },
  {
    q: "Can you build custom landing pages & funnels?",
    a: "Absolutely. We build high-converting acquisition funnels with floor plans, virtual tours, clear pricing transparency, and showing/site-visit CTAs.",
  },
  {
    q: "Do you provide AI lead qualification & SMS automation?",
    a: "Yes. We integrate 24/7 AI chatbots, SMS/CRM follow-up automation, and instant budget/timeline screening before leads reach your sales team.",
  },
  {
    q: "Who is this for?",
    a: "US & international real estate agents, brokers, luxury developers, wholesalers, and real estate growth teams.",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Free strategy call",
    desc: "We audit your current ads, offer, and funnel to find exactly where leads are leaking.",
  },
  {
    step: "02",
    title: "Creative blueprint",
    desc: "We map the hooks, angles, and offers proven to work in your specific real estate market.",
  },
  {
    step: "03",
    title: "AI-powered production",
    desc: "We produce 10–20 ad variations in days — reviewed and approved by a human strategist.",
  },
  {
    step: "04",
    title: "Launch, test, scale",
    desc: "We track performance weekly and ship new variants before your winners go stale.",
  },
];

const whyUsReasons = [
  {
    title: "One Integrated Growth System",
    desc: "Creatives, landing pages, ads, and automation — all under one team. No juggling five different vendors.",
  },
  {
    title: "Built for Real Estate",
    desc: "Every script, funnel, and campaign is designed for property buyers — not generic e-commerce or D2C brands.",
  },
  {
    title: "Content That Converts",
    desc: "Cinematic real-shoot ads and AI UGC videos engineered to stop the scroll and drive site visits.",
  },
  {
    title: "Landing Pages That Build Trust",
    desc: "High-converting pages with floor plans, pricing, visuals, and CTAs — because your landing page makes or breaks ad spend.",
  },
  {
    title: "AI Lead Qualification 24/7",
    desc: "SMS automation and AI chatbots screen budget, timeline, and intent before leads reach your sales team.",
  },
];

const calcServices = [
  { id: "shoot", label: "Cinematic Real Estate Video Production", unitPrice: 250, unit: "video", hasQty: true, max: 20, min: 3, defaultQty: 3 },
  { id: "ugc", label: "AI UGC Ad Videos", unitPrice: 150, unit: "video", hasQty: true, max: 20, min: 3, defaultQty: 3 },
  { id: "funnel", label: "High-Converting Acquisition Funnel", unitPrice: 450, unit: null, hasQty: false },
  { id: "landing", label: "High-Converting Custom Landing Page", unitPrice: 650, unit: null, hasQty: false, note: "Landing pages make or break ad spend — engineered for high-intent buyers." },
  { id: "chatbot", label: "AI Real Estate Buyer Chatbot", unitPrice: 350, unit: null, hasQty: false },
  { id: "wa", label: "SMS & CRM AI Lead Automation", unitPrice: 400, unit: null, hasQty: false },
  { id: "meta", label: "Meta & Google Ads Management", unitPrice: 850, unit: "/mo", hasQty: false },
];

const fixedPlans = [
  {
    name: "Starter",
    desc: "For real estate agents & small teams testing AI creative for the first time.",
    price: "$1,500",
    period: "/mo",
    billed: "Billed monthly • no long-term contract",
    popular: false,
    btnText: "Start With Starter",
    features: [
      "6 ad variations / month",
      "1 platform (Meta or Google)",
      "Bi-weekly strategy check-in",
      "Performance dashboard",
      "5-business-day turnaround",
    ],
  },
  {
    name: "Growth",
    desc: "For real estate businesses ready to scale ad spend on proven creative.",
    price: "$3,200",
    period: "/mo",
    billed: "Billed monthly • no long-term contract",
    popular: true,
    btnText: "Book Strategy Call",
    features: [
      "15 ad variations / month",
      "Multi-platform (Meta, Google, YouTube)",
      "Weekly optimization calls",
      "Dedicated performance strategist",
      "48-hour turnaround",
      "Structured A/B testing roadmap",
    ],
  },
  {
    name: "Enterprise / Custom",
    desc: "For developers & enterprise real estate teams scaling creative output across multiple properties.",
    price: "Custom",
    period: "",
    billed: "Pricing based on property volume",
    popular: false,
    btnText: "Talk to Sales",
    features: [
      "Unlimited project volume",
      "Custom performance reporting",
      "Priority production queue",
      "Dedicated account team",
      "Workflow & CRM integrations",
    ],
  },
];

const CALC_SHEET_URL = "https://script.google.com/macros/s/AKfycbxABRNpYSU6BJHLRJY1vE0ohMlCGNLjq6OuyECJEEZplZ4KfGebKe54_Ljrg-kJZRZy2w/exec";

function PricingCalculator() {
  const [selected, setSelected] = useState({});
  const [qty, setQty] = useState({ shoot: 3, ugc: 3 });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const changeQty = (id, delta) => {
    setQty(prev => {
      const svc = calcServices.find(s => s.id === id);
      const minQty = svc ? (svc.min || 1) : 1;
      const currentQty = prev[id] || (svc ? svc.defaultQty : 1) || 1;
      const maxQty = svc ? svc.max : 20;
      const next = Math.min(maxQty, Math.max(minQty, currentQty + delta));
      return { ...prev, [id]: next };
    });
  };

  const total = calcServices.reduce((sum, s) => {
    if (!selected[s.id]) return sum;
    const q = s.hasQty ? (qty[s.id] || 1) : 1;
    return sum + s.unitPrice * q;
  }, 0);

  const count = Object.values(selected).filter(Boolean).length;
  const discount = count >= 4 ? 0.20 : count >= 2 ? 0.10 : 0;
  const discounted = Math.round(total * (1 - discount));
  const saved = total - discounted;

  const fmt = (n) => "$" + n.toLocaleString("en-US");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (count === 0 || !name.trim() || !phone.trim()) return;
    setSubmitting(true);
    const selectedList = calcServices
      .filter(s => selected[s.id])
      .map(s => `${s.label}${s.hasQty ? ` ×${qty[s.id] || 1}` : ""}`);
    const payload = new URLSearchParams({
      name: name,
      phone: phone,
      service: selectedList.join(", "),
      budget: fmt(discounted),
      message: `Offer Page Calculator — ${count} service(s) selected`,
      source: "Offer Page Calculator",
    });
    try {
      await fetch(CALC_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
    } catch (_) { }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="pricing-box">
      <div className="pricing-tag">BUILD YOUR CUSTOM PACKAGE</div>
      <h2>Custom Calculator</h2>
      <p className="pricing-sub">
        Select only the services you want — the price updates instantly.
        {count >= 2 && <span className="calc-discount-note"> Bundle discount applied</span>}
      </p>

      <div className="calc-grid">
        <div className="calc-services">
          {calcServices.map((svc) => (
            <div
              key={svc.id}
              className={`calc-row${selected[svc.id] ? " calc-row--active" : ""}`}
              onClick={() => toggle(svc.id)}
            >
              <div className="calc-check">
                {selected[svc.id] ? "✓" : ""}
              </div>
              <div className="calc-info">
                <div className="calc-label">{svc.label}</div>
                {svc.note && <div className="calc-note">{svc.note}</div>}
                <div className="calc-price-tag">
                  {fmt(svc.unitPrice)}{svc.unit ? ` / ${svc.unit}` : ""}
                </div>
              </div>
              {svc.hasQty && selected[svc.id] && (
                <div className="calc-qty" onClick={e => e.stopPropagation()}>
                  <button onClick={() => changeQty(svc.id, -1)}>−</button>
                  <span>{qty[svc.id] || 1}</span>
                  <button onClick={() => changeQty(svc.id, +1)}>+</button>
                </div>
              )}
              {!svc.hasQty && selected[svc.id] && (
                <div className="calc-subtotal">{fmt(svc.unitPrice)}</div>
              )}
              {svc.hasQty && selected[svc.id] && (
                <div className="calc-subtotal">{fmt(svc.unitPrice * (qty[svc.id] || 1))}</div>
              )}
            </div>
          ))}
        </div>

        <div className="calc-card">
          <div className="calc-card-title">YOUR ESTIMATE</div>

          {count === 0 ? (
            <div className="calc-empty">← Select services to see price</div>
          ) : (
            <>
              {discount > 0 && (
                <div className="calc-original">{fmt(total)}</div>
              )}
              <div className="calc-total">{fmt(discounted)}</div>
              {discount > 0 && (
                <div className="calc-saved">You save {fmt(saved)} ({Math.round(discount * 100)}% bundle discount)</div>
              )}
              <div className="calc-breakdown">
                {calcServices.filter(s => selected[s.id]).map(s => (
                  <div className="calc-line" key={s.id}>
                    <span>{s.label}{s.hasQty ? ` ×${qty[s.id] || 1}` : ""}</span>
                    <span>{fmt(s.unitPrice * (s.hasQty ? (qty[s.id] || 1) : 1))}</span>
                  </div>
                ))}
                {discount > 0 && (
                  <div className="calc-line calc-line--discount">
                    <span>Bundle Discount ({Math.round(discount * 100)}%)</span>
                    <span>−{fmt(saved)}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {submitted ? (
            <div className="calc-success">
              ✓ Received! We'll reach out to you within 24 hours.
            </div>
          ) : (
            <form className="calc-form" onSubmit={handleSubmit}>
              <input
                className="calc-input"
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                className="calc-input"
                type="tel"
                placeholder="Phone Number *"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`pricing-btn${(count === 0 || submitting) ? " pricing-btn--disabled" : ""}`}
                disabled={count === 0 || submitting}
              >
                {submitting ? "SENDING..." : count === 0 ? "SELECT SERVICES ABOVE" : "BOOK FREE STRATEGY CALL"}
              </button>
            </form>
          )}
          <div className="secure-line">No upfront payment • Strategy call first</div>
        </div>
      </div>

      {count >= 2 && (
        <div className="calc-bundle-banner">
          {count >= 4 ? "20% bundle discount applied!" : "10% bundle discount applied!"} Add {count < 4 ? `${4 - count} more service${4 - count > 1 ? "s" : ""} for 20% off` : "You're getting our best rate."}
        </div>
      )}
    </div>
  );
}

const shortFormVideos = [
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=7_lpgoxu" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=8_l0wsbr" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778384102_3893172810243885227_73535257018_zi9osj" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778305436_3892698647800481401_73535257018_ybkmvq" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778047823_3890849699595157209_73535257018_yo65rr" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=__%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80_%E0%A4%97%E0%A5%80%E0%A4%A4%E0%A4%BE_%E0%A4%95%E0%A5%81%E0%A4%82%E0%A4%9C_%E0%A4%87%E0%A4%A8%E0%A5%8D%E0%A4%AB%E0%A5%8D%E0%A4%B0%E0%A4%BE_%E0%A4%AC%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%A1_%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%87%E0%A4%B5%E0%A5%87%E0%A4%9F_%E0%A4%B2%E0%A4%BF%E0%A4%AE%E0%A4%BF%E0%A4%9F%E0%A5%87%E0%A4%A1_%E0%A4%95%E0%A5%80_%E0%A4%A4%E0%A4%B0%E0%A4%AB%E0%A4%BC_%E0%A4%B8%E0%A5%87_%E0%A4%9C%E0%A4%BC%E0%A4%AC%E0%A4%B0%E0%A4%A6%E0%A4%B8%E0%A5%8D%E0%A4%A4_%E0%A4%85%E0%A4%A8%E0%A4%BE%E0%A4%89%E0%A4%82%E0%A4%B8%E0%A4%AE%E0%A5%87%E0%A4%82%E0%A4%9F__%E0%A4%B2%E0%A4%96%E0%A4%A8%E0%A4%8A_SCR_%E0%A4%AE%E0%A5%87%E0%A4%82_xkttqd" },
  { type: "ugc", tag: "AI UGC", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Edited_wlnmjv" },
  { type: "ugc", tag: "AI UGC", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Ai_ugc_10_ygvpdh" },
  { type: "ugc", tag: "AI UGC", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=ai_ugc_9_ovpev5" },
  { type: "ugc", tag: "AI UGC", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=0404_itrkrs" }
];

export default function OfferPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");
  const [creativeFilter, setCreativeFilter] = useState("all");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [pricingMode, setPricingMode] = useState("calc"); // 'calc' or 'plans'

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setShowVideo(false); };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = d.createElement("script");
          s.src = A;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "30min", { origin: "https://app.cal.com" });

    window.Cal.ns["30min"]("inline", {
      elementOrSelector: "#my-cal-inline-30min",
      config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true", "theme": "dark" },
      calLink: "harshustle/30min",
    });

    window.Cal.ns["30min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view", "theme": "dark" });
  }, []);

  const toggleFaq = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  const getThumbnail = (url) => {
    const match = url.match(/public_id=([^&]+)/);
    if (match && match[1]) {
      const id = decodeURIComponent(match[1]);
      return `https://res.cloudinary.com/dobulag2p/video/upload/so_0,w_400,h_711,c_fill/${id}.jpg`;
    }
    return "https://res.cloudinary.com/dobulag2p/image/upload/v1778540902/__I_know_Your_Problem_202605120355_srntis.jpg";
  };

  const openVideoInModal = (url) => {
    setModalVideoUrl(url + "&autoplay=true&controls=true");
    setShowVideo(true);
  };

  const filteredVideos = shortFormVideos.filter(
    (v) => creativeFilter === "all" || v.type === creativeFilter
  );

  return (
    <div className="offer-page">
      {/* FULLSCREEN VIDEO MODAL */}
      {showVideo && (
        <div className="vsl-modal-backdrop" onClick={() => setShowVideo(false)}>
          <div className="vsl-modal" onClick={(e) => e.stopPropagation()}>
            <button className="vsl-close" onClick={() => setShowVideo(false)}>✕</button>
            <iframe
              src={modalVideoUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              title="VSL Video"
              style={{ display: "block", border: 0 }}
            />
          </div>
        </div>
      )}

      {/* FLOATING PILL NAVBAR */}
      <header className="navbar-wrap">
        <div className="navbar-container">
          <ul className="navbar-links">
            <li><a href="#how-it-works" className="navbar-link">Prebuilt</a></li>
            <li><a href="#short-form" className="navbar-link">Customized</a></li>
          </ul>
          <div className="navbar-logo">
            wstatemedia
          </div>
          <div className="navbar-actions">
            <ul className="navbar-links">
              <li><a href="#why-work" className="navbar-link">About Us</a></li>
            </ul>
            <a href="#cta" className="navbar-btn">Contact Us</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag-wrap">
            <span className="hero-label">AI REAL ESTATE ACQUISITION SYSTEM</span>
          </div>

          <h1>
            Build your Real Estate <br />
            <span className="brand-highlight">Startup with wstatemedia</span>
          </h1>

          <p className="subheadline">
            Generate qualified property buyers automatically using AI UGC videos, high-converting acquisition funnels, and 24/7 SMS &amp; CRM lead qualification.
          </p>

          {/* DUAL PILL BUTTONS */}
          <div className="hero-cta-group">
            <a href="#cta" className="btn-black-pill">
              Let's Explore →
            </a>
            <a href="#build-package" className="btn-outline-pill">
              Contact Us
            </a>
          </div>

          {/* TRUST BAR */}
          <div className="trust-bar">
            <span className="trust-text">Trusted by <strong>50+ US Real Estate</strong> Agencies &amp; Developers</span>
          </div>

          {/* BROWSER WINDOW VIDEO FRAME */}
          <div className="browser-video-frame">
            <div className="browser-header">
              <div className="browser-dots">
                <span className="browser-dot browser-dot--red"></span>
                <span className="browser-dot browser-dot--yellow"></span>
                <span className="browser-dot browser-dot--green"></span>
              </div>
              <div className="browser-url-bar">wstatemedia.com/vsl</div>
            </div>
            <div className="vsl-thumbnail" onClick={() => openVideoInModal("https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Compiled_bboouj")}>
              <img
                src="https://res.cloudinary.com/dobulag2p/image/upload/v1778540902/__I_know_Your_Problem_202605120355_srntis.jpg"
                alt="Watch VSL Video"
                className="vsl-cover"
              />
              <div className="vsl-play-btn">
                <div className="vsl-play-circle">
                  <div className="vsl-play-icon"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE TO OUTCOME (Screenshot 1) */}
      <section className="feature-outcome-section">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">— FROM FEATURE TO OUTCOME</div>
            <h2>Every capability is built to end in one place: your phone ringing.</h2>
          </div>
          <div className="feature-outcome-grid">
            <div className="outcome-column">
              <div className="outcome-card">
                <div className="outcome-tag">FEATURE</div>
                <div className="outcome-title">10–20 AI ad variations monthly</div>
              </div>
              <div className="outcome-card">
                <div className="outcome-tag">EMOTIONAL BENEFIT</div>
                <div className="outcome-title">You stop guessing and start knowing what works</div>
              </div>
            </div>
            <div className="outcome-arrow">→</div>
            <div className="outcome-column">
              <div className="outcome-card">
                <div className="outcome-tag">ADVANTAGE</div>
                <div className="outcome-title">You test 5–10x more than a traditional agency</div>
              </div>
              <div className="outcome-card outcome-card--highlight">
                <div className="outcome-tag outcome-tag--highlight">BUSINESS RESULT</div>
                <div className="outcome-title">Lower cost per lead, more booked calls, higher ROAS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PROCESS (Screenshot 2) */}
      <section id="how-it-works">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">— HOW IT WORKS</div>
            <h2>From strategy call to live ads in under a week.</h2>
          </div>
          <div className="how-steps-grid">
            {howItWorksSteps.map((item) => (
              <div className="how-step-card" key={item.step}>
                <div className="how-step-top">
                  <span className="how-step-num">{item.step}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="how-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INFINITE MARQUEE TICKER AT BOTTOM OF HOW IT WORKS (Screenshot 2) */}
        <div className="marquee-bar">
          <div className="marquee-track">
            <div className="marquee-item">COASTAL REALTY <span className="marquee-stat">CPL -41%</span> •</div>
            <div className="marquee-item">IRONGATE PROPERTIES <span className="marquee-stat">ROAS 5.6x</span> •</div>
            <div className="marquee-item">PINEHURST LUXURY <span className="marquee-stat">Bookings +212%</span> •</div>
            <div className="marquee-item">APEX REAL ESTATE <span className="marquee-stat">ROAS 4.1x</span> •</div>
            <div className="marquee-item">BRIGHTSMILE HOMES <span className="marquee-stat">CPA -38%</span> •</div>
            <div className="marquee-item">SUMMIT DEVELOPERS <span className="marquee-stat">CTR +156%</span> •</div>
            {/* duplicate for continuous loop */}
            <div className="marquee-item">COASTAL REALTY <span className="marquee-stat">CPL -41%</span> •</div>
            <div className="marquee-item">IRONGATE PROPERTIES <span className="marquee-stat">ROAS 5.6x</span> •</div>
            <div className="marquee-item">PINEHURST LUXURY <span className="marquee-stat">Bookings +212%</span> •</div>
            <div className="marquee-item">APEX REAL ESTATE <span className="marquee-stat">ROAS 4.1x</span> •</div>
            <div className="marquee-item">BRIGHTSMILE HOMES <span className="marquee-stat">CPA -38%</span> •</div>
            <div className="marquee-item">SUMMIT DEVELOPERS <span className="marquee-stat">CTR +156%</span> •</div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF (Screenshot 3) */}
      <section>
        <div className="container">
          <div className="section-title">
            <div className="hero-label">— SOCIAL PROOF</div>
            <h2>Real businesses. Real ROAS.</h2>
            <p>Illustrative results based on typical client outcomes — ask us for full case studies on your call.</p>
          </div>
          <div className="social-proof-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "We went from 2 stale ads to 14 tested variations in our first two weeks. Cost per booked appointment dropped 38% and we finally know which offer actually converts."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MT</div>
                <div>
                  <div className="author-name">Marcus Tillman</div>
                  <div className="author-role">Owner, Apex Real Estate — Dallas, TX</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "I was skeptical about 'AI ads' looking cheap. They don't. Our hook rate is higher than the videos our last agency shot with real actors — at a third of the cost."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RA</div>
                <div>
                  <div className="author-name">Dr. Renee Ackerman</div>
                  <div className="author-role">Founder, Coastal Realty — Miami, FL</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "We partner with wstatemedia across all 11 of our luxury development projects now. It's the only way we could 10x creative output without hiring an entire in-house media team."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JK</div>
                <div>
                  <div className="author-name">Jordan Kessler</div>
                  <div className="author-role">Managing Director, Summit Growth Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT FORM STYLES */}
      <section id="short-form">
        <div className="container">
          <div className="section-title">
            <h2>SHORT FORM STYLES</h2>
            <p>High-converting short form content tailored for real estate.</p>
          </div>

          <div className="creative-tabs">
            <button className={creativeFilter === 'all' ? 'active' : ''} onClick={() => { setCreativeFilter('all'); setPlayingIndex(null); }}>All Creatives</button>
            <button className={creativeFilter === 'shoot' ? 'active' : ''} onClick={() => { setCreativeFilter('shoot'); setPlayingIndex(null); }}>Real Shoot Ads</button>
            <button className={creativeFilter === 'ugc' ? 'active' : ''} onClick={() => { setCreativeFilter('ugc'); setPlayingIndex(null); }}>AI UGC Videos</button>
          </div>

          <div className="short-form-grid">
            {filteredVideos.map((item, idx) => (
              <div key={idx} className="phone-card">
                {playingIndex === idx ? (
                  <iframe
                    src={`${item.url}&autoplay=true&muted=false`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={`Short Video ${idx}`}
                  />
                ) : (
                  <>
                    <img src={getThumbnail(item.url)} alt={item.tag} className="phone-card-bg" />
                    <div className="phone-card-overlay">
                      <div className="play-circle" onClick={() => setPlayingIndex(idx)}>
                        <svg viewBox="0 0 24 24">
                          <polygon points="8,5 19,12 8,19" />
                        </svg>
                      </div>
                      <span className="phone-tag">{item.tag}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section id="why-work">
        <div className="container">
          <div className="section-title">
            <h2>WHY WORK WITH US?</h2>
            <p>Most real estate teams hire separate vendors. We built one integrated system that actually converts.</p>
          </div>

          <div className="how-steps-grid">
            {whyUsReasons.map((item) => (
              <div className="how-step-card" key={item.title}>
                <h3>{item.title}</h3>
                <p className="how-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION: BOTH CALCULATOR AND FIXED PLANS (Screenshot 4) */}
      <section className="pricing-section" id="build-package">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">— PRICING &amp; PACKAGES</div>
            <h2>Simple plans. No production markups.</h2>
            <p>Choose between our fixed monthly growth plans or custom build your exact package with our live calculator.</p>
          </div>

          {/* TOGGLE BUTTONS FOR CALCULATOR VS PLANS */}
          <div className="pricing-mode-toggle">
            <button
              className={`pricing-mode-btn${pricingMode === 'calc' ? ' active' : ''}`}
              onClick={() => setPricingMode('calc')}
            >
              Custom Calculator
            </button>
            <button
              className={`pricing-mode-btn${pricingMode === 'plans' ? ' active' : ''}`}
              onClick={() => setPricingMode('plans')}
            >
              Simple Fixed Plans
            </button>
          </div>

          {/* OPTION 1: CUSTOM CALCULATOR */}
          {pricingMode === 'calc' && <PricingCalculator />}

          {/* OPTION 2: FIXED PLANS GRID (Screenshot 4) */}
          {pricingMode === 'plans' && (
            <div>
              <div className="plans-grid">
                {fixedPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`plan-card${plan.popular ? ' plan-card--popular' : ''}`}
                  >
                    {plan.popular && <div className="plan-popular-badge">MOST POPULAR</div>}
                    <div className="plan-name">{plan.name}</div>
                    <div className="plan-desc">{plan.desc}</div>
                    <div className="plan-price">
                      {plan.price} <span>{plan.period}</span>
                    </div>
                    <div className="plan-billed">{plan.billed}</div>
                    <ul className="plan-features">
                      {plan.features.map((feat) => (
                        <li key={feat}>{feat}</li>
                      ))}
                    </ul>
                    <a
                      href="#cta"
                      className={`plan-btn${plan.popular ? ' plan-btn--primary' : ''}`}
                    >
                      {plan.btnText}
                    </a>
                  </div>
                ))}
              </div>

              {/* 30-DAY GUARANTEE BANNER */}
              <div className="plan-guarantee">
                <div className="guarantee-icon">🛡️</div>
                <div>
                  <div className="guarantee-title">30-day performance guarantee</div>
                  <div className="guarantee-desc">
                    If we don't deliver 10 fully tested ad variations within your first 30 days, you don't pay for that month. That's how confident we are in the process.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq${activeIndex === i ? " active" : ""}`}
              onClick={() => toggleFaq(i)}
            >
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <h3>{activeIndex === i ? "−" : "+"}</h3>
              </div>
              {activeIndex === i && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="cta">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-title">
            <h2>Stop Posting. Start Converting.</h2>
            <p>Build your high-converting real estate acquisition machine today.</p>
          </div>

          <div style={{ maxWidth: "800px", margin: "auto", borderRadius: "16px", overflow: "hidden", background: "#fff", border: "1px solid #e2e8f0", padding: "20px" }}>
            <div style={{ width: "100%", height: "100%", minHeight: "600px", overflow: "scroll" }} id="my-cal-inline-30min"></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="offer-footer">
        <div className="container">
          <div className="offer-footer-grid">
            <div>
              <div className="offer-footer-logo">wstatemedia</div>
              <p className="offer-footer-tagline">
                AI-powered real estate growth system.<br />
                Creatives. Funnels. Automation. Ads.
              </p>
            </div>
            <div>
              <div className="offer-footer-heading">Services</div>
              <ul className="offer-footer-links">
                <li>Cinematic Real Estate Video Production</li>
                <li>AI UGC Videos</li>
                <li>Acquisition Funnels</li>
                <li>SMS &amp; CRM Automation</li>
                <li>AI Real Estate Chatbot</li>
                <li>Meta &amp; Google Ads</li>
              </ul>
            </div>
            <div>
              <div className="offer-footer-heading">Contact</div>
              <ul className="offer-footer-links">
                <li><a href="https://cal.com/harshustle/30min" target="_blank" rel="noopener noreferrer">Book Strategy Call</a></li>
              </ul>
            </div>
          </div>
          <div className="offer-footer-bottom">
            <span>© 2026 wstatemedia. All rights reserved.</span>
            <span>Built by Harsh Srivastava</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
