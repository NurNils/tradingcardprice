import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcpComponent } from './pages/dashboard/acp/acp.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutUsComponent } from './pages/general/about-us/about-us.component';
import { CategoryComponent } from './pages/general/category/category.component';
import { GameComponent } from './pages/general/game/game.component';
import { GeneralComponent } from './pages/general/general.component';
import { HomeComponent } from './pages/general/home/home.component';
import { ItemComponent } from './pages/general/item/item.component';
import { LegalNoticeComponent } from './pages/general/legal-notice/legal-notice.component';
import { LoginComponent } from './pages/general/login/login.component';
import { ProductComponent } from './pages/general/product/product.component';
import { RegisterComponent } from './pages/general/register/register.component';
import { NewsletterComponent } from './pages/general/newsletter/newsletter.component';

const routes: Routes = [
  /** General */
  {
    path: '',
    component: GeneralComponent,
    children: [
      /** Sub pages */
      { path: '', component: HomeComponent },
      { path: 'games/:game', component: GameComponent }, // e.q. Basis-Serie
      { path: 'games/:game/:category', component: CategoryComponent }, // e.q. Basis-Set
      { path: 'games/:game/:category/:product', component: ProductComponent }, // e.q. 4/102 Glurak
      { path: 'games/:game/:category/:product/:item', component: ItemComponent }, // e.q. 4/102 Glurak mit Druckfehler

      /** Rights & General stuff */
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
      { path: 'newsletter', component: NewsletterComponent },
    ],
  },
  /** Dashboard / Admin Control Panel */
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      /** Sub pages */
      { path: '', component: AcpComponent },
    ],
  },
  /** Redirect to home on 404 error */
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
