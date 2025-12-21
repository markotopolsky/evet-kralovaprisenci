"use client";

import { text } from "@/lib/i18n/translations";
import { Heart } from "@/lib/icons";
import Image from "next/image";

// =============================================================================
// VALUE CARD COMPONENT
// =============================================================================

interface ValueCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

function ValueCard({ imageUrl, title, description }: ValueCardProps) {
  return (
    <div className="card-friendly p-6 text-center group">
      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary-light group-hover:ring-primary transition-all duration-300">
        <Image
          src={imageUrl}
          alt={title}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg text-text mb-2">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function WhyWeDoIt() {
  return (
    <section className="section-padding bg-white" aria-labelledby="why-heading">
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="badge mb-4 inline-flex items-center gap-2">
            <Heart className="w-4 h-4" /> {text.whyWeDoIt.badge}
          </span>
          <h2 id="why-heading" className="text-3xl sm:text-4xl font-bold text-text mb-6">
            {text.whyWeDoIt.title}
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">{text.whyWeDoIt.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {text.whyWeDoIt.values.map((value, index) => (
            <ValueCard
              key={index}
              imageUrl={value.image}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
