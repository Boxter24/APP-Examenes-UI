import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*============================== Pages ============================== */
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component'
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

/*============================== Guards ============================== */
import { AdminGuard } from './services/guards/admin.guard';
import { NormalGuard } from './services/guards/normal.guard';

/*============================== Components ============================== */
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListaCategoriaComponent as ListaCategoriaUserComponent } from './components/user/categoria/lista-categoria/lista-categoria.component';
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';
import { CrearExamenComponent } from './components/examen/crear-examen/crear-examen.component';
import { ListaPreguntaComponent } from './components/pregunta/lista-pregunta/lista-pregunta.component';
import { ExamenesPorCategoriaComponent } from './components/user/examen/examenes-por-categoria/examenes-por-categoria.component';
import { InstruccionesExamenComponent } from './components/user/examen/instrucciones-examen/instrucciones-examen.component';
import { ComenzarExamenComponent } from './components/user/examen/comenzar-examen/comenzar-examen.component';


const routes: Routes = [
    {
        path : '',
        component : WelcomeComponent,
        pathMatch : 'full'
    },
    {
        path : 'login-register',
        component : AuthComponent,
        pathMatch : 'full'
    },        
    {
        path: 'admin',
        component: DashboardComponent,        
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'perfil',
                component: PerfilComponent
            },            
            {
                path: 'categoria/crear',
                component: CrearCategoriaComponent
            },
            {
                path: 'examen/crear',
                component: CrearExamenComponent
            },
            {
                path: 'ver-preguntas/:examenId',
                component: ListaPreguntaComponent
            }            
        ]   
    },
    {
        path: 'user', 
        component: UserDashboardComponent,           
        canActivate: [NormalGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },                   
            {
                path: 'perfil',
                component: PerfilComponent
            },        
            {
                path: 'categoria',
                component: ListaCategoriaUserComponent
            },            
            {
                path: 'categoria/:categoriaId',
                component: ExamenesPorCategoriaComponent
            },
            {
                path: 'examen/instrucciones/:examenId',
                component: InstruccionesExamenComponent
            },
            {
                path: 'comenzar-examen/:examenId',
                component: ComenzarExamenComponent
            }
        ]   
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }