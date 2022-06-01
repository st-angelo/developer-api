import { NextFunction, Response } from 'express';
import { Server } from 'socket.io';
import { TypedRequest as Request } from '../common';
import { IssueUpdatedBody } from './metadata';

export const issueUpdated = (
  req: Request<IssueUpdatedBody>,
  res: Response,
  next: NextFunction
) => {
  const issue = req.body.issue;
  const io = req.app.get<Server>('io');
  io.emit(
    'MESSAGE',
    `Issue updated! Task name: ${issue.fields.summary}, with status: ${issue.fields.status.name}`
  );
  console.log(issue, req);
  res.status(200).json({
    status: 'success',
    data: {},
  });
};
