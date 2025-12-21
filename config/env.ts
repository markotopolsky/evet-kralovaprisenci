/**
 * Environment Configuration
 *
 * Centralized environment variable access with type safety and helpers.
 * All environment variables should be accessed through this module.
 */

export const env = {
  // Database
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "evet-veterina",

  // Environment
  NODE_ENV: process.env.NODE_ENV || "development",

  // Base URL
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://evet-kralova.sk",

  // Admin
  ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "evet",

  // Google
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,

  // ==========================================================================
  // HELPER METHODS
  // ==========================================================================

  /**
   * Check if database is configured
   */
  isDatabaseConfigured(): boolean {
    return Boolean(this.MONGODB_URI);
  },

  /**
   * Check if running in production
   */
  isProduction(): boolean {
    return this.NODE_ENV === "production";
  },

  /**
   * Check if running in development
   */
  isDevelopment(): boolean {
    return this.NODE_ENV === "development";
  },

  /**
   * Get the base URL with optional path
   */
  getUrl(path = ""): string {
    return `${this.BASE_URL}${path}`;
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Env = typeof env;
