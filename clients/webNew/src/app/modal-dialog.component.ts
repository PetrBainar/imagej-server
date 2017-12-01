import { Component } from '@angular/core';

@Component({
  selector: 'app-component-modal-dialog',
  templateUrl: 'modal-dialog.component.html',
  styleUrls: ['modal-dialog.component.css']
})
export class ModalDialogComponent {

  public visible = false;
  public visibleAnimate = false;

  public header = '';
  public body = '';

  public show(header: string, body: string): void {
    this.header = header;
    this.body = body;
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.header = '';
      this.body = '';
      }, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
