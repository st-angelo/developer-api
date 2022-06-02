import { AutoMap } from '../utils/namedImports/@automapper/classes';

class IssueDto {
  @AutoMap()
  id: string;
  @AutoMap()
  key: string;
  name: string;
  status: string;
  asignee: string;
  priority: number;
}

export default IssueDto;
