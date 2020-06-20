import { Schema, model, Document } from 'mongoose';
import { User } from 'discord.js';

export interface ApiKeyInterface extends Document {
    ApiKey: string,
    creator: string,
    uses: number,
    status: boolean,
    date: Date,
}

const ApiKey: Schema = new Schema({
    ApiKey: String,
    creator: String,
    uses: Number,
    status: Boolean,
    date: Date
})

export default model<ApiKeyInterface>('ApiKeys', ApiKey);