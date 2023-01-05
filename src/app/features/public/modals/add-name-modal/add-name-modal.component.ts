import { Component, OnInit } from '@angular/core';
import { ComponentModalConfig, ModalSize, SuiModal } from '@richardlt/ng2-semantic-ui';

@Component({
  selector: 'app-add-name-modal',
  templateUrl: './add-name-modal.component.html',
  styleUrls: ['./add-name-modal.component.scss']
})
export class AddNameModalComponent implements OnInit {

  pending = false;

  constructor(private modal: SuiModal<{user: any}>) { }

  ngOnInit(): void { }

}

export class AddNameModal extends ComponentModalConfig<{user: any}> {
  constructor(user: any = undefined) {
    super(AddNameModalComponent, user);
    this.isFullScreen = false;
    this.size = ModalSize.Tiny;
    this.isClosable = false;
  }
}
