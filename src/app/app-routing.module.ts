import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'category/:categoryId', loadChildren: './pages/category/category.module#CategoryComponentModule'},
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'product', loadChildren: './pages/product/product.module#ProductPageModule' },
  { path: 'create-product', loadChildren: './pages/product/create-product/create-product.module#CreateProductPageModule' },
 // { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate:[AuthGuard]},
 // { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
