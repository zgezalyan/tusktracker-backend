const mongoose = require('mongoose');

const establishConnection = () => {    
    return new Promise(() => {
        const mongoURI = 'mongodb://backend:backSuper12!st@54.80.235.19:27017/tusktracker_dev?authSource=admin';
        try{            
            mongoose.connect(mongoURI, {
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
    });
}

const connectDB = async () => {
    await establishConnection();
};

module.exports = connectDB;