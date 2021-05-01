import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { TabsComponent } from './shared/components/layouts/tabs/tabs.component';
import { CanActivateService } from './shared/services/guard-services/can-activate.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./views/tabs/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./views/tabs/tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./views/tabs/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./views/auth-views/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./views/auth-views/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./views/admin-views/profile-dashboard/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./views/auth-views/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesModule)
      },
     
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [CanActivateService],
    children: [
      {
        path: 'profile-dashboard',
        loadChildren: () => import('./views/admin-views/profile-dashboard/profile-dashboard.module').then(m => m.ProfileDashboardModule)
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
