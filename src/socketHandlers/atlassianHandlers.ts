import { Server, Socket } from 'socket.io';
import AtlassianIssueDto from '../dtos/atlassianIssue';
import _issueRepository from '../repositories/issueRepository';
import { getIssue } from '../services/atlassianService';
import IssueDto from '../temp/entities';
import { Events } from '../temp/events';
import mapper from '../utils/mapper.js';

// TODO move these interfaces to developer/published-language once they are definitive
// #region Request interfaces

interface GetIssuesRequest {
  route: string;
}

interface AddIssueRequest {
  issueKey: string;
  route: string;
}

interface DeleteIssueRequest {
  issueKey: string;
  route: string;
}

// #endregion

// #region Response interfaces

// interface DeletedIssueResponse {
//   id: string;
// }

// #endregion

// #region Utils

const issueResponse = (issue: AtlassianIssueDto, route: string) =>
  mapper.map(issue, IssueDto, AtlassianIssueDto, {
    extraArguments: { route },
  });

// #endregion

// Use io.sockets.emit to emit events to all connected clients and socket.emit to emit events to a specific client
export default (io: Server, socket: Socket) => {
  // #region Handlers

  const getIssues = async ({ route }: GetIssuesRequest) => {
    const issuesXRoute = _issueRepository.getIssuesXRoute(route);
    const issuePromises = issuesXRoute.map(issueXRoute =>
      getIssue(issueXRoute.issueKey).then(issue =>
        socket.emit(Events.Issue, issueResponse(issue, route))
      )
    );
    await Promise.allSettled(issuePromises);
  };

  const addIssue = async ({ issueKey, route }: AddIssueRequest) => {
    if (_issueRepository.existsIssueXRoute(issueKey, route)) {
      socket.emit(Events.IssueExists, { issueKey, route });
      return;
    }
    const issue = await getIssue(issueKey);
    if (issue) {
      await _issueRepository.addIssueXRoute(issueKey, route);
      io.sockets.emit(Events.Issue, issueResponse(issue, route));
    } else socket.emit(Events.IssueInvalid, { issueKey });
  };

  const deleteIssue = async ({ issueKey, route }: DeleteIssueRequest) => {
    if (await _issueRepository.deleteIssueXRoute(issueKey, route))
      io.sockets.emit(Events.IssueDeleted, { issueKey, route });
    else socket.emit(Events.IssueNotFound, { issueKey, route });
  };

  // #endregion

  socket.on(Events.GetIssues, getIssues);
  socket.on(Events.AddIssue, addIssue);
  socket.on(Events.DeleteIssue, deleteIssue);
};
