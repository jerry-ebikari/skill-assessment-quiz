import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate, ModalSize} from '@richardlt/ng2-semantic-ui';


interface IContext {
  title: string,
  message?: string
}

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {

  @ViewChild("close") closeBtn!: ElementRef;
  @Output() modalClosed = new EventEmitter<boolean>();

  @ViewChild('modalTemplate')
  public modalTemplate!: ModalTemplate<IContext, string, string>

  constructor(public modalService: SuiModalService) { }

  ngOnInit(): void {
  }

  close() {
    this.closeBtn.nativeElement.click();
    this.modalClosed.emit(true);
  }

  public open(data: IContext) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    config.context = data;
    config.size = ModalSize.Mini;
    config.isClosable = true;

    this.modalService
        .open(config)
        .onApprove((result: any) => {
          this.modalClosed.emit(true);
        })
        .onDeny(result => {
          this.modalClosed.emit(true);
        });
}

}