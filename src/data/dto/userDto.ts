import { AutoMap } from '../../utils/namedImports/@automapper/classes';

class UserDto {
  id: number;
  @AutoMap()
  tag: string;
  @AutoMap()
  email: string;
  @AutoMap()
  photo: string;
}

export default UserDto;
