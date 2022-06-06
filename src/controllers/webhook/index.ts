import { Server } from 'socket.io';
import { COMPLETED_STATUS } from '../../dtos/atlassianConstants';
import AtlassianIssueDto from '../../dtos/atlassianIssue';
import issueRepository from '../../repositories/issueRepository';
import IssueDto from '../../temp/entities';
import { Events } from '../../temp/events';
import cache from '../../utils/cache';
import { catchAsync } from '../../utils/catchAsync';
import mapper from '../../utils/mapper.js';
import { TypedRequest as Request } from '../common';
import { IssueUpdatedBody } from './metadata';

export const issueUpdated = catchAsync(
  async (req: Request<IssueUpdatedBody>, res, next) => {
    const { issue } = req.body;
    if (!issue) return next('Webhook issue is missing!');

    // Cache issue regardless of status
    cache.set(issue.key, issue);

    const io = req.app.get<Server>('io');
    if (!io) return next('Socket server is missing!');

    if (
      issue.fields.status.name ===
      COMPLETED_STATUS[
        issue.fields.issuetype.name as keyof typeof COMPLETED_STATUS
      ]
    ) {
      await issueRepository.deleteIssueForAllRoutes(issue.key);
      io.emit(Events.IssueDeleted, { issueKey: issue.key });
    } else
      io.emit(Events.Issue, mapper.map(issue, IssueDto, AtlassianIssueDto));

    res.status(200).json({
      ok: true,
    });
  }
);
