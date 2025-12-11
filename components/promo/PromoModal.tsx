"use client";

import { X } from "lucide-react";
import { Promo } from "@/lib/models/Promo";

interface PromoModalProps {
  promo: Promo;
  onClose: () => void;
}

export function PromoModal({ promo, onClose }: PromoModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-2xl w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          aria-label="Zavrieť"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Image */}
        {promo.imageBase64 ? (
          <img
            src={`data:image/png;base64,${promo.imageBase64}`}
            alt="Promo"
            className="w-full h-auto rounded-2xl shadow-2xl"
            onClick={onClose}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <p className="text-xl font-semibold text-gray-900">{promo.barText}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-[#3C8C80] text-white font-medium rounded-lg hover:bg-[#2d6b62] transition-colors"
            >
              Zavrieť
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
