import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Asset from './models/Asset.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Asset.deleteMany();
    console.log('Cleared existing data');

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      department: 'IT Department'
    });
    console.log('✅ Admin created');

    // Create Regular Users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123',
      role: 'user',
      department: 'Sales'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'user123',
      role: 'user',
      department: 'Marketing'
    });
    console.log('✅ Regular users created');

    // Create Sample Assets
    const assets = [
      {
        name: 'Dell Laptop XPS 15',
        category: 'Laptop',
        serialNumber: 'DL-XPS-001',
        purchaseDate: new Date('2024-01-15'),
        cost: 1500,
        warrantyExpiry: new Date('2027-01-15'),
        status: 'Available',
        location: 'IT Store Room'
      },
      {
        name: 'HP Desktop Pro',
        category: 'Desktop',
        serialNumber: 'HP-PRO-002',
        purchaseDate: new Date('2024-02-10'),
        cost: 1200,
        warrantyExpiry: new Date('2027-02-10'),
        status: 'Available',
        location: 'IT Store Room'
      },
      {
        name: 'LG Monitor 27 inch',
        category: 'Monitor',
        serialNumber: 'LG-MON-003',
        purchaseDate: new Date('2024-03-05'),
        cost: 300,
        warrantyExpiry: new Date('2026-03-05'),
        status: 'Available',
        location: 'IT Store Room'
      },
      {
        name: 'Logitech Keyboard',
        category: 'Keyboard',
        serialNumber: 'LOG-KB-004',
        purchaseDate: new Date('2024-01-20'),
        cost: 50,
        warrantyExpiry: new Date('2025-01-20'),
        status: 'Assigned',
        location: 'Sales Department',
        assignedTo: user1._id
      },
      {
        name: 'HP Printer LaserJet',
        category: 'Printer',
        serialNumber: 'HP-PRT-005',
        purchaseDate: new Date('2023-12-01'),
        cost: 800,
        warrantyExpiry: new Date('2026-12-01'),
        status: 'Maintenance',
        location: 'IT Department'
      },
      {
        name: 'Office Desk',
        category: 'Furniture',
        serialNumber: 'DESK-006',
        purchaseDate: new Date('2023-11-15'),
        cost: 400,
        warrantyExpiry: new Date('2028-11-15'),
        status: 'Available',
        location: 'Office Floor 2'
      }
    ];

    // Create assets one by one to trigger pre-save hook
    for (const assetData of assets) {
      await Asset.create(assetData);
    }
    console.log('✅ Sample assets created');

    console.log('\n========================================');
    console.log('🎉 Database seeded successfully!');
    console.log('========================================\n');
    
    console.log('📋 LOGIN CREDENTIALS:\n');
    console.log('👨‍💼 ADMIN ACCOUNT:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('   Role: Admin\n');
    
    console.log('👤 USER ACCOUNTS:');
    console.log('   1. Email: john@example.com');
    console.log('      Password: user123');
    console.log('      Role: User (Sales)\n');
    
    console.log('   2. Email: jane@example.com');
    console.log('      Password: user123');
    console.log('      Role: User (Marketing)\n');
    
    console.log('🌐 ACCESS THE APPLICATION:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   Backend API: http://localhost:5001/api');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
