import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from './config/env.js'; import { connectDB } from './config/db.js'; import { createApp } from './app.js';
const app=createApp();const httpServer=createServer(app);const io=new Server(httpServer,{cors:{origin:env.CLIENT_URL,credentials:true}});app.set('io',io);
io.on('connection',socket=>{socket.on('joinShowRoom',async({showId}={})=>{if(typeof showId==='string'&&/^[a-f\d]{24}$/i.test(showId))socket.join(`show:${showId}`);});socket.on('leaveShowRoom',({showId}={})=>{if(typeof showId==='string')socket.leave(`show:${showId}`);});});
await connectDB(env.MONGODB_URI);httpServer.listen(env.PORT,()=>console.log(`IMovies API listening on :${env.PORT}`));
async function shutdown(){io.close();httpServer.close(()=>process.exit(0));setTimeout(()=>process.exit(1),10000).unref();}
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
