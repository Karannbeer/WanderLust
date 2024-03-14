const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65f2c5c4f0170d92a57b5854",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// async function main() {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("Connected to the database");
//     await initDB();
//   } catch (err) {
//     console.error("Error connecting to the database:", err);
//   }
// }

// async function initDB() {
//   try {
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
//   } catch (err) {
//     console.error("Error initializing data:", err);
//   }
// }

// main();
