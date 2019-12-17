import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InlineComponent } from './components/inline/inline.component';
import { GlobalComponent } from './components/global/global.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { ConfigService } from './services/config.service';

function initializeApp(configService: ConfigService) {
    return configService.init;
}

@NgModule({
    declarations: [
        AppComponent,
        InlineComponent,
        GlobalComponent,
        NavBarComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [{
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        multi: true,
        deps: [ConfigService]
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}
