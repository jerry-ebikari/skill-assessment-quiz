import { Component, OnInit, ViewChild } from '@angular/core';
import {SuiModalService, TemplateModalConfig, ModalTemplate, ModalSize} from '@richardlt/ng2-semantic-ui';


interface IContext {
  title: string,
  message?: string
}

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss']
})
export class LoadingModalComponent implements OnInit {

  @ViewChild('modalTemplate')
  public modalTemplate!: ModalTemplate<IContext, string, string>

  constructor(public modalService: SuiModalService) { }

  ngOnInit(): void {
  }

  public open(data: IContext) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

    config.closeResult = "closed!";
    config.context = data;
    config.size = ModalSize.Mini;
    config.isClosable = false;

    this.modalService
        .open(config)
        .onApprove((result: any) => {
          
        })
        .onDeny(result => { /* deny callback */});
}

}
