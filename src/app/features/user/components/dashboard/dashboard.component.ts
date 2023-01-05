import { Component, OnInit } from '@angular/core';
import { SuiModalService } from '@richardlt/ng2-semantic-ui';
import { AddNameModal } from 'src/app/features/public/modals/add-name-modal/add-name-modal.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private modalService: SuiModalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.retrieveUserFromLocalStorage();
    if (!this.user.displayName) {
      this.modalService.open(
        new AddNameModal()
      )
    }
  }

}
