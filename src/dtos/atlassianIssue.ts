import { AtlassianAvatarUrlSize } from './atlassianEnums';

interface AtlassianIssueTypeDto {
  name: string;
  description: string;
  iconUrl: string;
}

interface AtlassianStatusDto {
  name: string;
  description: string;
}

type AtlassianAvatarUrls = {
  [key in AtlassianAvatarUrlSize]: string;
};

interface AtlassianAssigneeDto {
  displayName: string;
  emailAddress: string;
  avatarUrls: AtlassianAvatarUrls;
}

interface AtlassianPriorityDto {
  name: string;
  iconUrl: string;
}

interface AtlassianFieldsDto {
  summary: string;
  issuetype: AtlassianIssueTypeDto;
  status: AtlassianStatusDto;
  assignee: AtlassianAssigneeDto;
  priority: AtlassianPriorityDto;
}

class AtlassianIssueDto {
  id: string;
  key: string;
  fields: AtlassianFieldsDto;
  errorMessages: string[];
}

export default AtlassianIssueDto;
