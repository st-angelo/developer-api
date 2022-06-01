import UserDto from '../data/dto/userDto.js';
import User from '../data/entities/user.js';
import { classes } from './namedImports/@automapper/classes';
import { createMapper, mapFrom } from './namedImports/@automapper/core';

const mapper = createMapper({
  name: 'main',
  pluginInitializer: classes,
});

mapper.createMap(User, UserDto).forMember(
  destination => destination.id,
  mapFrom(source => source._id)
);

export default mapper;
