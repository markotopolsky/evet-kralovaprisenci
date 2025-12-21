"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimalType } from "@/lib/models/AnimalType";

interface AnimalTypesListProps {
  animalTypes: AnimalType[];
}

// Default image for Aktuality card
const AKTUALITY_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=200&fit=crop";

export function AnimalTypesList({ animalTypes }: AnimalTypesListProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {animalTypes.map((animal) => {
        return (
          <Link
            key={animal._id}
            href={`/vase-zvieratko/${animal.slug}`}
            className="card-friendly p-8 text-center group"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors overflow-hidden relative">
              {animal.image && (
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover rounded-full"
                />
              )}
            </div>
            <h2 className="font-semibold text-xl text-text mb-2 group-hover:text-primary transition-colors">
              {animal.name}
            </h2>
            <p className="text-sm text-text-muted">{animal.description}</p>
            <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4">
              Články a rady →
            </span>
          </Link>
        );
      })}

      {/* Aktuality Card */}
      <Link href="/vase-zvieratko/aktuality" className="card-friendly p-8 text-center group">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors overflow-hidden relative">
          <Image
            src={AKTUALITY_IMAGE}
            alt="Aktuality"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <h2 className="font-semibold text-xl text-text mb-2 group-hover:text-primary transition-colors">
          Aktuality
        </h2>
        <p className="text-sm text-text-muted">
          Novinky, varovania a dôležité informácie pre majiteľov zvierat
        </p>
        <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4">
          Zobraziť aktuality →
        </span>
      </Link>
    </div>
  );
}
