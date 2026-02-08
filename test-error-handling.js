import { DatabaseFactory } from './index.js';
import dotenv from 'dotenv';
dotenv.config();

async function testUriFallback() {
    console.log('Testing URI Fallback to process.env.DB_URI...');
    // Temporarily set a mock DB_URI if not present for the test
    const originalUri = process.env.DB_URI;
    process.env.DB_URI = 'mongodb://localhost:27017/test_fallback';

    const repo = DatabaseFactory.createRepository('mongodb');
    try {
        // This should NOT throw now because it falls back to process.env.DB_URI
        // Note: we don't actually await mongoose.connect to succeed (it might fail if no local DB), 
        // we just want to see it NOT throw the "URI is required" error immediately.
        await repo.connect(undefined);
        console.log('✅ Success: Engine correctly used process.env.DB_URI fallback');
    } catch (err) {
        if (err.message.includes('Database connection URI is required')) {
            console.error('❌ Failed: Engine should have used fallback but threw requirement error');
        } else {
            console.log(`✅ Note: Mongo connection attempt made (expected failure if no local DB): ${err.message}`);
        }
    } finally {
        process.env.DB_URI = originalUri;
    }
}

async function testMissingEverything() {
    console.log('\nTesting error when BOTH parameter and ENV are missing...');
    const originalUri = process.env.DB_URI;
    delete process.env.DB_URI;

    const repo = DatabaseFactory.createRepository('mongodb');
    try {
        await repo.connect(undefined);
        console.error('❌ Failed: Should have thrown an error when everything is missing');
    } catch (err) {
        console.log(`✅ Success: Caught descriptive error as expected: ${err.message}`);
    } finally {
        process.env.DB_URI = originalUri;
    }
}

async function runTests() {
    await testUriFallback();
    await testMissingEverything();
}

runTests();
