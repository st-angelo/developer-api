import { NextFunction, Response } from 'express';
import { Server } from 'socket.io';
import AtlassianIssueDto from '../../dtos/atlassianIssue';
import IssueDto from '../../temp/entities';
import { Events } from '../../temp/events';
import mapper from '../../utils/mapper.js';
import { TypedRequest as Request } from '../common';
import { IssueUpdatedBody } from './metadata';

export const issueUpdated = (
  req: Request<IssueUpdatedBody>,
  res: Response,
  next: NextFunction
) => {
  const { issue } = req.body;
  if (!issue) return next('Webhook issue is missing!');

  const io = req.app.get<Server>('io');
  if (!io) return next('Socket server is missing!');

  io.emit(Events.Issue, mapper.map(issue, IssueDto, AtlassianIssueDto));
  res.status(200).json({
    ok: true,
    data: null,
  });
};
