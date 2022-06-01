interface StatusDto {
  description: string;
  name: string;
}

interface FieldsDto {
  summary: string;
  status: StatusDto;
}

interface IssueDto {
  fields: FieldsDto;
}

export default IssueDto;
