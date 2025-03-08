import mongoose, { model, models, Schema } from "mongoose"

interface IBlog extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId; // Reference to User model
}

const BlogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference
}, {
    timestamps: true
    // createdat and updatedat
})

// prevents duplicate models by checking models.Blog   
const Blog = models.Blog || model('Blog', BlogSchema);
export default Blog;