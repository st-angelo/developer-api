import { Server, Socket } from 'socket.io';
import IssueDto from '../dto/issue';
import { Events } from './events';

export default (_: Server, socket: Socket) => {
  const getMessage = async () => {
    const response = await fetch(
      `${process.env.ATLASSIAN_API_URL}/issue/WA-1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.ATLASSIAN_EMAIL}:${process.env.ATLASSIAN_TOKEN}`
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      }
    );
    const issue = (await response.json()) as IssueDto;
    socket.emit(
      Events.Issue,
      `Task name: ${issue.fields.summary}, with status: ${issue.fields.status.name}`
    );
  };

  socket.on(Events.GetIssues, getMessage);
};
