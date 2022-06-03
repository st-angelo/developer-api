import { JSONFile, Low } from 'lowdb';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import IssueXRoute from '../entities/issueXRoute';

interface Data {
  issueXRoutes: IssueXRoute[];
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile<Data>(file);
const _db = new Low<Data>(adapter);

await _db.read();
console.log('Database initialized...');

_db.data ||= { issueXRoutes: [] };

export default {
  data: _db.data,
  write: () => _db.write(),
};
