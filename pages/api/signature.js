import { MongoClient, ServerApiVersion } from "mongodb";

const { DB_URI, DB_NAME, DB_COLLECTION } = process.env;

export default async function handler(req, res) {
  try {
    const client = new MongoClient(DB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    if (req.method === "GET") {
      await client.connect();
      const collection = client.db(DB_NAME).collection(DB_COLLECTION);
      const result = await collection.find({}).toArray();
      //console.log(result);
      return res.status(200).json({ result });
    }

    if (req.method === "POST") {
      await client.connect().catch((e) => {
        console.log(e, "post sig error");
        if (e.code === "EREFUSED") {
          return void res
            .status(500)
            .json({ message: "Mongo server EREFUSED" });
        }
      });

      const { signature, color } = req.body;
      const collection = client.db(DB_NAME).collection(DB_COLLECTION);
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      collection.insertOne({
        ip,
        signature,
        color,
      });

      res.status(200).json({ message: "ok" });
    }
  } catch {
    res.end();
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 15,
};
