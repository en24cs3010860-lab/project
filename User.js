import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type:String, required:true, trim:true, maxlength:80 },
  email: { type:String, required:true, unique:true, lowercase:true, trim:true, maxlength:254 },
  passwordHash: { type:String, required:true, select:false },
  phone: { type:String, trim:true, maxlength:30 }, avatar: { type:String, maxlength:1000 },
  role: { type:String, enum:['USER','ADMIN'], default:'USER' }, isActive: { type:Boolean, default:true }, emailVerified: { type:Boolean, default:false }
}, { timestamps:true });
userSchema.index({ email:1 }, { unique:true });
export const User = mongoose.model('User', userSchema);
