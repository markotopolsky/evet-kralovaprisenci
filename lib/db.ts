import { MongoClient, Db } from "mongodb";

const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "evet-veterina";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

/**
 * Get MongoDB client promise
 * Lazy initialization - only connects when first called
 */
function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (clientPromise) {
    return clientPromise;
  }

  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

/**
 * Get the MongoDB database instance
 * Connects once and returns the database selected by MONGODB_DB_NAME
 */
export async function getDb(): Promise<Db> {
  const clientPromise = getClientPromise();
  const client = await clientPromise;
  return client.db(MONGODB_DB_NAME);
}

// Export a function to get client promise (lazy)
export default getClientPromise;
