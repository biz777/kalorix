"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Marie L.",
    age: 58,
    location: "Lyon, France",
    text: "Kalorix m'a aidée à retrouver de l'énergie en quelques semaines. L'interface est tellement simple que même ma fille était surprise !",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face&auto=format",
    rating: 5,
  },
  {
    name: "Jean-Pierre M.",
    age: 63,
    location: "Bordeaux, France",
    text: "Enfin une appli pensée pour nous. Je suis mes calories sans me prendre la tête, et j'ai perdu 4 kg en 2 mois.",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face&auto=format",
    rating: 5,
  },
  {
    name: "Isabelle R.",
    age: 55,
    location: "Toulouse, France",
    text: "Les conseils sont vraiment adaptés à mon âge. Je me sens comprise, pas juste un numéro. Je recommande à toutes mes amies !",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&auto=format",
    rating: 5,
  },
  {
    name: "Robert D.",
    age: 67,
    location: "Nantes, France",
    text: "J'avais essayé d'autres applications mais elles étaient trop compliquées. Kalorix c'est clair, direct, et ça marche.",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop&crop=face&auto=format",
    rating: 5,
  },
  {
    name: "Sylvie B.",
    age: 61,
    location: "Strasbourg, France",
    text: "Mon médecin m'avait conseillé de surveiller mon alimentation. Grâce à Kalorix, c'est devenu un réflexe quotidien agréable.",
    avatar:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=80&h=80&fit=crop&crop=face&auto=format",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#F59E0B"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 1l1.85 3.75 4.15.6-3 2.92.71 4.13L8 10.25l-3.71 1.95.71-4.13-3-2.92 4.15-.6L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

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
    const index = (current - 1 + testimonials.length) % testimonials.length;
    goTo(index, "left");
  };

  const next = useCallback(() => {
    const index = (current + 1) % testimonials.length;
    goTo(index, "right");
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section
      style={{
        width: "100%",
        padding: "72px 24px",
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "#16a34a",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Témoignages
        </p>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 700,
            color: "#14532d",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Ils ont transformé leur alimentation
        </h2>
      </div>

      {/* Carousel container */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: "40px 44px",
            boxShadow:
              "0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 40px -8px rgba(0,0,0,0.08)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${direction === "right" ? "-24px" : "24px"})`
              : "translateX(0)",
            minHeight: 220,
          }}
        >
          <StarRating count={t.rating} />

          {/* Quote */}
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "#374151",
              fontStyle: "italic",
              margin: "0 0 28px 0",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: 56,
                lineHeight: 0,
                verticalAlign: "-0.4em",
                color: "#bbf7d0",
                fontFamily: "Georgia, serif",
                marginRight: 4,
              }}
            >
              "
            </span>
            {t.text}
          </p>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={t.avatar}
              alt={t.name}
              width={52}
              height={52}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #dcfce7",
                flexShrink: 0,
              }}
              onError={(e) => {
                // Fallback to colored initials if image fails
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            {/* Fallback avatar (hidden by default) */}
            <div
              style={{
                display: "none",
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#16a34a",
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {t.name.charAt(0)}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#14532d",
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#6b7280",
                  marginTop: 2,
                }}
              >
                {t.age} ans · {t.location}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            marginTop: 32,
          }}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Témoignage précédent"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #16a34a",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              color: "#16a34a",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#16a34a";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#16a34a";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.5 3L5.5 8l5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                aria-label={`Aller au témoignage ${i + 1}`}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: i === current ? "#16a34a" : "#bbf7d0",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Témoignage suivant"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #16a34a",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              color: "#16a34a",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#16a34a";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#16a34a";
            }}
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
