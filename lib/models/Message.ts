import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  name: string;
  phone: string;
  message: string;
  productId?: string;
  isRead?: boolean;
}

const MessageSchema = new Schema<IMessage>({
  name: String,
  phone: String,
  message: String,
  productId: String,
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);