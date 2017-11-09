export class FijiModule {
  public id: number;
  public type: string;
  public clazz: string;
  public source: string;
  public rawName: string;

  constructor(id: number, rawResult: string) {
    const firstColon = rawResult.indexOf(':');
    const lastDot = rawResult.lastIndexOf('.');

    this.id = id;
    this.type = rawResult.slice(0, firstColon);
    this.clazz = rawResult.slice(lastDot + 1);
    this.source = rawResult.slice(firstColon + 1, lastDot);
    this.rawName = rawResult;
  }
}
