interface FieldsDto {
  summary: string;
  status: StatusDto;
}

interface StatusDto {
  description: string;
  name: string;
}

interface IssueDto {
  fields: FieldsDto;
}

export default IssueDto;
