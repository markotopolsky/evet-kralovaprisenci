export interface ClinicStatus {
  forceClosed: boolean;       // True if admin manually closed the clinic today
  forceClosedDate: string;    // Date string (YYYY-MM-DD) to track which day this applies to
  updatedAt?: Date;
}


