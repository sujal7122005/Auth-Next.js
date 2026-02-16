
import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDb Connected Successfully');

        const connection = mongoose.connection;
        connection.on('error', (err) => {
            console.error('MongoDb Connection Error:', err);
        });
        connection.on('connected', () => {
            console.log('MongoDb Connection Established');
        });

    } catch (error) {
        console.log('MongoDb Connection Error', error);
        throw error;
    }
};

export default connectToDatabase;