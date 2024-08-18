//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('../models/Item');
const Comment = require('../models/Comment');

const seedDatabase = async () => {
  try {
    // Retrieve MongoDB URL from environment variables
    const mongoURI = process.env.MONGODB_URL || 'mongodb://mongodb-node:27017/anythink-market';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Comment.deleteMany({});

    // Seed Users
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push(new User({ name: `User_${i}`, email: `user_${i}@mail.com` }));
    }
    await User.insertMany(users);

    // Seed Products
    const products = [];
    for (let i = 1; i <= 100; i++) {
      products.push(new Product({ name: `Product_${i}`, description: `Description_${i}`, price: Math.random() * 100 }));
    }
    await Product.insertMany(products);

    // Seed Comments
    const comments = [];
    for (let i = 1; i <= 100; i++) {
      comments.push(new Comment({ userId: users[Math.floor(Math.random() * 100)]._id, productId: products[Math.floor(Math.random() * 100)]._id, content: `Comment_${i}` }));
    }
    await Comment.insertMany(comments);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();