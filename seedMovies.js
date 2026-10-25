import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { Movie } from '../models/Movie.js';
const samples=[
 {title:'The Last Orbit',slug:'the-last-orbit',description:'An original development title about a crew racing to bring a distant station home.',genres:['Sci-Fi','Adventure'],languages:['English'],durationMinutes:128,releaseDate:new Date('2026-10-01'),certification:'U/A',status:'NOW_SHOWING',featured:true,posterUrl:'',backdropUrl:''},
 {title:'Monsoon Letters',slug:'monsoon-letters',description:'Two strangers discover a shared story through letters carried across a rain-soaked city.',genres:['Drama','Romance'],languages:['Hindi'],durationMinutes:116,releaseDate:new Date('2026-09-18'),certification:'U/A',status:'NOW_SHOWING'},
 {title:'Midnight Frequency',slug:'midnight-frequency',description:'A late-night radio host receives a signal that should not exist.',genres:['Thriller','Mystery'],languages:['Hindi','English'],durationMinutes:104,releaseDate:new Date('2026-11-20'),certification:'U/A',status:'COMING_SOON'}
];
await mongoose.connect(env.MONGODB_URI);for(const m of samples)await Movie.updateOne({slug:m.slug},{$setOnInsert:m},{upsert:true});console.log('Seeded illustrative IMovies sample titles. These are not real movie ratings/reviews.');await mongoose.disconnect();
