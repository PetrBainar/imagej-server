export class FijiObject {
  public src: string;

  constructor(objectUrl: string, id: string, timestamp: number) {
    this.src = `${objectUrl}/${id}/jpg?timestamp=${timestamp}`;
  }
}
