import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentModalConfig, ModalSize, SuiModal } from '@richardlt/ng2-semantic-ui';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-name-modal',
  templateUrl: './add-name-modal.component.html',
  styleUrls: ['./add-name-modal.component.scss']
})
export class AddNameModalComponent implements OnInit {

  loading = false;
  form!: FormGroup;

  constructor(
    private modal: SuiModal<{user: any}>,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  updateUserInfo() {
    this.loading = true;
    if (typeof this.modal.context?.user?.updateProfile == 'function') {
      this.userService.updateUserProfile(
        this.modal.context.user,
        {
          displayName: this.form.get('name')?.value || ''
        }
      ).then((res: any) => {
        this.loading = false;
        console.log(res)
        this.modal.approve(undefined)
      }).catch((err: any) => {
        this.loading = false;
        console.log(err)
      }) 
    } else {
      this.authService.getCurrentUser()
      .then(res => {
        console.log(res)
        this.userService.updateUserProfile(
          res,
          {
            displayName: this.form.get('name')?.value || ''
          }
        ).then((res: any) => {
          this.loading = false;
          console.log(res)
          this.modal.approve(undefined)
        })
      })
      .catch((err: any) => {
        this.loading = false;
        console.log(err)
      })
    }
    // console.log(this.form.get('name')?.value)
  }

}

export class AddNameModal extends ComponentModalConfig<{user: any}> {
  constructor(user: any = undefined) {
    super(AddNameModalComponent, user);
    this.isFullScreen = false;
    this.size = ModalSize.Tiny;
    this.isClosable = false;
  }
}
