import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGuard } from './core/guards/public.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./features/public/public.module").then(m => m.PublicModule),
    canActivate: [PublicGuard]
  },
  
  {
    path: "user",
    loadChildren: () => import("./features/user/user.module").then(m => m.UserModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
