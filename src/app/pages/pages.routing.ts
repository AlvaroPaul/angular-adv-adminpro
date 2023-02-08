import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [
    { 
        path: 'dashboard',
        //path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            //{ path: '', component: DashboardComponent},
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de cta' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            /*no funciona rutas a partir de path especifico, se debe quitar comentario en app-routing.module
            y dejar vacio el path de la primera linea*/
            //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'}


            //mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de aplicacion' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
