import { DatabaseFactory } from './index.js';

async function testMongoError() {
    console.log('Testing MongoDB missing URI...');
    const repo = DatabaseFactory.createRepository('mongodb');
    try {
        await repo.connect(undefined);
        console.error('❌ Failed: MongoDB should have thrown an error');
    } catch (err) {
        console.log(`✅ MongoDB caught error as expected: ${err.message}`);
    }
}

async function testSqlError() {
    console.log('\nTesting SQL missing URI...');
    const repo = DatabaseFactory.createRepository('postgres');
    try {
        await repo.connect(undefined);
        console.error('❌ Failed: SQL should have thrown an error');
    } catch (err) {
        console.log(`✅ SQL caught error as expected: ${err.message}`);
    }
}

async function runTests() {
    await testMongoError();
    await testSqlError();
}

runTests();
