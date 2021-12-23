import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { translateLoaderFactory } from './shared/utils/translate-loader/translate-loader.util';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

// Material
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// Interceptors
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralComponent } from './pages/general/general.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/general/home/home.component';
import { AboutUsComponent } from './pages/general/about-us/about-us.component';
import { AcpComponent } from './pages/dashboard/acp/acp.component';
import { LoginComponent } from './pages/general/login/login.component';
import { LegalNoticeComponent } from './pages/general/legal-notice/legal-notice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './pages/general/game/game.component';
import { CategoryComponent } from './pages/general/category/category.component';
import { ProductComponent } from './pages/general/product/product.component';
import { ItemComponent } from './pages/general/item/item.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrolltopComponent } from './shared/components/scrolltop/scrolltop.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LanguageWrapperComponent } from './shared/components/language-wrapper/language-wrapper.component';
import { ProductShowcaseComponent } from './shared/components/product-showcase/product-showcase.component';
import { MarkdownModule } from 'ngx-markdown';
import { ProductDialogComponent } from './shared/dialogs/product-dialog/product-dialog.component';
import { CategoryDialogComponent } from './shared/dialogs/category-dialog/category-dialog.component';
import { GameDialogComponent } from './shared/dialogs/game-dialog/game-dialog.component';
import { ItemDialogComponent } from './shared/dialogs/item-dialog/item-dialog.component';
import { SupercategoryDialogComponent } from './shared/dialogs/supercategory-dialog/supercategory-dialog.component';
import { TranslateItemDialogComponent } from './shared/dialogs/translate-item-dialog/translate-item-dialog.component';
import { registerLocaleData } from '@angular/common';
import { CardWrapperComponent } from './shared/components/card-wrapper/card-wrapper.component';
import { RegisterComponent } from './pages/general/register/register.component';
import { FeatureExampleComponent } from './shared/components/feature-example/feature-example.component';
import { FeatureGroupComponent } from './shared/components/feature-group/feature-group.component';
import { FeatureRowComponent } from './shared/components/feature-row/feature-row.component';
import { IdGalleryDialogComponent } from './shared/dialogs/id-gallery-dialog/id-gallery-dialog.component';
import { SearchComponent } from './shared/components/search/search.component';
import { NewsletterComponent } from './pages/general/newsletter/newsletter.component';

@NgModule({
  declarations: [
    AppComponent,

    /** Pages */
    // General
    GeneralComponent,
    AboutUsComponent,
    LegalNoticeComponent,
    LoginComponent,

    HomeComponent,
    GameComponent,
    CategoryComponent,
    ProductComponent,
    ItemComponent,

    // Dashboard
    DashboardComponent,
    AcpComponent,

    // Shared
    CardWrapperComponent,
    FeatureExampleComponent,
    FeatureGroupComponent,
    FeatureRowComponent,
    HeaderComponent,
    FooterComponent,
    LanguageWrapperComponent,
    ProductShowcaseComponent,
    ScrolltopComponent,
    ProductDialogComponent,
    CategoryDialogComponent,
    GameDialogComponent,
    ItemDialogComponent,
    SupercategoryDialogComponent,
    TranslateItemDialogComponent,
    RegisterComponent,
    IdGalleryDialogComponent,
    SearchComponent,
    NewsletterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, deps: [HttpClient], useFactory: translateLoaderFactory },
    }),
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
