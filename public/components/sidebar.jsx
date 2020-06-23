import React from "react";
import "../static.css";
import config from '../../config.json';
import { List } from "../../dist/models";
import mongoose from 'mongoose';


async function connect() {
    await mongoose.connect(config.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});
};

async function SideBar() {
    await connect();

    
}

export default SideBar;