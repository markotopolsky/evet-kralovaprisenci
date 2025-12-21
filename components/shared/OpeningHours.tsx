"use client";

import { text } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

type Variant = "compact" | "full" | "table" | "grid";

interface OpeningHoursProps {
  variant?: Variant;
  className?: string;
  showTitle?: boolean;
}

// =============================================================================
// HOURS DATA
// =============================================================================

const hoursData = [
  { label: text.hours.monWed, hours: "9:00 - 17:00" },
  { label: text.hours.tueThuFri, hours: "13:00 - 20:00" },
  { label: text.hours.saturday, hours: "11:00 - 15:00" },
  { label: text.hours.sunday, hours: "18:00 - 20:00" },
];

// =============================================================================
// COMPACT VARIANT
// =============================================================================

function CompactHours({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs", className)}>
      <span>{text.hours.monWed}:</span>
      <span>9:00 - 17:00</span>
      <span>{text.hours.tueThuFri}:</span>
      <span>13:00 - 20:00</span>
      <span>{text.hours.saturday}:</span>
      <span>11:00 - 15:00</span>
      <span>{text.hours.sunday}:</span>
      <span>18:00 - 20:00</span>
    </div>
  );
}

// =============================================================================
// FULL VARIANT
// =============================================================================

function FullHours({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2 text-sm", className)}>
      {hoursData.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span className="font-medium text-text">{item.label}</span>
          <span className="text-text-muted">{item.hours}</span>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// GRID VARIANT
// =============================================================================

function GridHours({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2 text-sm", className)}>
      {hoursData.map((item, index) => (
        <div key={index} className="bg-primary-light p-3 rounded-lg">
          <span className="block font-medium text-primary uppercase text-xs mb-1">
            {item.label}
          </span>
          <span className="text-text">{item.hours}</span>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// TABLE VARIANT
// =============================================================================

function TableHours({ className }: { className?: string }) {
  return (
    <div className={cn("grid sm:grid-cols-2 gap-6", className)}>
      <div className="text-center p-4 bg-bg-light rounded-lg">
        <p className="font-semibold text-text mb-1">Pondelok, Streda</p>
        <p className="text-text-muted">9:00 - 17:00</p>
      </div>
      <div className="text-center p-4 bg-bg-light rounded-lg">
        <p className="font-semibold text-text mb-1">Utorok, Štvrtok, Piatok</p>
        <p className="text-text-muted">13:00 - 20:00</p>
      </div>
      <div className="text-center p-4 bg-bg-light rounded-lg">
        <p className="font-semibold text-text mb-1">Sobota</p>
        <p className="text-text-muted">11:00 - 15:00</p>
      </div>
      <div className="text-center p-4 bg-bg-light rounded-lg">
        <p className="font-semibold text-text mb-1">Nedeľa</p>
        <p className="text-text-muted">18:00 - 20:00</p>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function OpeningHours({
  variant = "full",
  className,
  showTitle = false,
}: OpeningHoursProps) {
  const content = (() => {
    switch (variant) {
      case "compact":
        return <CompactHours className={className} />;
      case "grid":
        return <GridHours className={className} />;
      case "table":
        return <TableHours className={className} />;
      case "full":
      default:
        return <FullHours className={className} />;
    }
  })();

  if (showTitle) {
    return (
      <div>
        <h3 className="font-semibold text-lg text-text mb-4">{text.cards.openingHours}</h3>
        {content}
      </div>
    );
  }

  return content;
}

export default OpeningHours;
