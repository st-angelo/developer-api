import { AutoMap } from '../../utils/namedImports/@automapper/classes';

class User {
  _id: number;
  @AutoMap()
  tag: string;
  @AutoMap()
  email: string;
  @AutoMap()
  photo: string;
  active: boolean;
  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
}

export default User;
