import AtlassianIssueDto from '../dtos/atlassianIssue';
import cache from '../utils/cache';

export const getIssue = async (key: string) => {
  let issue = cache.get<AtlassianIssueDto>(key);
  if (!issue) {
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
    issue = (await response.json()) as AtlassianIssueDto;
    cache.set(key, issue);
  }
  return issue;
};

export const getIssueUrl = (key: string) =>
  `${process.env.ATLASSIAN_CLOUD_URL}/browse/${key}`;
