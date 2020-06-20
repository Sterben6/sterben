import { Schema, model, Document } from 'mongoose';

export interface ApiKeyInterface extends Document {
    ApiKey: string,
    user: string,
    creator: string,
    uses: number,
    status: boolean,
    date: Date,
}

const ApiKey: Schema = new Schema({
    ApiKey: String,
    user: String,
    creator: String,
    uses: Number,
    status: Boolean,
    date: Date
})

export default model<ApiKeyInterface>('ApiKeys', ApiKey);