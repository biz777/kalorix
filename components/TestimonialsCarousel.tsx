"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/app/providers";

type Lang = "fr" | "en" | "es";

const testimonialsByLang: Record<Lang, {
  name: string; age: number; location: string; text: string; avatar: string; rating: number;
}[]> = {
  fr: [
    {
      name: "Marie L.", age: 58, location: "Chicago, USA",
      text: "Kalorix m'a aidée à retrouver de l'énergie en quelques semaines. L'interface est tellement simple que même ma fille était surprise !",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Jean-Pierre M.", age: 63, location: "New York, USA",
      text: "Enfin une appli pensée pour nous. Je suis mes calories sans me prendre la tête, et j'ai perdu 4 kg en 2 mois.",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Isabelle R.", age: 55, location: "Miami, USA",
      text: "Les conseils sont vraiment adaptés à mon âge. Je me sens comprise, pas juste un numéro. Je recommande à toutes mes amies !",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Robert D.", age: 67, location: "Los Angeles, USA",
      text: "J'avais essayé d'autres applications mais elles étaient trop compliquées. Kalorix c'est clair, direct, et ça marche.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Sylvie B.", age: 61, location: "Houston, USA",
      text: "Mon médecin m'avait conseillé de surveiller mon alimentation. Grâce à Kalorix, c'est devenu un réflexe quotidien agréable.",
      avatar: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
  ],
  en: [
    {
      name: "Margaret T.", age: 58, location: "Chicago, USA",
      text: "Kalorix helped me regain my energy within just a few weeks. The interface is so simple, even my daughter was impressed!",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "James P.", age: 63, location: "New York, USA",
      text: "Finally an app made for people like us. I track my calories without any hassle, and I've lost 9 lbs in 2 months.",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Susan R.", age: 55, location: "Miami, USA",
      text: "The advice is truly tailored to my age. I feel understood, not just a number. I recommend it to all my friends!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Robert D.", age: 67, location: "Los Angeles, USA",
      text: "I tried other apps but they were too complicated. Kalorix is clear, straightforward, and it works.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Linda B.", age: 61, location: "Houston, USA",
      text: "My doctor told me to watch what I eat. Thanks to Kalorix, it's become a pleasant daily habit.",
      avatar: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
  ],
  es: [
    {
      name: "María L.", age: 58, location: "Chicago, USA",
      text: "Kalorix me ayudó a recuperar energía en pocas semanas. ¡La interfaz es tan sencilla que hasta mi hija se sorprendió!",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Juan P.", age: 63, location: "New York, USA",
      text: "Por fin una app pensada para nosotros. Controlo mis calorías sin complicaciones y he perdido 4 kg en 2 meses.",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Isabel R.", age: 55, location: "Miami, USA",
      text: "Los consejos están realmente adaptados a mi edad. Me siento comprendida, no solo un número. ¡Se lo recomiendo a todas mis amigas!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Roberto D.", age: 67, location: "Los Angeles, USA",
      text: "Probé otras aplicaciones pero eran demasiado complicadas. Kalorix es clara, directa y funciona.",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Silvia B.", age: 61, location: "Houston, USA",
      text: "Mi médico me recomendó vigilar mi alimentación. Gracias a Kalorix, se ha convertido en un hábito diario agradable.",
      avatar: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
  ],
};

const labels: Record<Lang, { section: string; title: string; age: string; prev: string; next: string; dot: string }> = {
  fr: { section: "Témoignages", title: "Ils ont transformé leur alimentation", age: "ans", prev: "Témoignage précédent", next: "Témoignage suivant", dot: "Aller au témoignage" },
  en: { section: "Testimonials", title: "They transformed their nutrition", age: "years old", prev: "Previous testimonial", next: "Next testimonial", dot: "Go to testimonial" },
  es: { section: "Testimonios", title: "Transformaron su alimentación", age: "años", prev: "Testimonio anterior", next: "Testimonio siguiente", dot: "Ir al testimonio" },
};

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1l1.85 3.75 4.15.6-3 2.92.71 4.13L8 10.25l-3.71 1.95.71-4.13-3-2.92 4.15-.6L8 1z" />
        </svg>
      ))}
    </div>
  );
}

interface Props {
  lang: Lang;
}

export default function TestimonialsCarousel({ lang }: Props) {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const testimonials = testimonialsByLang[lang];
  const lbl = labels[lang];

  // Reset to first slide when language changes
  useEffect(() => {
    setCurrent(0);
  }, [lang]);

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating]
  );

  const prev = () => {
    goTo((current - 1 + testimonials.length) % testimonials.length, "left");
  };

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, "right");
  }, [current, goTo, testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  // Dark mode colors
  const sectionBg   = isDark ? "linear-gradient(135deg, #0a1f14 0%, #0f2d1c 100%)" : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)";
  const cardBg      = isDark ? "#1a2e22" : "#ffffff";
  const cardShadow  = isDark ? "0 4px 6px -1px rgba(0,0,0,0.4), 0 20px 40px -8px rgba(0,0,0,0.5)" : "0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 40px -8px rgba(0,0,0,0.08)";
  const quoteColor  = isDark ? "#d1fae5" : "#374151";
  const nameColor   = isDark ? "#a7f3d0" : "#14532d";
  const metaColor   = isDark ? "#6ee7b7" : "#6b7280";
  const titleColor  = isDark ? "#a7f3d0" : "#14532d";
  const sectionLabel = isDark ? "#4ade80" : "#16a34a";
  const bigQuote    = isDark ? "#166534" : "#bbf7d0";
  const dotInactive = isDark ? "#166534" : "#bbf7d0";

  return (
    <section
      style={{
        width: "100%",
        padding: "72px 24px",
        background: sectionBg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        transition: "background 0.3s",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: sectionLabel, textTransform: "uppercase", marginBottom: 10 }}>
          {lbl.section}
        </p>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: titleColor, margin: 0, lineHeight: 1.2, transition: "color 0.3s" }}>
          {lbl.title}
        </h2>
      </div>

      {/* Carousel container */}
      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
        {/* Card */}
        <div
          style={{
            background: cardBg,
            borderRadius: 20,
            padding: "40px 44px",
            boxShadow: cardShadow,
            transition: "opacity 0.3s ease, transform 0.3s ease, background 0.3s",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? `translateX(${direction === "right" ? "-24px" : "24px"})` : "translateX(0)",
            minHeight: 220,
          }}
        >
          <StarRating count={t.rating} />

          <p style={{ fontSize: 18, lineHeight: 1.65, color: quoteColor, fontStyle: "italic", margin: "0 0 28px 0", position: "relative", transition: "color 0.3s" }}>
            <span style={{ fontSize: 56, lineHeight: 0, verticalAlign: "-0.4em", color: bigQuote, fontFamily: "Georgia, serif", marginRight: 4 }}>"</span>
            {t.text}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={t.avatar}
              alt={t.name}
              width={52}
              height={52}
              style={{ borderRadius: "50%", objectFit: "cover", border: "3px solid #dcfce7", flexShrink: 0 }}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div style={{ display: "none", width: 52, height: 52, borderRadius: "50%", background: "#16a34a", color: "#fff", fontSize: 18, fontWeight: 700, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {t.name.charAt(0)}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: nameColor, transition: "color 0.3s" }}>{t.name}</p>
              <p style={{ margin: 0, fontSize: 13, color: metaColor, marginTop: 2, transition: "color 0.3s" }}>
                {t.age} {lbl.age} · {t.location}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 32 }}>
          <button
            onClick={prev}
            aria-label={lbl.prev}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #16a34a", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", color: "#16a34a" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#16a34a"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.5 3L5.5 8l5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                aria-label={`${lbl.dot} ${i + 1}`}
                style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === current ? "#16a34a" : dotInactive, cursor: "pointer", padding: 0, transition: "all 0.3s ease" }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label={lbl.next}
            style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #16a34a", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", color: "#16a34a" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#16a34a"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
