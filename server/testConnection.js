const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://taskflowuser:taskflow2026@mongodb.ppmzqvi.mongodb.net/?appName=MongoDB"
)
.then(() => {
  console.log("✅ CONNECTED");
  process.exit();
})
.catch(err => {
  console.log("❌ ERROR:");
  console.log(err);
  process.exit();
});