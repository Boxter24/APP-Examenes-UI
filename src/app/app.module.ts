import { authInterceptorProviders } from './services/Interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/*============================== Angular Material ============================== */
import { AngularMaterial } from './angularMaterial';

/*============================== Routing ============================== */
import { AppRoutingModule } from './app-routing.module'

/*============================== Forms ============================== */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*============================== Icons ============================== */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/*============================== Pages ============================== */
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


/*============================== Components ============================== */
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TelefonoPipe } from './pipes/telefono.pipe';
import { LoaderModule } from './components/loader/loader.module';
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';
import { ListaCategoriaComponent } from './components/categoria/lista-categoria/lista-categoria.component';
import { ListaCategoriaComponent as ListaCategoriaUserComponent } from './components/user/categoria/lista-categoria/lista-categoria.component';
import { ModalCrearCategoriaComponent } from './components/categoria/modal-crear-categoria/modal-crear-categoria.component';
import { CrearExamenComponent } from './components/examen/crear-examen/crear-examen.component';
import { ModalCrearExamenComponent } from './components/examen/modal-crear-examen/modal-crear-examen.component';
import { ListaPreguntaComponent } from './components/pregunta/lista-pregunta/lista-pregunta.component';
import { ModalCrearPreguntaComponent } from './components/pregunta/modal-crear-pregunta/modal-crear-pregunta.component';
import { ExamenesPorCategoriaComponent } from './components/user/examen/examenes-por-categoria/examenes-por-categoria.component';
import { InstruccionesExamenComponent } from './components/user/examen/instrucciones-examen/instrucciones-examen.component';
import { ComenzarExamenComponent } from './components/user/examen/comenzar-examen/comenzar-examen.component';
import { CrearUsuarioComponent } from './components/admin/usuario/crear-usuario/crear-usuario.component';
import { ModalCrearUsuarioComponent } from './components/admin/usuario/modal-crear-usuario/modal-crear-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,    
    AuthComponent, 
    SigninComponent, 
    SignupComponent,     
    HomeComponent,
    WelcomeComponent,
    DashboardComponent,
    SidebarComponent,
    PerfilComponent,
    TelefonoPipe,    
    CrearCategoriaComponent,
    ListaCategoriaComponent,
    ListaCategoriaUserComponent,
    ModalCrearCategoriaComponent,    
    CrearExamenComponent,    
    ModalCrearExamenComponent,
    ListaPreguntaComponent,
    ModalCrearPreguntaComponent,    
    ExamenesPorCategoriaComponent,
    InstruccionesExamenComponent,
    ComenzarExamenComponent,
    CrearUsuarioComponent,
    ModalCrearUsuarioComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterial,
    FormsModule,    
    ReactiveFormsModule,    
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    LoaderModule
  ],  
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
