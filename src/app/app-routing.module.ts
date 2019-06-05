import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'category', loadChildren: './pages/category/category.module#CategoryComponentModule'},
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'product', loadChildren: './pages/product/product.module#ProductPageModule' },
  { path: 'create-product', loadChildren: './pages/product/create-product/create-product.module#CreateProductPageModule' },
  { path: 'product-view/:productId', loadChildren: './pages/product/product-view/product-view.module#ProductViewPageModule' },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'user-profile', loadChildren: './pages/user/user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'create-category', loadChildren: './pages/category/create-category/create-category.module#CreateCategoryPageModule' },
  { path: 'update-category/:categoryId', loadChildren: './pages/category/update-category/update-category.module#UpdateCategoryPageModule' },
  { path: 'shopping-cart/:userId', loadChildren: './pages/shopping-cart/shopping-cart.module#ShoppingCartPageModule' },


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
