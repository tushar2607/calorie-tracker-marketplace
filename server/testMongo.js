require('dotenv').config();
const mongoose = require('mongoose');

console.log("URI IS:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 2000, 
  family: 4
})
.then(() => {
  console.log("✅ Success!");
  process.exit(0);
})
.catch(err => {
  console.log("❌ Error:", err.message);
  process.exit(1);
});
