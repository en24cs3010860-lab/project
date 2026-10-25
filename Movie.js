import mongoose from 'mongoose';
const movieSchema = new mongoose.Schema({
  title:{type:String,required:true,trim:true,maxlength:160}, slug:{type:String,required:true,unique:true,lowercase:true,trim:true}, description:{type:String,required:true,maxlength:5000},
  posterUrl:{type:String,default:''}, backdropUrl:{type:String,default:''}, trailerUrl:{type:String,default:''}, genres:[{type:String,trim:true}], languages:[{type:String,trim:true}],
  durationMinutes:{type:Number,min:1,required:true}, releaseDate:{type:Date,required:true}, certification:{type:String,default:'U/A'}, director:{type:String,default:''}, cast:[String],
  rating:{type:Number,min:0,max:10,default:null}, reviewCount:{type:Number,min:0,default:0}, status:{type:String,enum:['COMING_SOON','NOW_SHOWING','ARCHIVED'],default:'COMING_SOON'}, featured:{type:Boolean,default:false}
},{timestamps:true});
movieSchema.index({ title:'text', description:'text' }); movieSchema.index({status:1,releaseDate:1}); movieSchema.index({genres:1,languages:1});
export const Movie = mongoose.model('Movie', movieSchema);
