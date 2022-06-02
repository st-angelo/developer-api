import AtlassianIssueDto from '../dtos/atlassianIssue';

export const getIssue = async (key: string) => {
  const response = await fetch(
    `${process.env.ATLASSIAN_API_URL}/issue/${key}`,
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
  const issue = (await response.json()) as AtlassianIssueDto;
  return issue;
};
