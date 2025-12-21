"use client";

import { Stethoscope } from "lucide-react";
import { BasicInfoCards } from "./BasicInfoCards";

export function WhatWeDo() {
  return (
    <section aria-labelledby="what-heading" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="badge mb-4 inline-block">
            <Stethoscope className="w-4 h-4 inline-block mr-2" />
            Something-heading
          </span>
          <h2
            id="what-heading"
            className="text-3xl sm:text-4xl font-bold text-text mb-4"
          >
            Čo robíme
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Poskytujeme komplexnú veterinárnu starostlivosť s dôrazom na prevenciu,
            diagnostiku a liečbu. Naším cieľom je udržať vaše miláčiky zdravé a šťastné.
          </p>
        </div>
        <BasicInfoCards />
      </div>
    </section>
  );
}

