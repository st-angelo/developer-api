import { AtlassianIssueType } from './atlassianEnums';

export const COMPLETED_STATUS = {
  [AtlassianIssueType.Epic]: 'Tested',
  [AtlassianIssueType.Brainstorm]: 'Done',
  [AtlassianIssueType.Bug]: 'Tested',
  [AtlassianIssueType.Feature]: 'Tested',
  [AtlassianIssueType.Refactor]: 'Tested',
  [AtlassianIssueType.Subtask]: 'Tested',
};
