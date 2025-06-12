// simpleCreateAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import "dotenv/config";
import User from '../models/user.js';

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      email: "admin@campuscodewar.com",
      password: "Admin@123",
      userName: "admin",
      name: "Admin User",
      role: "admin"
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const admin = new User({
      userName: adminData.userName,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
      profile: {
        name: adminData.name,
        bio: 'System Administrator',
        avatarUrl: '',
      },
      preferences: {
        theme: 'dark',
        programmingLanguage: 'JavaScript'
      }
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();