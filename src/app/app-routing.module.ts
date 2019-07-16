import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: '', redirectTo: environment.routes.home, pathMatch: 'full' },
  { path: environment.routes.home, loadChildren: './home/home.module#HomePageModule' },
  { path: environment.routes.dashboard, loadChildren: './dashboard/dashboard.module#DashboardPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
