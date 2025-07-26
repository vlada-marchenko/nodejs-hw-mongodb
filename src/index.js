
import mongoose from "mongoose";
import { setUpServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { ContactCollection } from "./db/models/contact.js";

const bootstrap = async () => {
  await initMongoConnection();
  console.log("Mongo connected to DB:", mongoose.connection.name);

  const count = await ContactCollection.estimatedDocumentCount();
  const first = await ContactCollection.findOne().lean();
  console.log("contacts count:", count);
  console.log("first contact sample:", first);

  setUpServer();
};

bootstrap();