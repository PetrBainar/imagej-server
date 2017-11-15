export class FijiMenuItem {
  public level: number;
  public label: string;
  public children: FijiMenuItem[];

  constructor(level: number, label: string) {
    this.level = level;
    this.label = label;
    this.children = [];
  }

  AddChild(child: FijiMenuItem) {
    this.children.push(child);
  }
}
