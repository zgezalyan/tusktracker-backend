const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = 'mongodb://backend:backSuper12!st@54.80.235.19:27017/tusktracker_dev?authSource=admin';
    try {        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        console.error(mongoURI);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;