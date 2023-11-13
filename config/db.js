const mongoose = require('mongoose');

const establishConnection = () => {    
    return new Promise(() => {
        const mongoURI = process.env.MONGO_URI;        
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