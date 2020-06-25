
async function connect() {
    const mongoose = require('mongoose')
    await mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

;

async function SideBar() {
    await connect();
    console.log('hi');
}