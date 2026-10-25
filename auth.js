import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticateUser } from '../middleware/auth.js';
const router=Router();
const registerSchema=z.object({name:z.string().trim().min(2).max(80),email:z.string().email().max(254),password:z.string().min(10).max(128)});
const loginSchema=z.object({email:z.string().email(),password:z.string().min(1).max(128)});
function issueToken(user){return jwt.sign({sub:user._id.toString(),role:user.role},env.JWT_ACCESS_SECRET,{expiresIn:env.JWT_ACCESS_EXPIRES_IN,issuer:'imovies-api',audience:'imovies-client'});}
function setCookie(res,token){res.cookie('imovies_access',token,{httpOnly:true,secure:env.COOKIE_SECURE==='true',sameSite:env.COOKIE_SAME_SITE,path:'/',maxAge:15*60*1000});}
router.post('/register',asyncHandler(async(req,res)=>{const input=registerSchema.parse(req.body);const email=input.email.toLowerCase().trim();if(await User.exists({email}))throw new AppError(409,'An account with this email already exists','EMAIL_EXISTS');const user=await User.create({name:input.name,email,passwordHash:await bcrypt.hash(input.password,12)});const token=issueToken(user);setCookie(res,token);res.status(201).json({success:true,message:'Account created',data:{user:{id:user.id,name:user.name,email:user.email,role:user.role}}});}));
router.post('/login',asyncHandler(async(req,res)=>{const input=loginSchema.parse(req.body);const user=await User.findOne({email:input.email.toLowerCase().trim()}).select('+passwordHash');if(!user||!await bcrypt.compare(input.password,user.passwordHash)||!user.isActive)throw new AppError(401,'Invalid email or password','INVALID_CREDENTIALS');setCookie(res,issueToken(user));res.json({success:true,message:'Signed in',data:{user:{id:user.id,name:user.name,email:user.email,role:user.role}}});}));
router.post('/logout',(_req,res)=>{res.clearCookie('imovies_access',{httpOnly:true,secure:env.COOKIE_SECURE==='true',sameSite:env.COOKIE_SAME_SITE,path:'/'});res.json({success:true,message:'Signed out',data:null});});
router.get('/me',authenticateUser,(req,res)=>res.json({success:true,data:{user:{id:req.user.id,name:req.user.name,email:req.user.email,role:req.user.role}}}));
export default router;
