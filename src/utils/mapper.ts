import AtlassianIssueDto from '../dtos/atlassianIssue';
import IssueDto from '../temp/entities';
import { classes } from './namedImports/@automapper/classes';
import { createMapper, mapFrom } from './namedImports/@automapper/core';

const mapper = createMapper({
  name: 'main',
  pluginInitializer: classes,
});

mapper
  .createMap(AtlassianIssueDto, IssueDto)
  .forMember(
    destination => destination.name,
    mapFrom(source => source.fields.summary)
  )
  .forMember(
    destination => destination.status,
    mapFrom(source => source.fields.status.name)
  )
  .forMember(
    destination => destination.priority,
    mapFrom(_ => 1)
  )
  .forMember(
    destination => destination.asignee,
    mapFrom(source => source.fields.assignee.displayName)
  );

export default mapper;
