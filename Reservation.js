import mongoose from 'mongoose';
const reservationSchema = new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},showId:{type:mongoose.Schema.Types.ObjectId,ref:'Show',required:true,index:true},seatNumbers:{type:[String],required:true},status:{type:String,enum:['ACTIVE','CONSUMED','EXPIRED','CANCELLED'],default:'ACTIVE'},expiresAt:{type:Date,required:true,index:true},bookingId:{type:mongoose.Schema.Types.ObjectId,ref:'Booking',default:null}},{timestamps:true});
reservationSchema.index({showId:1,seatNumbers:1,status:1});
export const Reservation = mongoose.model('Reservation',reservationSchema);
