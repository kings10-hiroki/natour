const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('unhandledRejection', err => {
    const fullMessage = err.message;
    const errmsgStart = fullMessage.indexOf('errmsg:') + 8; // Find errmsg inside message
    const errmsgStop = fullMessage.indexOf(',', errmsgStart); // Find first comma after that
    const errmsgLen = errmsgStop - errmsgStart;
    const errorText = fullMessage.substr(errmsgStart, errmsgLen);
    // console.log(err.name);
    // console.log(errorText);
    // console.log('UNHANDLED REJECTION! Shutting down!');
    process.exit(1);
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// mongoose.connect(process.env.DATABASE_LOCAL, {
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection succesful'));

const port = process.env.PORT || 3000;
const server = app.listen(3000, () => {
    // console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    const fullMessage = err.message;
    const errmsgStart = fullMessage.indexOf('errmsg:') + 8; // Find errmsg inside message
    const errmsgStop = fullMessage.indexOf(',', errmsgStart); // Find first comma after that
    const errmsgLen = errmsgStop - errmsgStart;
    const errorText = fullMessage.substr(errmsgStart, errmsgLen);
    // console.log(err.name);
    // console.log(errorText);
    // console.log('UNHANDLED REJECTION! Shutting down!');
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated!');
    });
});

