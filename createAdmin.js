const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

(async () => {
  try {
    const admins = await Admin.find({}, { email: 1 });
    console.log('✅ Existing Admins:', admins);
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    mongoose.disconnect();
  }
})();
