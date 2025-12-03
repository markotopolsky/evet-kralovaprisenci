// Environment configuration with fallbacks
export const env = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // Helper to check if database is configured
  isDatabaseConfigured(): boolean {
    return Boolean(this.MONGODB_URI);
  },
  
  // Helper to check if running in production
  isProduction(): boolean {
    return this.NODE_ENV === "production";
  },
  
  // Helper to check if running in development
  isDevelopment(): boolean {
    return this.NODE_ENV === "development";
  },
};

