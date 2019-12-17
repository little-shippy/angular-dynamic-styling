import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GlobalComponent } from './components/global/global.component';
import { InlineComponent } from './components/inline/inline.component';


const routes: Routes = [
    {
        component: HomeComponent,
        path: '',
    },
    {
        component: GlobalComponent,
        path: 'global',
    },
    {
        component: InlineComponent,
        path: 'inline',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
