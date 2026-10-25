import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'test-only-secret-with-more-than-32-characters';
process.env.NODE_ENV = 'test';
const { createApp } = await import('../src/app.js');
test('health endpoint reports service status', async()=>{const server=http.createServer(createApp());await new Promise(r=>server.listen(0,r));try{const response=await fetch(`http://127.0.0.1:${server.address().port}/api/v1/health`);assert.equal(response.status,200);const body=await response.json();assert.equal(body.success,true);assert.equal(body.data.service,'imovies-api');}finally{await new Promise(r=>server.close(r));}});
