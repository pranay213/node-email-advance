import { MongoRepository } from '../repositories/mongo.repository.js';
import { SqlRepository } from '../repositories/sql.repository.js';

class DatabaseFactory {
    static createRepository(type) {
        switch (type?.toLowerCase()) {
            case 'mongodb':
                return new MongoRepository();
            case 'postgres':
                return new SqlRepository('postgres');
            case 'mysql':
                return new SqlRepository('mysql');
            default:
                throw new Error(`Unsupported database type: ${type}`);
        }
    }
}

export default DatabaseFactory;
