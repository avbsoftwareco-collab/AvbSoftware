"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Star, Send, ThumbsUp, MessageCircle, MapPin, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

interface Review {
  id: string;
  guest_name: string;
  guest_location?: string;
  rating: number;
  title?: string;
  comment: string;
  stay_type?: string;
  created_at: string;
  approved: boolean;
}

export default function ReviewsPage({ client, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [filterRating, setFilterRating] = useState<number>(0);

  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_location: "",
    rating: 5,
    title: "",
    comment: "",
    stay_type: "Couple",
  });

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rsv-show");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rsv-hide").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reviews]);

  // ═══ Fetch Reviews from Supabase ═══
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("resort_reviews")
        .select("*")
        .eq("client_id", client.id)
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      // Show default reviews from client.reviews if Supabase empty
      if (client.reviews && client.reviews.length > 0) {
        setReviews(
          client.reviews.map((r: any, i: number) => ({
            id: `default-${i}`,
            guest_name: r.name,
            guest_location: r.role || "",
            rating: r.rating || 5,
            comment: r.text,
            created_at: new Date().toISOString(),
            approved: true,
          }))
        );
      }
    }
    setLoading(false);
  };

  // ═══ Submit Review ═══
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("resort_reviews").insert([
        {
          client_id: client.id,
          guest_name: formData.guest_name,
          guest_email: formData.guest_email,
          guest_location: formData.guest_location,
          rating: formData.rating,
          title: formData.title,
          comment: formData.comment,
          stay_type: formData.stay_type,
          approved: false, // Needs admin approval
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        guest_name: "",
        guest_email: "",
        guest_location: "",
        rating: 5,
        title: "",
        comment: "",
        stay_type: "Couple",
      });

      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 3000);
    } catch (err: any) {
      alert("Error: " + err.message);
    }
    setSubmitting(false);
  };

  // Calculate stats
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const filteredReviews =
    filterRating === 0 ? reviews : reviews.filter((r) => r.rating === filterRating);

  const heroImage =
    (client as any).reviews_hero_image ||
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80";

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: pageLoaded ? "scale(1)" : "scale(1.2)",
            transition: "transform 2s ease",
          }}
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <div className="relative z-[4] h-full flex items-center justify-center text-center px-6">
          <div className="max-w-[1000px]">
            <div
              className="inline-flex items-center gap-3 mb-6 px-5 sm:px-6 py-2 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid var(--theme-border)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 1.2s, transform 1s ease 1.2s",
              }}
            >
              <div className="hidden sm:block h-px w-12" style={{ background: "var(--theme-primary)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600 }}>
                ✦ Guest Stories ✦
              </span>
              <div className="hidden sm:block h-px w-12" style={{ background: "var(--theme-primary)" }} />
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 7vw, 96px)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-2px",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                lineHeight: 1.05,
                marginBottom: "20px",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 1.4s ease 1.4s, transform 1.4s ease 1.4s",
              }}
            >
              What Our{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--theme-primary)",
                }}
              >
                Guests Say
              </em>
            </h1>

            <p
              className="max-w-2xl mx-auto"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.8vw, 22px)",
                color: "#fff",
                opacity: pageLoaded ? 1 : 0,
                transition: "opacity 1s ease 1.6s",
              }}
            >
              Real stories from real guests who experienced our magic
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          OVERALL RATING STATS
      ═══════════════════════════════════ */}
      <section className="py-20 px-5 -mt-16 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 sm:p-12 rounded-3xl rsv-hide"
            style={{
              background: "var(--theme-bg-card)",
              border: "1px solid var(--theme-border)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
            }}
          >
            {/* Average Rating */}
            <div className="text-center lg:border-r lg:pr-8" style={{ borderColor: "var(--theme-border)" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(60px, 8vw, 96px)",
                  fontWeight: 700,
                  color: "var(--theme-primary)",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                {avgRating}
              </div>
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-5 h-5"
                    style={{
                      color: "var(--theme-primary)",
                      fill: s <= Math.round(parseFloat(avgRating)) ? "var(--theme-primary)" : "transparent",
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--theme-text-muted)", fontWeight: 600 }}>
                Based on {reviews.length} reviews
              </div>
            </div>

            {/* Rating breakdown */}
            <div className="lg:border-r lg:pr-8" style={{ borderColor: "var(--theme-border)" }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--theme-text)",
                  marginBottom: "16px",
                }}
              >
                Rating Breakdown
              </h3>
              {ratingCounts.map(({ star, count }) => {
                const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 w-12">
                      <span style={{ fontSize: "13px", fontWeight: 600 }}>{star}</span>
                      <Star className="w-3 h-3 fill-current" style={{ color: "var(--theme-primary)" }} />
                    </div>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--theme-bg-2)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percent}%`, background: "var(--theme-primary)" }}
                      />
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--theme-text-muted)", minWidth: "30px", textAlign: "right" }}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center flex flex-col justify-center">
              <ThumbsUp className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--theme-primary)" }} />
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--theme-text)",
                  marginBottom: "12px",
                }}
              >
                Share Your Story
              </h3>
              <p style={{ fontSize: "13px", color: "var(--theme-text-muted)", marginBottom: "16px" }}>
                Have you stayed with us? Tell others about your experience.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[2px] transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: "var(--theme-primary)",
                  color: "var(--theme-bg)",
                }}
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FILTER + REVIEWS LIST
      ═══════════════════════════════════ */}
      <section className="py-16 px-5">
        <div className="max-w-[1200px] mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 rsv-hide">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: "var(--theme-text)",
              }}
            >
              All Reviews
            </h2>
            <div className="flex flex-wrap gap-2">
              {[0, 5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(star)}
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                  style={{
                    background: filterRating === star ? "var(--theme-primary)" : "transparent",
                    color: filterRating === star ? "var(--theme-bg)" : "var(--theme-text)",
                    border: `1px solid ${filterRating === star ? "var(--theme-primary)" : "var(--theme-border)"}`,
                  }}
                >
                  {star === 0 ? "All" : (
                    <>
                      {star} <Star className="w-3 h-3 fill-current" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <div className="text-4xl animate-spin">⏳</div>
              <p style={{ color: "var(--theme-text-muted)", marginTop: "16px" }}>Loading reviews...</p>
            </div>
          )}

          {/* No reviews */}
          {!loading && filteredReviews.length === 0 && (
            <div className="text-center py-20">
              <MessageCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--theme-primary)", opacity: 0.5 }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "20px", color: "var(--theme-text-muted)" }}>
                No reviews yet. Be the first to share your story!
              </p>
            </div>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review, i) => (
              <div
                key={review.id}
                className="p-7 rounded-2xl rsv-hide transition-all hover:-translate-y-1"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                  transitionDelay: `${(i % 6) * 0.1}s`,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--theme-primary)",
                        color: "var(--theme-bg)",
                      }}
                    >
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "var(--theme-text)",
                        }}
                      >
                        {review.guest_name}
                      </div>
                      {review.guest_location && (
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" style={{ color: "var(--theme-primary)" }} />
                          <span style={{ fontSize: "12px", color: "var(--theme-text-muted)" }}>
                            {review.guest_location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4"
                        style={{
                          color: "var(--theme-primary)",
                          fill: s <= review.rating ? "var(--theme-primary)" : "transparent",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Title */}
                {review.title && (
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--theme-text)",
                      marginBottom: "10px",
                    }}
                  >
                    "{review.title}"
                  </h4>
                )}

                {/* Comment */}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "var(--theme-text-muted)",
                    marginBottom: "16px",
                  }}
                >
                  {review.comment}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--theme-border)" }}>
                  {review.stay_type && (
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider"
                      style={{
                        background: "rgba(212,175,55,0.15)",
                        color: "var(--theme-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {review.stay_type} Stay
                    </span>
                  )}
                  <span style={{ fontSize: "11px", color: "var(--theme-text-muted)" }}>
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          REVIEW FORM MODAL
      ═══════════════════════════════════ */}
      {showForm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
          onClick={() => setShowForm(false)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden my-8"
            style={{
              background: "var(--theme-bg-card)",
              border: "1px solid var(--theme-border)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success */}
            {submitted ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">✨</div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "var(--theme-text)",
                    marginBottom: "10px",
                  }}
                >
                  Thank You!
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "18px", color: "var(--theme-text-muted)" }}>
                  Your review has been submitted. It will appear after admin approval.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-8 border-b" style={{ borderColor: "var(--theme-border)" }}>
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.3)", color: "#fff" }}
                  >
                    ✕
                  </button>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "var(--theme-text)",
                      marginBottom: "8px",
                    }}
                  >
                    Share Your{" "}
                    <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--theme-primary)" }}>
                      Experience
                    </em>
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--theme-text-muted)" }}>
                    Help others discover the magic of our resort
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                  {/* Rating */}
                  <div>
                    <label style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                      Your Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: s })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className="w-10 h-10"
                            style={{
                              color: "var(--theme-primary)",
                              fill: s <= formData.rating ? "var(--theme-primary)" : "transparent",
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      className="px-5 py-3 rounded-xl outline-none"
                      style={{
                        background: "var(--theme-bg-2)",
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text)",
                        fontSize: "14px",
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      value={formData.guest_email}
                      onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                      className="px-5 py-3 rounded-xl outline-none"
                      style={{
                        background: "var(--theme-bg-2)",
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Location (e.g. Mumbai)"
                      value={formData.guest_location}
                      onChange={(e) => setFormData({ ...formData, guest_location: e.target.value })}
                      className="px-5 py-3 rounded-xl outline-none"
                      style={{
                        background: "var(--theme-bg-2)",
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text)",
                        fontSize: "14px",
                      }}
                    />
                    <select
                      value={formData.stay_type}
                      onChange={(e) => setFormData({ ...formData, stay_type: e.target.value })}
                      className="px-5 py-3 rounded-xl outline-none"
                      style={{
                        background: "var(--theme-bg-2)",
                        border: "1px solid var(--theme-border)",
                        color: "var(--theme-text)",
                        fontSize: "14px",
                      }}
                    >
                      <option value="Couple">Couple</option>
                      <option value="Family">Family</option>
                      <option value="Solo">Solo</option>
                      <option value="Business">Business</option>
                      <option value="Friends">Friends</option>
                      <option value="Honeymoon">Honeymoon</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Review Title (e.g. Amazing Stay!)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl outline-none"
                    style={{
                      background: "var(--theme-bg-2)",
                      border: "1px solid var(--theme-border)",
                      color: "var(--theme-text)",
                      fontSize: "14px",
                    }}
                  />

                  <textarea
                    required
                    placeholder="Tell us about your experience... *"
                    rows={5}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl outline-none resize-none"
                    style={{
                      background: "var(--theme-bg-2)",
                      border: "1px solid var(--theme-border)",
                      color: "var(--theme-text)",
                      fontSize: "14px",
                    }}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full font-bold uppercase tracking-[3px] text-xs transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                    style={{
                      background: "var(--theme-primary)",
                      color: "var(--theme-bg)",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Submitting..." : (
                      <>
                        <Send className="w-4 h-4" /> Submit Review
                      </>
                    )}
                  </button>

                  <p style={{ fontSize: "11px", color: "var(--theme-text-muted)", textAlign: "center", fontStyle: "italic" }}>
                    Your review will be visible after admin approval
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}