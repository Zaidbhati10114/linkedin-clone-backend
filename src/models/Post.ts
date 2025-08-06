import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    content: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<IPost>('Post', PostSchema);