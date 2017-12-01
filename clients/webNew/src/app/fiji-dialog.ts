export class FijiDialog {
  public header: string;
  public body: string;

  constructor(header: string, body: string, footer: string) {
    this.header = header;
    this.body = body;
  }
}
