/* TODO Use a real database :) */
import { v4 as uuidv4 } from 'uuid';

interface IssueXRoute {
  id: string;
  issueKey: string;
  route: string;
}

const db: IssueXRoute[] = [
  {
    id: uuidv4(),
    issueKey: 'WA-1',
    route: '/test/:id',
  },
  {
    id: uuidv4(),
    issueKey: 'WA-2',
    route: '/test/:id',
  },
  {
    id: uuidv4(),
    issueKey: 'WA-1',
    route: '/test/other/route/:id',
  },
  {
    id: uuidv4(),
    issueKey: 'WA-3',
    route: '/test/yet/another/one',
  },
];

export default db;
