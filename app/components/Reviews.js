"use client";

import { useState, useRef, useEffect } from "react";
import { reviews } from "../data";
import useInView from "../hooks/useInView";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-primary" : "text-border-light"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`flex-shrink-0 w-[340px] sm:w-[380px] p-6 rounded-2xl bg-background-card border border-border hover:border-primary/20 transition-all duration-500 group ${
        isInView ? "animate-fadeInUp" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background text-sm font-bold flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-foreground text-sm">
            {review.name}
          </div>
          <div className="text-xs text-foreground-dim">{review.date}</div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm text-foreground-muted leading-relaxed">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}

export default function Reviews() {
  const [sectionRef, isInView] = useInView();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
    }
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: dir * 400, behavior: "smooth" });
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 ${
            isInView ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <div>
            <span className="badge badge-primary mb-4 text-sm">
              ⭐ Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-3">
              What Our <span className="gradient-text">Guests Say</span>
            </h2>
            <p className="text-foreground-muted text-lg max-w-xl">
              Over 2,400 five-star reviews across Google, Pyszne, and Uber Eats.
            </p>
          </div>

          {/* Scroll arrows */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                canScrollLeft
                  ? "border-border hover:border-primary hover:bg-primary/10 text-foreground cursor-pointer"
                  : "border-border/50 text-foreground-dim cursor-not-allowed"
              }`}
              aria-label="Scroll reviews left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                canScrollRight
                  ? "border-border hover:border-primary hover:bg-primary/10 text-foreground cursor-pointer"
                  : "border-border/50 text-foreground-dim cursor-not-allowed"
              }`}
              aria-label="Scroll reviews right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable reviews */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4"
        >
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "4.9", label: "Average Rating", icon: "⭐" },
            { value: "2,400+", label: "Total Reviews", icon: "💬" },
            { value: "97%", label: "Would Recommend", icon: "👍" },
            { value: "#1", label: "Sushi in Warsaw", icon: "🏅" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-background-card border border-border"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-foreground-dim mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
