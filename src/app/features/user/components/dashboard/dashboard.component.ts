import { Component, OnInit } from '@angular/core';
import { SuiModalService } from '@richardlt/ng2-semantic-ui';
import { AddNameModal } from 'src/app/features/public/modals/add-name-modal/add-name-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService: SuiModalService) { }

  ngOnInit(): void {
    this.modalService.open(
      new AddNameModal()
    )
  }

}
