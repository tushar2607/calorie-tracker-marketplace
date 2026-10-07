require('dotenv').config();
const mongoose = require('mongoose');

console.log("URI IS:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 8000
})
.then(() => {
  console.log("✅ Success! Connected to MongoDB Atlas database:", mongoose.connection.name);
  process.exit(0);
})
.catch(err => {
  console.log("❌ Error:", err.message);
  process.exit(1);
});
