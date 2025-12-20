
const mongoose = require('mongoose');
const { MONGO_URI } = require('./server-config');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');

        // DB Warmup Logic
        console.log('Starting DB Warmup...');
        const Pokemon = require('../models/pokemon');
        
        // 1. Warm up indexes and connection pool with a count
        const count = await Pokemon.countDocuments();
        
        // 2. Fetch first few records to load into buffer cache
        await Pokemon.find().limit(20).lean();
        
        // 3. Warm up the text index by performing a small search
        await Pokemon.find({ $text: { $search: "pikachu" } }).limit(1).lean();

        console.log(`DB Warmup complete. Total Pokémon in records: ${count}`);
    }
    catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;