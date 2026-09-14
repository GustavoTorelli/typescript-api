import "dotenv/config";
import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL;

    if (!url) {
      throw new Error("MONGODB_URL is not defined!");
    }

    const client = new Mongo(url);

    await client.connect();

    const db = client.db("users-db");

    await db.collection("users").createIndex({ email: 1 }, { unique: true });

    this.client = client;
    this.db = db;

    console.log("Server connected to MongoDB!");
  },
};
