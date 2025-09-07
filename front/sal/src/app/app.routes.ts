import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrudComponent } from './componentes/crud/crud.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ActivarComponent } from './componentes/activar/activar.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PersonalComponent } from './componentes/personal/personal.component';
import { ActualizarpassComponent } from './componentes/actualizarpass/actualizarpass.component';

export const routes: Routes = [
    {path:"",component:HomeComponent,pathMatch:"full"},
    {path:"home",component:HomeComponent,pathMatch:"full"},
    {path:"inventario",component:InventarioComponent,pathMatch:"full"},
    {path:"login",component:LoginComponent,pathMatch:"full"},
    {path:"registro",component:RegistroComponent,pathMatch:"full"},
    {path:"crud",component:CrudComponent,pathMatch:"full"},
    {path:"footer",component:FooterComponent,pathMatch:"full"},
    {path:"header",component:HeaderComponent,pathMatch:"full"},
    {path:"perfil",component:PerfilComponent,pathMatch:"full"},
    {path:"activar/:email/:codigo",component:ActivarComponent,pathMatch:"full"},
    {path:"dashboard",component:DashboardComponent,pathMatch:"full"},
    {path:"personal",component:PersonalComponent,pathMatch:"full"},
    {path:"actualizarpass",component:ActualizarpassComponent,pathMatch:"full"},
];
