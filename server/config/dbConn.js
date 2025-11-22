import mongoose from "mongoose";

export const dbConn = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {dbName: "hrms-sme"});
  } catch (error) {
    throw new Error(error);
  }
};

export const dbConnEvents = () => {
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  mongoose.connection.on("disconnected", () => console.log("disconnected"));
  mongoose.connection.on("reconnected", () => console.log("reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
  mongoose.connection.on("close", () => console.log("close"));
};
