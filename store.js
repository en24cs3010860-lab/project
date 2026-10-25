import {configureStore,createSlice} from '@reduxjs/toolkit';
const authSlice=createSlice({name:'auth',initialState:{user:null,loaded:false},reducers:{setUser:(s,a)=>{s.user=a.payload;s.loaded=true;},clearUser:s=>{s.user=null;s.loaded=true;}}});
export const {setUser,clearUser}=authSlice.actions;
export const store=configureStore({reducer:{auth:authSlice.reducer}});
