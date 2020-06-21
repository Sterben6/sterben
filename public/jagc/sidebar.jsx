import React from "react";
import "../static.css";
import config from '../../config.json';
import { List } from "../../dist/models";

async function connect() {
    await mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true});

}
async function SideBar() {

await connect();

    return (
        /*
        * stuff will go here soon
        *
        *
        *
        *
        * */
        null
);
}

export default SideBar;