import { Schema, model, Document } from 'mongoose';

export interface ListInterface extends Document {
    title: string,
    id: string,
    creator: string,
    redirect: string,
    status: boolean,
    date: Date,
}

const List: Schema = new Schema({
    title: String,
    id: String,
    creator: String,
    redirect: String,
    status: Boolean,
    date: Date
})

export default model<ListInterface>('ApiKeys', List);