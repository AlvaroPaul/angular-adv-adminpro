import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
    { 
        path: 'dashboard',
        //path: 'dashboard',
        component: PagesComponent,
        children: [
            //{ path: '', component: DashboardComponent},
            { path: '', component: DashboardComponent},
            { path: 'progress', component: ProgressComponent},
            { path: 'grafica1', component: Grafica1Component},
            { path: 'account-settings', component: AccountSettingsComponent},
            /*no funciona rutas a partir de path especifico, se debe quitar comentario en app-routing.module
            y dejar vacio el path de la primera linea*/
            //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
