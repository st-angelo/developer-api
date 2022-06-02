import { Server, Socket } from 'socket.io';
import AtlassianIssueDto from '../dtos/atlassianIssue';
import { getIssue } from '../services/atlassianService';
import db from '../temp/db';
import IssueDto from '../temp/entities';
import { Events } from '../temp/events';
import mapper from '../utils/mapper.js';

interface GetIssuesPayload {
  route: string;
}

export default (_: Server, socket: Socket) => {
  // #region Handlers

  const getIssues = async ({ route }: GetIssuesPayload) => {
    const issuePromises = db
      .filter(issueXRoute => issueXRoute.route === route)
      .map(issueXRoute =>
        getIssue(issueXRoute.issueKey).then(issue =>
          socket.emit(
            Events.Issue,
            mapper.map(issue, IssueDto, AtlassianIssueDto)
          )
        )
      );
    await Promise.allSettled(issuePromises);
  };

  // #endregion

  socket.on(Events.GetIssues, getIssues);
};
