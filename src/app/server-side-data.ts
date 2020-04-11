export interface ServerSideDataResponse {
  content: ServerSideData[];
  totalPages: number;
  totalElements: number;
  pageSize: number;
  page: number;
}

export interface ServerSideData {
  DT_RowId: string;
  name: string;
  position: string;
  salary: string;
  start_date: string;
  office: string;
  extn: string;
}
