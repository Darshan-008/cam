// simpleCreateAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import "dotenv/config";
import User from '../models/user.js';

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  await mongoose.connect(MONGO_URI);

  const email = "admin@campuscodewar.com"; // your admin email
  const password = "Admin@123"; // your admin password
  const userName = 'admin';
  const name = 'Admin User';

  // Check if admin already exists
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const admin = new User({
    userName,
    email,
    password: hashPassword,
    role: 'admin',
    profile: {
      name,
      bio: 'Administrator account',
      avatarUrl: '',
    },
    preferences: {
      programmingLanguage: 'Python',
      theme: 'light',
    },
  });

  await admin.save();
  console.log(`Admin user created!\nEmail: ${email}\nPassword: ${password}`);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});