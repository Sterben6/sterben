import { Schema, model, Document } from 'mongoose';
import { User } from 'discord.js';
export interface CaseInterface extends Document {
    caseId: String,
    creatorId: String,
    users: {
        defense: Array<User>,
        plaintiff: Array<User>,
        Judges: Array<User>
    }
}
const Case: Schema = new Schema({
    caseId: String,
    creatorId: String,
    users: {
        defense: Array,
        plaintiff: Array,
        Judges: Array
    }
})

export default model<CaseInterface>('Case', Case);