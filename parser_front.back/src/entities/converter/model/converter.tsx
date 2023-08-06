import Papa from 'papaparse';

type Column = string;
type Row = Column[];
type Body = Row[];

export class Converter {
  columnNames = [] as Row;
  name = '';
  rawData: string;
  rows = [] as Body;

  constructor(data: ArrayBuffer | string, name: string) {
    this.rawData = data.toString();
    this.name = name;
    this.convert();
  }

  private getBody() {
    const result = Papa.parse<Row>(this.rawData, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
    });
    this.rows = result.data;
  }

  private getHeaders() {
    const result = Papa.parse<Row>(this.rawData, { preview: 1 });
    const columnNames = result.data[0].map((item) => item.toLowerCase());
    this.columnNames = columnNames;
  }

  convert() {
    this.getHeaders();
    this.getBody();
  }
}
