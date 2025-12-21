"use client";

import { useState } from "react";
import { text } from "@/lib/i18n/translations";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateFAQSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

// =============================================================================
// FAQ ITEM COMPONENT
// =============================================================================

interface FAQItemComponentProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItemComponent({ question, answer, isOpen, onToggle, index }: FAQItemComponentProps) {
  return (
    <div className="border border-border-light rounded-xl overflow-hidden bg-white" role="listitem">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-semibold text-text pr-4">{question}</span>
        <span
          className={cn(
            "text-primary transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96" : "max-h-0"
        )}
        role="region"
      >
        <p className="px-6 pb-4 text-text-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN FAQ COMPONENT
// =============================================================================

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaFaqs = text.faq.items.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <section className="section-padding bg-white" aria-labelledby="faq-heading">
      <JsonLd data={generateFAQSchema(schemaFaqs)} />
      <div className="container-friendly">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light rounded-full text-primary font-medium mb-4">
            <HelpCircle className="w-4 h-4" /> {text.faq.badge}
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-text mb-4">
            {text.faq.title}
          </h2>
          <p className="text-xl text-text-muted">{text.faq.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4" role="list">
          {text.faq.items.map((faq, index) => (
            <FAQItemComponent
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
