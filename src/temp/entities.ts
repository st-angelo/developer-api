/* TODO Move entities to standalone package developer/published-language once they are definitive */
import { AutoMap } from '../utils/namedImports/@automapper/classes';

class IssueDto {
  @AutoMap()
  id: string;
  @AutoMap()
  key: string;
  route?: string;
  name: string;
  type: string;
  typeDescription: string;
  typeIconUrl: string;
  status: string;
  statusDescription: string;
  priority: number;
  priorityName: string;
  priorityIconUrl: string;
  assigneeName: string;
  assigneeEmail: string;
  assigneeAvatarUrl: string;
}

export default IssueDto;
