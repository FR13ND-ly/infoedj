import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesktopComponent } from './desktop/desktop.component';
import { BarComponent } from './bar/bar.component';
import { OverlayComponent } from './overlay/overlay.component';
import { MaterialModule } from './material.module';
import { WindowComponent } from './window/window.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TeamComponent } from './team/team.component';
import { AlumniComponent } from './alumni/alumni.component';
import { StoreModule } from '@ngrx/store';
import { appState } from './state/app.state';
import { ClComponent } from './cl/cl.component';
import { SettingsComponent } from './settings/settings.component';
import { EventsComponent } from './events/events.component';
import { ImageComponent } from './image/image.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { EventComponent } from './event/event.component';
import { ImagesComponent } from './images/images.component';
import { BootScreenComponent } from './boot-screen/boot-screen.component';
import { FormsModule } from '@angular/forms';
import { WindowsService } from './windows.service';
import { ChessComponent } from './chess/chess.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ResolveComponent } from './resolve/resolve.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    BarComponent,
    OverlayComponent,
    WindowComponent,
    GalleryComponent,
    TeamComponent,
    AlumniComponent,
    ClComponent,
    SettingsComponent,
    EventsComponent,
    ImageComponent,
    PortfolioComponent,
    AboutComponent,
    EventComponent,
    ImagesComponent,
    BootScreenComponent,
    ChessComponent,
    DownloadsComponent,
    ResolveComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appState)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector) {
    WindowsService.injector = injector;
  }
}
