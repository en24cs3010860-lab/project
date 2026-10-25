import mongoose from 'mongoose';
const theatreSchema = new mongoose.Schema({name:{type:String,required:true,trim:true},slug:{type:String,required:true,unique:true},description:String,address:{type:String,required:true},city:{type:String,required:true,index:true},state:String,country:{type:String,default:'India'},postalCode:String,latitude:Number,longitude:Number,facilities:[String],contactPhone:String,isActive:{type:Boolean,default:true}}, {timestamps:true});
export const Theatre = mongoose.model('Theatre', theatreSchema);
