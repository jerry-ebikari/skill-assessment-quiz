import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SuiModalModule, SuiSidebarModule } from '@richardlt/ng2-semantic-ui';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { FailureModalComponent } from './components/failure-modal/failure-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';



@NgModule({
  declarations: [
    LoadingModalComponent,
    SuccessModalComponent,
    FailureModalComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    SuiModalModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModalModule,
    LoadingModalComponent,
    SuccessModalComponent,
    FailureModalComponent,
    SuiSidebarModule
  ]
})
export class SharedModule { }
