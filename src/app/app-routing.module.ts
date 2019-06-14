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
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'category', loadChildren: './pages/category/category.module#CategoryComponentModule', canActivate: [AuthGuard]},
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
  { path: 'product-list', loadChildren: './pages/product/product.module#ProductPageModule', canActivate: [AuthGuard]},
  { path: 'create-product', loadChildren: './pages/product/create-product/create-product.module#CreateProductPageModule', canActivate: [AuthGuard] },
  { path: 'product-view/:productId', loadChildren: './pages/product/product-view/product-view.module#ProductViewPageModule', canActivate: [AuthGuard] },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule', canActivate: [AuthGuard] },
  { path: 'user-profile', loadChildren: './pages/user/user-profile/user-profile.module#UserProfilePageModule', canActivate: [AuthGuard] },
  { path: 'create-category', loadChildren: './pages/category/create-category/create-category.module#CreateCategoryPageModule', canActivate: [AuthGuard] },
  { path: 'update-category/:categoryId', loadChildren: './pages/category/update-category/update-category.module#UpdateCategoryPageModule', canActivate: [AuthGuard] },
  { path: 'shopping-cart', loadChildren: './pages/shopping-cart/shopping-cart.module#ShoppingCartPageModule', canActivate: [AuthGuard] },
  { path: 'update-product/:productId', loadChildren: './pages/product/update-product/update-product.module#UpdateProductPageModule', canActivate: [AuthGuard] },
  { path: 'about-us', loadChildren: './pages/dashboard/about-us/about-us.module#AboutUsPageModule', canActivate: [AuthGuard] },
  { path: 'pay-shopping-cart', loadChildren: './pages/shopping-cart/pay-shopping-cart/pay-shopping-cart.module#PayShoppingCartPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
