import mongoose from 'mongoose';
const seatSchema = new mongoose.Schema({seatNumber:{type:String,required:true},row:{type:String,required:true},category:{type:String,enum:['STANDARD','PREMIUM','ACCESSIBLE'],default:'STANDARD'},x:{type:Number},aisleAfter:{type:Boolean,default:false}}, {_id:false});
const screenSchema = new mongoose.Schema({theatreId:{type:mongoose.Schema.Types.ObjectId,ref:'Theatre',required:true,index:true},name:{type:String,required:true},screenType:{type:String,default:'2D'},totalSeats:{type:Number,required:true,min:1},seatLayout:{type:[seatSchema],validate:v=>v.length>0},isActive:{type:Boolean,default:true}}, {timestamps:true});
export const Screen = mongoose.model('Screen',screenSchema);
