import { classes } from './namedImports/@automapper/classes';
import { createMapper } from './namedImports/@automapper/core';

const mapper = createMapper({
  name: 'main',
  pluginInitializer: classes,
});

export default mapper;
