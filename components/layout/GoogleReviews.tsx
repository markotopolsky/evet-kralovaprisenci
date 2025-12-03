"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

interface Review {
  author: string;
  rating: number;
  text: { sk: string; de: string };
  date: { sk: string; de: string };
}

const mockReviews: Review[] = [
  {
    author: "Mária K.",
    rating: 5,
    text: {
      sk: "Vynikajúca starostlivosť o nášho psíka. Personál je veľmi príjemný a profesionálny. Určite odporúčam!",
      de: "Hervorragende Betreuung unseres Hundes. Das Personal ist sehr freundlich und professionell. Sehr zu empfehlen!",
    },
    date: { sk: "pred 2 týždňami", de: "vor 2 Wochen" },
  },
  {
    author: "Peter S.",
    rating: 5,
    text: {
      sk: "Najlepšia veterinárna klinika v okolí. Vždy sa o naše mačky postarajú s láskou.",
      de: "Die beste Tierklinik in der Gegend. Unsere Katzen werden immer mit Liebe versorgt.",
    },
    date: { sk: "pred mesiacom", de: "vor einem Monat" },
  },
  {
    author: "Jana M.",
    rating: 5,
    text: {
      sk: "Profesionálny prístup, moderné vybavenie. Som veľmi spokojná so službami.",
      de: "Professioneller Ansatz, moderne Ausstattung. Ich bin sehr zufrieden mit den Dienstleistungen.",
    },
    date: { sk: "pred 2 mesiacmi", de: "vor 2 Monaten" },
  },
];

export function GoogleReviews({
  reviews = mockReviews,
  overallRating = 4.9,
  totalReviews = 127,
}: {
  reviews?: Review[];
  overallRating?: number;
  totalReviews?: number;
}) {
  const { t, language } = useLanguage();

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-[#E6B84C]" : "text-[#E4E4E4]"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="section-padding bg-[#F2F7F5]" aria-labelledby="reviews-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#3C8C80] font-medium mb-4">
            <span>⭐</span>
            {t.reviews.badge}
          </span>
          <h2
            id="reviews-heading"
            className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-4"
          >
            {t.reviews.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(overallRating))}
              <span className="text-2xl font-bold text-[#2A2A2A]">
                {overallRating}
              </span>
            </div>
            <span className="text-[#5C5C5C]">
              {t.reviews.basedOn} {totalReviews} {t.reviews.reviewsCount}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="card-friendly p-6"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-[#3C8C80] rounded-full flex items-center justify-center text-white font-semibold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#2A2A2A]">{review.author}</p>
                  <p className="text-xs text-[#5C5C5C]">{review.date[language]}</p>
                </div>
              </div>
              {renderStars(review.rating)}
              <p className="mt-3 text-[#5C5C5C] text-sm leading-relaxed">
                &ldquo;{review.text[language]}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={siteConfig.googleMaps.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E4E4E4] rounded-xl hover:border-[#3C8C80] transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-[#2A2A2A]">
              {t.reviews.viewAllGoogle}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
