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

const calcServices = [
  {
    id: "ai_calling",
    label: "AI Calling System Setup & Agent Creation",
    unitPrice: 10000,
    unit: null,
    hasQty: false,
    note: "Setup + Agent creation (₹10,000). Usage billed separately @ ₹7 / min."
  },
  {
    id: "ai_videos",
    label: "AI Real Estate Videos",
    unitPrice: 2500,
    unit: "video",
    hasQty: true,
    min: 4,
    max: 20,
    defaultQty: 4,
    note: "Creative concept, AI visuals, voiceover/presenter, 9:16 format & captions."
  },
  {
    id: "ugc_videos",
    label: "Human UGC Real Estate Videos",
    unitPrice: 3000,
    unit: "video",
    hasQty: true,
    min: 2,
    max: 20,
    defaultQty: 2,
    note: "Real UGC creator, on-ground shoot, editing, 9:16 format (min order: 2)."
  },
  {
    id: "website",
    label: "Real Estate Website Setup",
    unitPrice: 25000,
    unit: null,
    hasQty: false,
    note: "Includes 3-Yr Hosting + 1-Yr Email, Property Listing System & Site Visit Flow."
  },
  {
    id: "landing",
    label: "Standalone Project Landing Page",
    unitPrice: 10000,
    unit: "page",
    hasQty: true,
    min: 1,
    max: 10,
    defaultQty: 1,
    note: "High-converting standalone project page with gallery, floor plans & brochure download."
  },
  {
    id: "whatsapp",
    label: "WhatsApp Automation Setup",
    unitPrice: 10000,
    unit: null,
    hasQty: false,
    note: "Instant welcome reply, requirement collection, qualification & site visit routing."
  },
  {
    id: "ai_ads",
    label: "AI Ad Creative (3 Meta Videos)",
    unitPrice: 7000,
    unit: null,
    hasQty: false,
    note: "Ad strategy, scroll-stopping hooks, AI visuals & voiceover (3 videos)."
  },
  {
    id: "ugc_ads",
    label: "Human UGC Ads (2 Meta Videos)",
    unitPrice: 6000,
    unit: null,
    hasQty: false,
    note: "Human UGC creator presentation shoot & ad editing (min 2 videos)."
  }
];

const fixedPlans = [
  {
    name: "Starter Package",
    desc: "For individual realtors & small agencies getting started with AI lead generation.",
    price: "₹35,000",
    period: "one-time",
    billed: "Includes Website, 4 AI Videos & WhatsApp Setup",
    popular: false,
    btnText: "Choose Starter",
    features: [
      "Real Estate Website (3-yr hosting)",
      "4 AI Real Estate Reels / Shorts",
      "WhatsApp Lead Automation Setup",
      "AI Calling System Integration",
      "Lead Management & Admin Panel"
    ]
  },
  {
    name: "Growth Acquisition Package",
    desc: "Complete digital & AI acquisition system built to scale lead generation.",
    price: "₹65,000",
    period: "one-time",
    billed: "Best value • Full connected lead pipeline",
    popular: true,
    btnText: "Book Strategy Call",
    features: [
      "Advanced Real Estate Portal & Custom Filters",
      "8 AI Real Estate Videos + 2 Human UGC Videos",
      "AI Calling System Setup + Agent Creation",
      "WhatsApp Nurturing & Site Visit Automation",
      "3 AI Meta/Google Ad Creatives",
      "Dedicated Onboarding & Strategy"
    ]
  },
  {
    name: "Enterprise Developer Suite",
    desc: "For property builders & large developers scaling multiple project launches.",
    price: "Custom",
    period: "",
    billed: "Tailored scope for multi-project launches",
    popular: false,
    btnText: "Talk to Sales",
    features: [
      "Multiple Standalone Project Landing Pages",
      "12+ AI Videos & Human UGC Video Series",
      "Custom AI Knowledge Base & CRM Integration",
      "Multi-Agent WhatsApp & AI Calling Infrastructure",
      "Priority Production Queue & Retainer Support"
    ]
  }
];

const CALC_SHEET_URL = "https://script.google.com/macros/s/AKfycbxABRNpYSU6BJHLRJY1vE0ohMlCGNLjq6OuyECJEEZplZ4KfGebKe54_Ljrg-kJZRZy2w/exec";

function PricingCalculator() {
  const [selected, setSelected] = useState({});
  const [qty, setQty] = useState({ ai_videos: 4, ugc_videos: 2, landing: 1 });
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

const proposalData = {
  brand: {
    name: "Wstatemedia",
    website: "wstatemedia.site",
    date: "August 2026"
  },
  overview: {
    heading: "Overview",
    text: "This proposal outlines a complete suite of digital and AI-powered services built specifically for real estate businesses — builders, developers, agencies and independent realtors. Each service below is modular: pick a single service to start, or combine them into a connected system where your website, AI calling, WhatsApp automation and video content all feed a single lead pipeline."
  },
  pricingSummary: {
    heading: "Pricing Summary",
    columns: ["Service", "Setup / One-Time", "Monthly / Usage"],
    rows: [
      ["AI Calling System", "₹10,000 (setup + agent creation)", "₹7 / minute (usage)"],
      ["AI Real Estate Videos", "From ₹2,500 / video", "—"],
      ["Human UGC Videos", "From ₹3,000 / video (min. 2)", "—"],
      ["Real Estate Website", "₹25,000 – ₹40,000 (by complexity)", "Incl. 3-yr hosting + 1-yr email"],
      ["WhatsApp Automation", "₹10,000 – ₹25,000", "₹3,000 – ₹10,000 + API charges"],
      ["AI Ads (Creative)", "₹7,000 / 3 videos (min. 3)", "—"],
      ["Human UGC Ads", "From ₹3,000 / video (min. 2)", "—"]
    ],
    note: "Detailed scope for each service follows below."
  },
  services: [
    {
      number: 1,
      id: "ai-calling",
      title: "1. AI Calling System",
      pricing: [
        { label: "Setup + Agent Creation:", value: "₹10,000 (one-time)" },
        { label: "Usage:", value: "₹7 / minute" }
      ],
      sections: [
        {
          heading: "What's Included",
          features: [
            "AI inbound & outbound calling, with instant lead calling on enquiry",
            "Lead qualification — budget, location, and BHK / requirement collection",
            "Property information sharing and FAQ handling",
            "Lead verification and follow-up calls",
            "Appointment & site visit booking, confirmation, and rescheduling",
            "Call reminders, call summaries, and lead status updates",
            "Human handoff for hot leads",
            "CRM integration, call recording/transcription (where supported)",
            "Business-specific AI knowledge base, trained on your properties"
          ]
        }
      ]
    },
    {
      number: 2,
      id: "ai-videos-ugc",
      title: "2. AI Real Estate Videos & Human UGC Videos",
      sections: [
        {
          heading: "AI Real Estate Videos",
          pricing: [{ label: "Price:", value: "₹2,500 / video" }],
          packages: {
            columns: ["Package", "Videos", "Price"],
            rows: [
              ["Starter", "4 Videos", "₹9,000"],
              ["Growth", "8 Videos", "₹17,000"],
              ["Pro", "12 Videos", "₹24,000"]
            ]
          },
          features: [
            "Creative concept, scroll-stopping hook, and script",
            "AI-generated visuals with property images/video integration",
            "AI voiceover and AI presenter (if required)",
            "Cinematic property visuals, professional editing, captions & text animations",
            "Music & SFX, branding, CTA — 9:16 vertical, Reels-ready format",
            "1 revision included"
          ]
        },
        {
          heading: "Human UGC Videos",
          pricing: [{ label: "Price:", value: "₹3,000 / video (minimum order: 2 videos)" }],
          packages: {
            columns: ["Package", "Videos", "Price"],
            rows: [
              ["Starter", "2 Videos", "₹6,000"],
              ["Growth", "5 Videos", "₹15,000"],
              ["Pro", "8 Videos", "₹24,000"],
              ["Premium", "10 Videos", "₹30,000"]
            ]
          },
          features: [
            "Real UGC creator — concept, hook, and script",
            "On-ground shooting of property/project presentation",
            "Professional editing, captions, text animations, music & SFX",
            "Branding, CTA, 9:16 format, 1 revision included"
          ]
        }
      ]
    },
    {
      number: 3,
      id: "website",
      title: "3. Real Estate Website",
      pricing: [
        { label: "Setup:", value: "₹25,000 – ₹40,000 — depends on complexity & feature set" },
        { label: "Included:", value: "3 years hosting + 1 year email hosting" }
      ],
      sections: [
        {
          heading: "Website Pages",
          features: [
            "Home, About Us, Contact Us, FAQ, Testimonials, Blog/News (optional)",
            "Properties, Property Details, Property Categories (Residential & Commercial)",
            "Projects, Locations, Services, Privacy Policy, Terms & Conditions"
          ]
        },
        {
          heading: "Property Listing System",
          features: [
            "Add / edit / delete properties with images, videos, price, and area",
            "BHK, bedrooms, bathrooms, parking, property type & status",
            "Amenities, location, Google Maps, floor plans, brochure, possession & developer details"
          ]
        },
        {
          heading: "Search, Filters & Property Detail Page",
          features: [
            "Search & filter by location, budget, property type, BHK, area, price, amenities, availability",
            "Property gallery, overview, specifications, floor plan, nearby places & map",
            "WhatsApp CTA, Call CTA, enquiry form, request callback, schedule site visit"
          ]
        },
        {
          heading: "Lead Generation & Site Visit Booking",
          features: [
            "Enquire Now, Get Price, Request Callback, WhatsApp, Call Now, Download Brochure",
            "Full site visit flow — property & date/time selection, booking confirmation, rescheduling, cancellation, admin notification"
          ]
        },
        {
          heading: "Property Landing Pages",
          pricing: [{ label: "Price:", value: "₹7,000 – ₹15,000 / page" }],
          features: [
            "High-converting standalone landing page per project/property",
            "Gallery, pricing, amenities, location, floor plans, brochure download",
            "Enquiry form, WhatsApp CTA, Call CTA, and site-visit CTA"
          ]
        },
        {
          heading: "Admin Panel & Lead Management",
          features: [
            "Admin login with property, lead, enquiry, site-visit, image & content management",
            "Lead pipeline: New Lead → Contacted → Qualified → Site Visit → Follow-up → Negotiation → Closed/Lost"
          ]
        },
        {
          heading: "WhatsApp, SEO & Performance",
          features: [
            "WhatsApp integration, click-to-call, property-specific messages, contact forms & email notifications",
            "SEO-friendly URLs, meta tags, sitemap, schema markup, Search Console & Analytics, Meta Pixel",
            "Mobile optimization, image optimization, SSL, and deployment"
          ]
        },
        {
          heading: "Optional Add-ons",
          features: [
            "Property comparison, wishlist/favourites, user login, property alerts",
            "EMI / investment calculator, multi-agent profiles, multi-location support",
            "Blog/CMS, CRM integration, AI property assistant"
          ]
        }
      ]
    },
    {
      number: 4,
      id: "whatsapp-automation",
      title: "4. WhatsApp Automation",
      pricing: [
        { label: "Setup:", value: "₹10,000 – ₹25,000" },
        { label: "Monthly:", value: "₹3,000 – ₹10,000 + API Charges" }
      ],
      sections: [
        {
          heading: "What's Included",
          features: [
            "Instant lead response with automated welcome message",
            "Lead qualification — budget, location, BHK, and property preference",
            "Property details, recommendations, brochure & media delivery, pricing info",
            "FAQ automation, automated follow-ups, and lead nurturing",
            "Appointment & site visit booking, confirmation, reminders, rescheduling",
            "Lead routing with sales-team notifications and human handoff",
            "CRM integration and lead status updates"
          ]
        },
        {
          heading: "Automation Flow",
          text: "Lead Generated → Instant WhatsApp Reply → Requirement Collection → Lead Qualification → Property Recommendation → Brochure/Details → Follow-up → Site Visit Booking → Sales Team Handoff"
        }
      ]
    },
    {
      number: 5,
      id: "ai-ads",
      title: "5. AI Ads",
      sections: [
        {
          heading: "AI Ad Creative",
          pricing: [{ label: "Price:", value: "₹7,000 for 3 videos (minimum order) — larger volumes quoted on request" }],
          features: [
            "Ad strategy, target audience angle, and creative concept",
            "Scroll-stopping hook, ad script, AI visuals & voiceover, AI presenter (if required)",
            "Professional editing, captions, text animations, music & SFX, branding & CTA",
            "9:16 Meta Ads format, 1 revision included"
          ]
        },
        {
          heading: "Human UGC Ads",
          pricing: [{ label: "Price:", value: "₹3,000 / video (minimum order: 2 videos)" }],
          features: [
            "Human UGC creator — concept, hook, script",
            "Product/property presentation, shooting, and editing",
            "Captions, text animations, music & SFX, branding, CTA, 9:16 format, 1 revision"
          ]
        }
      ]
    }
  ],
  commercialTerms: {
    heading: "Important Commercial Terms",
    items: [
      {
        icon: "📢",
        title: "Ad Spend Excluded",
        text: "Meta/Google ad spend is not included"
      },
      {
        icon: "💬",
        title: "WhatsApp API Charges",
        text: "WhatsApp API charges are not included"
      },
      {
        icon: "📞",
        title: "AI Calling Usage",
        text: "AI Calling usage (₹7/minute) is billed separately based on actual call minutes"
      },
      {
        icon: "🤖",
        title: "AI / LLM API Usage",
        text: "AI/LLM API usage charges are not included"
      },
      {
        icon: "🌐",
        title: "Domain & Hosting Terms",
        text: "Domain renewal after the included 3-year hosting period is charged separately"
      },
      {
        icon: "✈️",
        title: "Creator Travel & Location",
        text: "Creator travel/location charges may apply separately for UGC shoots"
      },
      {
        icon: "🎞️",
        title: "Premium Stock Media",
        text: "Premium stock footage/assets may be charged separately"
      },
      {
        icon: "🔄",
        title: "Video Revisions Policy",
        text: "Each video includes 1 revision — major changes or additional revisions may be charged separately"
      }
    ]
  },
  nextSteps: {
    heading: "Next Steps",
    text: "Choose the services that fit your current stage — start with any single service, or combine the website, AI calling, and WhatsApp automation into one connected lead pipeline. Get in touch to finalise scope and timelines."
  }
};

const shortFormVideos = [
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=7_lpgoxu" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=8_l0wsbr" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778384102_3893172810243885227_73535257018_zi9osj" },
  { type: "shoot", tag: "REAL SHOOT", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=prakhar_properties_1778305436_3892698647800481401_73535257018_ybkmvq" },
  { type: "ugc", tag: "AI UGC", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Edited_wlnmjv" },
  { type: "ugc", tag: "AI UGC", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=Ai_ugc_10_ygvpdh" },
  { type: "ugc", tag: "AI UGC", url: "https://player.cloudinary.com/embed/?cloud_name=dobulag2p&public_id=0404_itrkrs" }
];

const clientWebsites = [
  {
    title: "Prakhar Properties & Infra",
    domain: "prakharproperties.com",
    liveUrl: "https://prakharproperties.com",
    category: "Real Estate Developer Portal",
    url: "/portfolio_website_1.png"
  },
  {
    title: "Shree Geeta Kunj Infra",
    domain: "shreegeetakunjinfra.com",
    liveUrl: "https://shreegeetakunjinfra.com",
    category: "Township & Villa Launch Page",
    url: "/portfolio_website_2.png"
  },
  {
    title: "Sobha Luxury Residences",
    domain: "sobharealty.com",
    liveUrl: "https://sobharealty.com",
    category: "High-End Agency Platform",
    url: "/portfolio_website_3.png"
  }
];

export default function OfferPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");
  const [creativeFilter, setCreativeFilter] = useState("all");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [activeServiceTab, setActiveServiceTab] = useState("ai-calling");
  const [pricingMode, setPricingMode] = useState("calc");

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setShowVideo(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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

    try {
      window.Cal("init", "30min", { origin: "https://app.cal.com" });
      window.Cal.ns["30min"]("inline", {
        elementOrSelector: "#my-cal-inline-30min",
        config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true", "theme": "dark" },
        calLink: "harshustle/30min",
      });
      window.Cal.ns["30min"]("ui", { "hideEventTypeDetails": false, "layout": "month_view", "theme": "dark" });
    } catch (_) {}
  }, []);

  const toggleFaq = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  const openVideoInModal = (url) => {
    setModalVideoUrl(url + "&autoplay=true&controls=true");
    setShowVideo(true);
  };

  const getThumbnail = (url) => {
    const match = url.match(/public_id=([^&]+)/);
    if (match && match[1]) {
      const id = decodeURIComponent(match[1]);
      return `https://res.cloudinary.com/dobulag2p/video/upload/so_0,w_400,h_711,c_fill/${id}.jpg`;
    }
    return "https://res.cloudinary.com/dobulag2p/image/upload/v1778540902/__I_know_Your_Problem_202605120355_srntis.jpg";
  };

  const filteredVideos = shortFormVideos.filter(
    (v) => creativeFilter === "all" || v.type === creativeFilter
  );

  return (
    <div className="offer-page">
      {/* AMBIENT GLOWING GRID BACKGROUND ELEMENTS */}
      <div className="bg-grid-glow-container">
        <div className="grid-glow-orb orb-1"></div>
        <div className="grid-glow-orb orb-2"></div>
        <div className="grid-glow-orb orb-3"></div>
        <div className="grid-glow-orb orb-4"></div>

        {/* GLOWING GRID HIGHLIGHT BOXES AT VARIOUS SPOTS */}
        <div className="grid-highlight-box box-1"></div>
        <div className="grid-highlight-box box-2"></div>
        <div className="grid-highlight-box box-3"></div>
      </div>

      {/* VSL MODAL */}
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
              title="Proposal Demo Video"
              style={{ display: "block", border: 0 }}
            />
          </div>
        </div>
      )}

      {/* FLOATING PILL NAVBAR */}
      <header className="navbar-wrap">
        <div className="navbar-container">
          <ul className="navbar-links">
            <li><a href="#pricing-summary" className="navbar-link">Pricing Summary</a></li>
            <li><a href="#services" className="navbar-link">Services</a></li>
          </ul>
          <div className="navbar-logo">
            wstatemedia
          </div>
          <div className="navbar-actions">
            <ul className="navbar-links">
              <li><a href="#calculator" className="navbar-link">Calculator</a></li>
            </ul>
            <a href="#cta" className="navbar-btn">Contact Us</a>
          </div>
        </div>
      </header>

      {/* ORIGINAL HERO SECTION - EXACT AND UNTOUCHED */}
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
            <a href="#calculator" className="btn-outline-pill">
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

      {/* FEATURE TO OUTCOME SECTION */}
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
                <div className="outcome-title">You test 5–10× more than a traditional agency</div>
              </div>
              <div className="outcome-card outcome-card--highlight">
                <div className="outcome-tag outcome-tag--highlight">BUSINESS RESULT</div>
                <div className="outcome-title">Lower cost per lead, more booked calls, higher ROAS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE TICKER BAR */}
      <div className="marquee-bar">
        <div className="marquee-track">
          <div className="marquee-item">COASTAL REALTY <span className="marquee-stat">CPL -41%</span> •</div>
          <div className="marquee-item">IRONGATE PROPERTIES <span className="marquee-stat">ROAS 5.6x</span> •</div>
          <div className="marquee-item">PINEHURST LUXURY <span className="marquee-stat">Bookings +212%</span> •</div>
          <div className="marquee-item">APEX REAL ESTATE <span className="marquee-stat">ROAS 4.1x</span> •</div>
          <div className="marquee-item">BRIGHTSMILE HOMES <span className="marquee-stat">CPA -38%</span> •</div>
          <div className="marquee-item">SUMMIT DEVELOPERS <span className="marquee-stat">CTR +156%</span> •</div>
          {/* continuous loop duplicate */}
          <div className="marquee-item">COASTAL REALTY <span className="marquee-stat">CPL -41%</span> •</div>
          <div className="marquee-item">IRONGATE PROPERTIES <span className="marquee-stat">ROAS 5.6x</span> •</div>
          <div className="marquee-item">PINEHURST LUXURY <span className="marquee-stat">Bookings +212%</span> •</div>
          <div className="marquee-item">APEX REAL ESTATE <span className="marquee-stat">ROAS 4.1x</span> •</div>
          <div className="marquee-item">BRIGHTSMILE HOMES <span className="marquee-stat">CPA -38%</span> •</div>
          <div className="marquee-item">SUMMIT DEVELOPERS <span className="marquee-stat">CTR +156%</span> •</div>
        </div>
      </div>

      {/* SOCIAL PROOF SECTION */}
      <section className="social-proof-section">
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

      {/* PRICING SUMMARY SECTION */}
      <section id="pricing-summary">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">EXECUTIVE SUMMARY</div>
            <h2>{proposalData.pricingSummary.heading}</h2>
            <p>{proposalData.pricingSummary.note}</p>
          </div>

          <div className="table-responsive">
            <table className="summary-table">
              <thead>
                <tr>
                  {proposalData.pricingSummary.columns.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proposalData.pricingSummary.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row[0]}</strong></td>
                    <td><span className="price-tag">{row[1]}</span></td>
                    <td><span className="usage-tag">{row[2]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SERVICES DETAILED SCOPE SECTION */}
      <section id="services">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">DETAILED SCOPE</div>
            <h2>Services Breakdown</h2>
            <p>Comprehensive deliverables for each of the 5 modular services below.</p>
          </div>

          {/* SERVICE NAVIGATION TABS */}
          <div className="service-tabs">
            {proposalData.services.map((svc) => (
              <button
                key={svc.id}
                className={activeServiceTab === svc.id ? "active" : ""}
                onClick={() => setActiveServiceTab(svc.id)}
              >
                {svc.title}
              </button>
            ))}
          </div>

          {/* SERVICE TAB CONTENT */}
          {proposalData.services.map((svc) => {
            if (activeServiceTab !== svc.id) return null;

            return (
              <div className="service-scope-card" key={svc.id}>
                <div className="scope-header">
                  <div>
                    <span className="scope-num">SERVICE 0{svc.number}</span>
                    <h3>{svc.title}</h3>
                  </div>

                  {svc.pricing && (
                    <div className="scope-pricing-badge">
                      {svc.pricing.map((p, idx) => (
                        <div key={idx} className={idx === 0 ? "p-main" : "p-sub"}>
                          <strong>{p.label}</strong> {p.value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="service-details-container" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  {svc.sections.map((sec, idx) => (
                    <div className="video-pkg-box" key={idx}>
                      <h4 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "10px", color: "var(--dark)" }}>
                        {sec.heading}
                      </h4>

                      {sec.pricing && (
                        <div style={{ marginBottom: "12px" }}>
                          {sec.pricing.map((pr, pidx) => (
                            <span key={pidx} className="price-tag" style={{ marginRight: "10px" }}>
                              {pr.label} {pr.value}
                            </span>
                          ))}
                        </div>
                      )}

                      {sec.packages && (
                        <div className="table-responsive" style={{ margin: "16px 0" }}>
                          <table className="summary-table">
                            <thead>
                              <tr>
                                {sec.packages.columns.map((c, cidx) => (
                                  <th key={cidx}>{c}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sec.packages.rows.map((r, ridx) => (
                                <tr key={ridx}>
                                  <td><strong>{r[0]}</strong></td>
                                  <td>{r[1]}</td>
                                  <td><span className="price-tag">{r[2]}</span></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {sec.features && (
                        <ul className="scope-list mt-12">
                          {sec.features.map((feat, fidx) => (
                            <li key={fidx}>{feat}</li>
                          ))}
                        </ul>
                      )}

                      {sec.text && (
                        <div className="flow-node flow-node--highlight" style={{ marginTop: "12px" }}>
                          {sec.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CLIENT WEBSITES PORTFOLIO SHOWCASE SECTION */}
      <section id="websites">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">CLIENT PORTFOLIO</div>
            <h2>Websites We've Built</h2>
            <p>High-converting real estate websites &amp; portals built for our clients.</p>
          </div>

          <div className="website-portfolio-grid">
            {clientWebsites.map((site, idx) => (
              <div key={idx} className="website-card">
                <div className="website-browser-frame">
                  <div className="browser-header">
                    <div className="browser-dots">
                      <span className="browser-dot browser-dot--red"></span>
                      <span className="browser-dot browser-dot--yellow"></span>
                      <span className="browser-dot browser-dot--green"></span>
                    </div>
                    <div className="browser-url-bar">{site.domain}</div>
                  </div>
                  <div className="website-preview-image-wrap">
                    <img src={site.url} alt={site.title} className="website-preview-img" />
                    <div className="website-hover-overlay">
                      <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-black-pill" style={{ padding: "10px 20px", fontSize: "13px" }}>
                        Visit Live Site ↗
                      </a>
                    </div>
                  </div>
                </div>

                <div className="website-card-body">
                  <span className="website-category">{site.category}</span>
                  <h3 className="website-card-title">{site.title}</h3>
                  <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" className="website-link">
                    Visit {site.domain} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHORT FORM SAMPLES SHOWCASE */}
      <section id="short-form-samples">
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
                    title={`Video Sample ${idx}`}
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

      {/* COMMERCIAL TERMS SECTION */}
      <section id="terms">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">TRANSPARENCY</div>
            <h2>{proposalData.commercialTerms.heading}</h2>
            <p>Clear, upfront business terms for all digital &amp; AI services.</p>
          </div>

          <div className="terms-grid">
            {proposalData.commercialTerms.items.map((term, idx) => (
              <div className="term-card" key={idx}>
                <div className="term-icon">{term.icon}</div>
                <div className="term-title">{term.title}</div>
                <p>{term.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING & PACKAGES SECTION */}
      <section className="pricing-section" id="calculator">
        <div className="container">
          <div className="section-title">
            <div className="hero-label">— PRICING &amp; PACKAGES</div>
            <h2>Simple plans. No production markups.</h2>
            <p>Choose between our fixed monthly growth plans or custom build your exact package with our live calculator.</p>
          </div>

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

          {pricingMode === 'calc' && <PricingCalculator />}

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

      {/* ORIGINAL FAQ SECTION */}
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

      {/* FINAL CTA & CALENDAR BOOKING */}
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

      {/* ORIGINAL FOOTER */}
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
