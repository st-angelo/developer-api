import { mapWithArguments } from '@automapper/core';
import {
  AtlassianAvatarUrlSize,
  AtlassianPriority,
} from '../dtos/atlassianEnums';
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
    destination => destination.route,
    mapWithArguments((_, { route }) => route)
  )
  .forMember(
    destination => destination.name,
    mapFrom(source => source.fields.summary)
  )
  // Type
  .forMember(
    destination => destination.type,
    mapFrom(source => source.fields.issuetype.name)
  )
  .forMember(
    destination => destination.typeDescription,
    mapFrom(source => source.fields.issuetype.description)
  )
  .forMember(
    destination => destination.typeIconUrl,
    mapFrom(source => source.fields.issuetype.iconUrl)
  )
  // Status
  .forMember(
    destination => destination.status,
    mapFrom(source => source.fields.status.name)
  )
  .forMember(
    destination => destination.statusDescription,
    mapFrom(source => source.fields.status.description)
  )
  // Priority
  .forMember(
    destination => destination.priority,
    mapFrom(
      source =>
        AtlassianPriority[
          source.fields.priority.name as keyof typeof AtlassianPriority
        ]
    )
  )
  .forMember(
    destination => destination.priorityName,
    mapFrom(source => source.fields.priority.name)
  )
  .forMember(
    destination => destination.priorityIconUrl,
    mapFrom(source => source.fields.priority.iconUrl)
  )
  // Assignee
  .forMember(
    destination => destination.assigneeName,
    mapFrom(source => source.fields.assignee.displayName)
  )
  .forMember(
    destination => destination.assigneeEmail,
    mapFrom(source => source.fields.assignee.emailAddress)
  )
  .forMember(
    destination => destination.assigneeAvatarUrl,
    mapFrom(
      source => source.fields.assignee.avatarUrls[AtlassianAvatarUrlSize._32x32]
    )
  );

export default mapper;
