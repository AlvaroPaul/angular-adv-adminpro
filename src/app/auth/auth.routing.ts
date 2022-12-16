import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
];
/*
    { path: '', component: HomeComponent },
    { path: 'path2', component: Name2Component },
    { path: 'path3', component: Name3Component },
    { path: 'path4', component: Name4Component },
    { path: '**', component: PageNotFoundComponent },
];*/

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
