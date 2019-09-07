import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PAGES } from 'src/resources/constants/pages';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: PAGES.LOGIN,
    pathMatch: 'full'
  },
  {
    path: PAGES.DASHBOARD,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: PAGES.ACCOUNTDETAILS,
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: PAGES.LOGIN,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: PAGES.REGISTER,
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
