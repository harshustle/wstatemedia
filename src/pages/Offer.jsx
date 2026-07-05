import React, { useState, useEffect } from "react";
import "./OfferPage.css";

const faqs = [
  {
    q: "Do you also run ads?",
    a: "Yes. We manage Meta and Google ad campaigns optimized specifically for real estate lead generation.",
  },
  {
    q: "Can you build the funnel too?",
    a: "Absolutely. We create complete high-converting acquisition funnels.",
  },
  {
    q: "Do you provide AI automation?",
    a: "Yes. We integrate WhatsApp automation and AI buyer qualification systems.",
  },
  {
    q: "Who is this for?",
    a: "Builders, brokers, developers, luxury consultants, and real estate agencies.",
  },
];

const stack = [
  {
    title: "Real Shoot Ads",
    desc: "Premium cinematic property videos designed to stop scrolling instantly.",
    videos: [
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=7_lpgoxu",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=8_l0wsbr",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778384102_3893172810243885227_73535257018_zi9osj",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778305436_3892698647800481401_73535257018_ybkmvq",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778047823_3890849699595157209_73535257018_yo65rr",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=__%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80_%E0%A4%97%E0%A5%80%E0%A4%A4%E0%A4%BE_%E0%A4%95%E0%A5%81%E0%A4%82%E0%A4%9C_%E0%A4%87%E0%A4%A8%E0%A5%8D%E0%A4%AB%E0%A5%8D%E0%A4%B0%E0%A4%BE_%E0%A4%AC%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%A1_%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%87%E0%A4%B5%E0%A5%87%E0%A4%9F_%E0%A4%B2%E0%A4%BF%E0%A4%AE%E0%A4%BF%E0%A4%9F%E0%A5%87%E0%A4%A1_%E0%A4%95%E0%A5%80_%E0%A4%A4%E0%A4%B0%E0%A4%AB%E0%A4%BC_%E0%A4%B8%E0%A5%87_%E0%A4%9C%E0%A4%BC%E0%A4%AC%E0%A4%B0%E0%A4%A6%E0%A4%B8%E0%A5%8D%E0%A4%A4_%E0%A4%85%E0%A4%A8%E0%A4%BE%E0%A4%89%E0%A4%82%E0%A4%B8%E0%A4%AE%E0%A5%87%E0%A4%82%E0%A4%9F__%E0%A4%B2%E0%A4%96%E0%A4%A8%E0%A4%8A_SCR_%E0%A4%AE%E0%A5%87%E0%A4%82_xkttqd",
    ],
    cta: "GET STARTED",
    reverse: false,
  },
  {
    title: "AI UGC Videos",
    desc: "Authentic AI-generated ads optimized specifically for Meta and YouTube campaigns.",
    videos: [
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Edited_wlnmjv",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Ai_ugc_10_ygvpdh",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=ai_ugc_9_ovpev5",
      "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=0404_itrkrs",
    ],
    cta: "BOOK CALL",
    reverse: true,
  },
];

const funnelStages = [
  { icon: "📢", label: "META & GOOGLE ADS", stat: "10,000 Impressions", color: "#4d7c92", width: "100%" },
  { icon: "🏠", label: "LANDING PAGE", stat: "1,200 Visitors", color: "#3d6275", width: "80%" },
  { icon: "📋", label: "LEAD FORM", stat: "240 Inquiries", color: "#2d4b59", width: "58%" },
  { icon: "✅", label: "QUALIFIED BUYER", stat: "90 Hot Leads", color: "#14b86a", width: "36%" },
];

function FunnelDiagram() {
  return (
    <div className="funnel-diagram">
      {funnelStages.map((s, i) => (
        <div key={i} className="funnel-row">
          <div className="funnel-bar" style={{ width: s.width, background: s.color }}>
            <span className="funnel-icon">{s.icon}</span>
            <span className="funnel-label">{s.label}</span>
          </div>
          <div className="funnel-stat">{s.stat}</div>
          {i < funnelStages.length - 1 && <div className="funnel-arrow">▼</div>}
        </div>
      ))}
    </div>
  );
}

function WhatsAppMock() {
  const messages = [
    { from: "bot", text: "🏠 Hi! Thank you for your interest in Shree Geeta Kunj. Are you looking to buy or invest?", time: "10:02 AM" },
    { from: "lead", text: "Buy. 2BHK or 3BHK.", time: "10:03 AM" },
    { from: "bot", text: "Great! What's your budget range? (e.g. 50L–80L)", time: "10:03 AM" },
    { from: "lead", text: "Around 70–90 lakhs.", time: "10:04 AM" },
    { from: "bot", text: "✅ Perfect match! We have a 3BHK at ₹82L with ready possession. Can I schedule a site visit for you?", time: "10:04 AM" },
    { from: "lead", text: "Yes, this Saturday works.", time: "10:05 AM" },
    { from: "bot", text: "📅 Booked! Our team will call you by Friday to confirm. See you Saturday! 🙌", time: "10:05 AM" },
  ];
  return (
    <div className="wa-mock">
      <div className="wa-header">
        <div className="wa-avatar">WS</div>
        <div className="wa-header-info">
          <div className="wa-name">wstatemedia AI Bot</div>
          <div className="wa-status">● Online — Responding instantly</div>
        </div>
      </div>
      <div className="wa-body">
        {messages.map((m, i) => (
          <div key={i} className={`wa-msg wa-msg--${m.from}`}>
            <div className="wa-bubble">{m.text}</div>
            <div className="wa-time">{m.time} {m.from === "bot" ? "✓✓" : ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIChatbotMock() {
  const msgs = [
    { from: "bot", text: "👋 Welcome to wstatemedia Properties! Looking to buy, rent, or invest?" },
    { from: "user", text: "Looking to buy a flat in Lucknow." },
    { from: "bot", text: "Great choice! What's your preferred area — Gomti Nagar, Hazratganj, or Shaheed Path?" },
    { from: "user", text: "Shaheed Path." },
    { from: "bot", text: "🏠 We have 3 ready-possession projects there. Budget under ₹1Cr?" },
    { from: "user", text: "Yes, around 80–90L." },
    { from: "bot", text: "✅ Perfect! I'll connect you with our property expert. Can I get your WhatsApp number?" },
  ];
  return (
    <div className="chatbot-mock">
      <div className="chatbot-topbar">
        <div className="chatbot-dot" />
        <span className="chatbot-title">🤖 wstatemedia AI</span>
        <span className="chatbot-badge">AI Powered</span>
      </div>
      <div className="chatbot-body">
        {msgs.map((m, i) => (
          <div key={i} className={`chatbot-msg chatbot-msg--${m.from}`}>
            {m.from === "bot" && <div className="chatbot-avatar">AI</div>}
            <div className="chatbot-bubble">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <span className="chatbot-placeholder">Type your message...</span>
        <button className="chatbot-send">➤</button>
      </div>
    </div>
  );
}

function PaidAdsMock() {
  const metrics = [
    { label: "Impressions", value: "2,40,000", change: "+38%", up: true },
    { label: "Clicks", value: "8,420", change: "+52%", up: true },
    { label: "CPL", value: "₹186", change: "-41%", up: false },
    { label: "ROAS", value: "4.8x", change: "+60%", up: true },
  ];
  const bars = [
    { day: "Mon", h: 40 },
    { day: "Tue", h: 65 },
    { day: "Wed", h: 50 },
    { day: "Thu", h: 80 },
    { day: "Fri", h: 70 },
    { day: "Sat", h: 95 },
    { day: "Sun", h: 55 },
  ];
  return (
    <div className="ads-mock">
      <div className="ads-topbar">
        <div className="ads-platform">
          <span className="ads-logo ads-logo--meta">Meta</span>
          <span className="ads-logo ads-logo--google">Google</span>
        </div>
        <span className="ads-live"><span className="ads-live-dot" />LIVE</span>
      </div>
      <div className="ads-metrics">
        {metrics.map((m, i) => (
          <div className="ads-metric" key={i}>
            <div className="ads-metric-label">{m.label}</div>
            <div className="ads-metric-value">{m.value}</div>
            <div className={`ads-metric-change ${m.up ? "ads-up" : "ads-down"}`}>
              {m.up ? "▲" : "▼"} {m.change}
            </div>
          </div>
        ))}
      </div>
      <div className="ads-chart">
        <div className="ads-chart-label">Lead Volume — This Week</div>
        <div className="ads-bars">
          {bars.map((b, i) => (
            <div className="ads-bar-wrap" key={i}>
              <div className="ads-bar" style={{ height: `${b.h}%` }} />
              <div className="ads-bar-day">{b.day}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="ads-footer">
        <span>🎯 Targeting: Real Estate Buyers · Lucknow · 25–55 yrs</span>
      </div>
    </div>
  );
}

const howItWorksSteps = [
  {
    step: "01",
    icon: "📞",
    title: "Free Strategy Call",
    desc: "We audit your project, ideal buyer profile, and current marketing setup.",
    points: ["30-minute discovery call", "Custom growth roadmap", "No upfront payment required"],
  },
  {
    step: "02",
    icon: "🎬",
    title: "Content Production",
    desc: "We create cinematic real-shoot ads and AI UGC videos built to stop the scroll.",
    points: ["On-location property shoots", "AI UGC ad variations", "Scripts optimized for conversions"],
    expandable: true,
    workflow: [
      {
        phase: "Brief",
        title: "Creative Brief & Strategy",
        desc: "We lock your hook, target buyer, property angles, and whether each ad is real shoot or AI UGC.",
        timeline: "Day 1",
      },
      {
        phase: "Script",
        title: "Scriptwriting",
        desc: "Conversion-focused scripts with a strong opener, key benefits, objection handling, and a site-visit CTA.",
        timeline: "Day 1–2",
      },
      {
        phase: "Plan",
        title: "Storyboard & Shot List",
        desc: "Scene-by-scene visual plan so every frame supports the message — on camera or in AI.",
        timeline: "Day 2–3",
      },
      {
        phase: "Shoot",
        title: "Production",
        desc: "On-location cinematic shoot at your property, or AI UGC generation matched to your brand voice.",
        timeline: "Day 3–5",
      },
      {
        phase: "Edit",
        title: "Editing & Post-Production",
        desc: "Cinematic cuts, color grade, captions, sound design, and platform-safe formatting.",
        timeline: "Day 5–7",
      },
      {
        phase: "Review",
        title: "Review & Revisions",
        desc: "You review draft cuts. We refine hooks, pacing, and CTA until the creative is ad-ready.",
        timeline: "Day 7–8",
      },
      {
        phase: "Deliver",
        title: "Final Video Delivery",
        desc: "Ad-ready exports for Meta, Reels, YouTube Shorts, and WhatsApp — ready to launch campaigns.",
        timeline: "Day 8–10",
      },
    ],
  },
  {
    step: "03",
    icon: "🏠",
    title: "Funnel & Landing Page",
    desc: "We build a high-converting funnel with a landing page that earns buyer trust.",
    points: ["Floor plans & actual visuals", "Clear pricing & location benefits", "Site visit booking CTA"],
  },
  {
    step: "04",
    icon: "📊",
    title: "Ads Go Live",
    desc: "Meta and Google campaigns launch with daily optimization for maximum lead flow.",
    points: ["Multiple content angles tested", "Lowest CPL tracking", "90-day active management"],
  },
  {
    step: "05",
    icon: "🤖",
    title: "AI Lead Automation",
    desc: "WhatsApp automation and AI chatbot qualify every inquiry instantly — 24/7.",
    points: ["Budget & timeline screening", "Instant WhatsApp responses", "Hot leads flagged for sales"],
  },
  {
    step: "06",
    icon: "✅",
    title: "Qualified Site Visits",
    desc: "Pre-qualified buyers reach your sales team ready to book a site visit.",
    points: ["Higher-quality inquiries", "Faster follow-up cycles", "More closings, less chasing"],
  },
];

const whyUsReasons = [
  {
    icon: "🎯",
    title: "One Integrated Growth System",
    desc: "Creatives, landing pages, ads, and automation — all under one team. No juggling five different vendors.",
  },
  {
    icon: "🏗️",
    title: "Built for Real Estate",
    desc: "Every script, funnel, and campaign is designed for property buyers — not generic e-commerce or D2C brands.",
  },
  {
    icon: "🎬",
    title: "Content That Converts",
    desc: "Cinematic real-shoot ads and AI UGC videos engineered to stop the scroll and drive site visits.",
  },
  {
    icon: "🏠",
    title: "Landing Pages That Build Trust",
    desc: "High-converting pages with floor plans, pricing, visuals, and CTAs — because your landing page makes or breaks ad spend.",
  },
  {
    icon: "🤖",
    title: "AI Lead Qualification 24/7",
    desc: "WhatsApp automation and AI chatbots screen budget, timeline, and intent before leads reach your sales team.",
  },
];

const whyUsStats = [
  { value: "+340%", label: "Qualified lead growth" },
  { value: "92%", label: "WhatsApp response rate" },
  { value: "4x", label: "Better lead quality" },
];

const whyUsComparison = {
  old: [
    "5 separate vendors to manage",
    "Generic ads that look like everyone else",
    "Slow manual follow-up on inquiries",
    "No funnel or landing page strategy",
  ],
  us: [
    "One team handles everything end-to-end",
    "Real estate-specific creatives & angles",
    "Instant AI qualification around the clock",
    "Full funnel from ad click to site visit",
  ],
};

const calcServices = [
  { id: "shoot", label: "Cinematic Real Estate Ad Shoot", unitPrice: 4000, unit: "shoot", hasQty: true, max: 20, min: 3, defaultQty: 3 },
  { id: "ugc", label: "AI UGC Ad Videos", unitPrice: 4000, unit: "video", hasQty: true, max: 20, min: 3, defaultQty: 3 },
  { id: "funnel", label: "High-Converting Funnel", unitPrice: 5000, unit: null, hasQty: false },
  { id: "landing", label: "Landing Page", unitPrice: 25000, unit: null, hasQty: false, note: "Landing pages matter a lot — they make or break your ad spend." },
  { id: "chatbot", label: "AI Real Estate Chatbot", unitPrice: 6000, unit: null, hasQty: false },
  { id: "wa", label: "WhatsApp Automation", unitPrice: 10000, unit: null, hasQty: false },
  { id: "meta", label: "Meta Ads Management", unitPrice: 15000, unit: "/mo", hasQty: false },
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
      const minQty = svc.min || 1;
      const currentQty = prev[id] || svc.defaultQty || 1;
      const next = Math.min(svc.max, Math.max(minQty, currentQty + delta));
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

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

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
    <section className="pricing-section" id="build-package">
      <div className="container">
        <div className="pricing-box">
          <div className="pricing-tag">BUILD YOUR PACKAGE</div>
          <h2>Pick What You Need</h2>
          <p className="pricing-sub">
            Select only the services you want — the price updates instantly.
            {count >= 2 && <span className="calc-discount-note"> Bundle discount applied 🎉</span>}
          </p>

          <div className="calc-grid">
            {/* LEFT — service toggles */}
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

            {/* RIGHT — live total card */}
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
                  ✅ Received! We'll WhatsApp you within 24 hours.
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
                    placeholder="WhatsApp Number *"
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
              🎯 {count >= 4 ? "20% bundle discount applied!" : "10% bundle discount applied!"} Add {count < 4 ? `${4 - count} more service${4 - count > 1 ? "s" : ""} for 20% off` : "You're getting our best rate."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const shortFormVideos = [
  { type: "shoot", tag: "FLEX SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=7_lpgoxu" },
  { type: "shoot", tag: "FLEX SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=8_l0wsbr" },
  { type: "shoot", tag: "FLEX SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778384102_3893172810243885227_73535257018_zi9osj" },
  { type: "shoot", tag: "FLEX SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778305436_3892698647800481401_73535257018_ybkmvq" },
  { type: "shoot", tag: "FLEX SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778047823_3890849699595157209_73535257018_yo65rr" },
  { type: "shoot", tag: "FLEX SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=__%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80_%E0%A4%97%E0%A5%80%E0%A4%A4%E0%A4%BE_%E0%A4%95%E0%A5%81%E0%A4%82%E0%A4%9C_%E0%A4%87%E0%A4%A8%E0%A5%8D%E0%A4%AB%E0%A5%8D%E0%A4%B0%E0%A4%BE_%E0%A4%AC%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%A1_%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%87%E0%A4%B5%E0%A5%87%E0%A4%9F_%E0%A4%B2%E0%A4%BF%E0%A4%AE%E0%A4%BF%E0%A4%9F%E0%A5%87%E0%A4%A1_%E0%A4%95%E0%A5%80_%E0%A4%A4%E0%A4%B0%E0%A4%AB%E0%A4%BC_%E0%A4%B8%E0%A5%87_%E0%A4%9C%E0%A4%BC%E0%A4%AC%E0%A4%B0%E0%A4%A6%E0%A4%B8%E0%A5%8D%E0%A4%A4_%E0%A4%85%E0%A4%A8%E0%A4%BE%E0%A4%89%E0%A4%82%E0%A4%B8%E0%A4%AE%E0%A5%87%E0%A4%82%E0%A4%9F__%E0%A4%B2%E0%A4%96%E0%A4%A8%E0%A4%8A_SCR_%E0%A4%AE%E0%A5%87%E0%A4%82_xkttqd" },
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
  const [expandedHowStep, setExpandedHowStep] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVideoUrl("https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Compiled_bboouj&autoplay=true&muted=true&controls=true&poster=https%3A%2F%2Fres.cloudinary.com%2Fdobulag2p%2Fimage%2Fupload%2Fv1778540902%2F__I_know_Your_Problem_202605120355_srntis.jpg");
      setShowVideo(true);
    }, 300);
    
    const handleKey = (e) => { if (e.key === "Escape") setShowVideo(false); };
    window.addEventListener("keydown", handleKey);
    return () => {
      clearTimeout(timer);
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
          if(typeof namespace === "string"){
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar); 
          return;
        } 
        p(cal, ar); 
      }; 
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "30min", {origin:"https://app.cal.com"});

    window.Cal.ns["30min"]("inline", {
      elementOrSelector:"#my-cal-inline-30min",
      config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"},
      calLink: "harshustle/30min",
    });

    window.Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view","theme":"dark"});
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

      {/* TOP NAVIGATION BAR */}
      <header className="navbar-wrap">
        <div className="navbar-container">
          <div className="navbar-logo">wstatemedia</div>
          <ul className="navbar-links">
            <li><a href="#how-it-works" className="navbar-link">HOW IT WORKS</a></li>
            <li><a href="#short-form" className="navbar-link">STYLES</a></li>
            <li><a href="#why-work" className="navbar-link">WHY US</a></li>
          </ul>
          <a href="#cta" className="navbar-btn">BOOK CALL →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-label">AI REAL ESTATE GROWTH SYSTEM</div>
          <h1>
            Generate Qualified Property Buyers{" "}
            <span className="brand-highlight">Using AI-Powered Funnels</span>
          </h1>
          <p className="subheadline">
            Real shoot ads. <strong>AI UGC videos.</strong> Funnels. WhatsApp automation.
            AI chatbots. Built to generate high-intent buyers automatically.
          </p>
          <div className="benefits">
            <div className="benefit">Real Shoot Ads</div>
            <div className="benefit">AI Lead Automation</div>
            <div className="benefit">High-Converting Funnels</div>
          </div>
          <div className="vsl-wrapper">
            <div className="vsl-thumbnail" onClick={() => openVideoInModal("https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Compiled_bboouj")}>
              <img
                src="https://res.cloudinary.com/dobulag2p/image/upload/v1778540902/__I_know_Your_Problem_202605120355_srntis.jpg"
                alt="Watch VSL"
                className="vsl-cover"
              />
              <div className="vsl-play-btn">
                <svg width="76" height="76" viewBox="0 0 68 68" fill="none">
                  <circle cx="34" cy="34" r="34" />
                  <polygon points="27,20 54,34 27,48" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: '#eae5dc', borderTop: 'none', borderBottom: 'none' }}>
        <div className="container">
          <div className="section-title">
            <h2>HOW IT <span className="text-highlight">WORKS</span></h2>
            <p>From strategy call to qualified site visits — here is exactly how we build your acquisition system.</p>
          </div>
          <div className="how-steps-grid">
            {howItWorksSteps.map((item) => {
              const isExpanded = expandedHowStep === item.step;
              return (
                <div
                  className={`how-step-card${item.expandable ? " how-step-card--expandable" : ""}${isExpanded ? " how-step-card--expanded" : ""}`}
                  key={item.step}
                  onClick={item.expandable ? () => setExpandedHowStep(isExpanded ? null : item.step) : undefined}
                  role={item.expandable ? "button" : undefined}
                  tabIndex={item.expandable ? 0 : undefined}
                  onKeyDown={item.expandable ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedHowStep(isExpanded ? null : item.step);
                    }
                  } : undefined}
                >
                  <div className="how-step-top">
                    <span className="how-step-num">Step {item.step}</span>
                    <div className="how-icon-box">{item.icon}</div>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="how-step-desc">{item.desc}</p>
                  <ul className="how-step-points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {item.expandable && (
                    <button
                      type="button"
                      className="how-step-toggle"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedHowStep(isExpanded ? null : item.step);
                      }}
                    >
                      {isExpanded ? "Hide production pipeline −" : "See script → delivery pipeline +"}
                    </button>
                  )}
                  {item.workflow && isExpanded && (
                    <div className="how-step-workflow" onClick={(e) => e.stopPropagation()}>
                      <div className="how-workflow-title">Script to Video Delivery</div>
                      {item.workflow.map((stage, idx) => (
                        <div className="how-workflow-item" key={stage.phase}>
                          <div className="how-workflow-line">
                            <div className="how-workflow-dot">{idx + 1}</div>
                            {idx < item.workflow.length - 1 && <div className="how-workflow-connector" />}
                          </div>
                          <div className="how-workflow-content">
                            <div className="how-workflow-meta">
                              <span className="how-workflow-phase">{stage.phase}</span>
                              <span className="how-workflow-time">{stage.timeline}</span>
                            </div>
                            <div className="how-workflow-name">{stage.title}</div>
                            <p className="how-workflow-desc">{stage.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="how-steps-cta">
            <a href="#cta" className="btn-primary">BOOK YOUR FREE STRATEGY CALL</a>
          </div>
        </div>
      </section>

      {/* SHORT FORM STYLES */}
      <section id="short-form" style={{ background: '#eae5dc', borderTop: 'none', borderBottom: 'none' }}>
        <div className="container">
          <div className="section-title">
            <h2>SHORT FORM <span className="text-highlight">STYLES</span></h2>
            <p>High-converting short form content tailored for real estate.</p>
          </div>

          {/* Video Filter Tabs */}
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
      <section id="why-work" style={{ background: '#eae5dc', borderTop: 'none', borderBottom: 'none' }}>
        <div className="container">
          <div className="section-title">
            <h2>WHY WORK WITH <span className="text-highlight">US?</span></h2>
            <p>Most developers hire separate agencies for videos, ads, funnels, and automation. We built one system that does it all — and actually converts.</p>
          </div>

          <div className="why-us-grid">
            <div className="why-us-reasons">
              {whyUsReasons.map((item) => (
                <div className="why-us-reason" key={item.title}>
                  <div className="why-us-reason-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="why-us-proof">
              <div className="why-us-stats">
                {whyUsStats.map((stat) => (
                  <div className="why-us-stat" key={stat.label}>
                    <div className="why-us-stat-value">{stat.value}</div>
                    <div className="why-us-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="why-us-compare">
                <div className="why-us-compare-col why-us-compare-col--old">
                  <div className="why-us-compare-heading">❌ The Old Way</div>
                  <ul>
                    {whyUsComparison.old.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="why-us-compare-col why-us-compare-col--new">
                  <div className="why-us-compare-heading">✓ With wstatemedia</div>
                  <ul>
                    {whyUsComparison.us.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="why-us-cta">
            <a href="#cta" className="btn-primary">BOOK YOUR FREE STRATEGY CALL</a>
          </div>
        </div>
      </section>

      {/* OFFER BOX */}
      <section style={{ background: '#eae5dc', borderTop: 'none', borderBottom: 'none' }}>
        <div className="container">
          <div className="offer-box">
            <h2>Everything You Need To Scale</h2>
            <p>
              Instead of hiring multiple agencies, funnel builders, creators, chatbot
              developers, and ad managers — get one integrated growth system.
            </p>
            <div className="offer-list">
              {[
                "Real Estate Video Ads",
                "AI UGC Ads",
                "Funnels",
                "WhatsApp Automation",
                "AI Chatbot",
                "Meta Ads Management",
                "Lead Qualification",
                "Conversion Optimization",
              ].map((item, i) => (
                <div className="offer-item" key={i}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CALCULATOR */}
      <PricingCalculator />

      {/* FAQ */}
      <section style={{ background: '#eae5dc' }}>
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
      <section className="final" id="cta" style={{ background: '#eae5dc' }}>
        <div className="container">
          <h2>
            Stop Posting.<br />Start Converting.
          </h2>
          <p>
            If you want premium real estate ads, AI automation, and a funnel system that
            consistently generates qualified buyers — let's build your acquisition machine.
          </p>
          {/* CALENDAR EMBED */}
          <div className="calendar-embed-wrap">
            <div style={{ width: "100%", height: "100%", minHeight: "600px", overflow: "scroll" }} id="my-cal-inline-30min"></div>
          </div>
          <div className="cta-wrap">
            <a
              href="https://cal.com/harshustle/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              BOOK MY FREE STRATEGY CALL
            </a>
          </div>
        </div>
      </section>

      <footer className="offer-footer">
        <div className="container">
          <div className="offer-footer-grid">
            <div className="offer-footer-brand">
              <div className="offer-footer-logo">wstatemedia</div>
              <p className="offer-footer-tagline">
                AI-powered real estate growth system.<br />
                Creatives. Funnels. Automation. Ads.
              </p>
              <div className="offer-footer-socials">
                <a href="https://instagram.com/wstatemedia" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                </a>
                <a href="https://wa.me/917839661372" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                </a>
              </div>
            </div>
            <div className="offer-footer-col">
              <div className="offer-footer-heading">Services</div>
              <ul className="offer-footer-links">
                <li>Cinematic Real Estate Ads</li>
                <li>AI UGC Videos</li>
                <li>High-Converting Funnels</li>
                <li>WhatsApp Automation</li>
                <li>AI Real Estate Chatbot</li>
                <li>Meta Ads Management</li>
              </ul>
            </div>
            <div className="offer-footer-col">
              <div className="offer-footer-heading">Contact</div>
              <ul className="offer-footer-links">
                <li>
                  <a href="https://wa.me/917839661372" target="_blank" rel="noopener noreferrer">
                    📱 +91 78396 61372
                  </a>
                </li>
                <li>
                  <a href="https://cal.com/harshustle/30min" target="_blank" rel="noopener noreferrer">
                    📅 Book a Free Call
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/wstatemedia" target="_blank" rel="noopener noreferrer">
                    📸 @wstatemedia
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="offer-footer-bottom">
            <span>© 2026 wstatemedia. All rights reserved.</span>
            <span>Built by <a href="/" style={{ color: "#4d7c92", textDecoration: "none", fontWeight: 700 }}>Harsh Srivastava</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
