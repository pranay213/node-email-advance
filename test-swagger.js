import swaggerSpec from './src/config/swagger.config.js';

console.log('--- Swagger Spec Debug ---');
console.log('OpenAPI Version:', swaggerSpec.openapi);
console.log('Info:', JSON.stringify(swaggerSpec.info, null, 2));
console.log('Servers:', JSON.stringify(swaggerSpec.servers, null, 2));
console.log('Paths count:', Object.keys(swaggerSpec.paths || {}).length);
console.log('Paths:', JSON.stringify(swaggerSpec.paths, null, 2));

if (Object.keys(swaggerSpec.paths || {}).length === 0) {
    console.error('❌ ERROR: No paths found in Swagger spec!');
} else {
    console.log('✅ SUCCESS: Paths found in Swagger spec.');
}
