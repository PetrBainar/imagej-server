export class FijiModuleIO {
  public name: string;
  public label: string;
  public genericType: string;

  constructor(name: string, label: string, genericType: string) {
    this.name = name;
    this.label = label;
    this.genericType = genericType;
  }
}
