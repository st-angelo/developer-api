interface AtlassianStatusDto {
  description: string;
  name: string;
}

interface AtlassianAssigneeDto {
  displayName: string;
}

interface AtlassianFieldsDto {
  summary: string;
  status: AtlassianStatusDto;
  assignee: AtlassianAssigneeDto;
}

class AtlassianIssueDto {
  id: string;
  key: string;
  fields: AtlassianFieldsDto;
}

export default AtlassianIssueDto;
