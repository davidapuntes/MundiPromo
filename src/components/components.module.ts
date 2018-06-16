import { NgModule} from '@angular/core';
import { LoginComponent } from './login/login.component.';
import { RegisterComponent } from './register/register.component';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario';


@NgModule({
	declarations: [LoginComponent,
    RegisterComponent,
    FormularioComponent],
	imports: [CommonModule, IonicModule],
	exports: [LoginComponent,
	RegisterComponent,
    FormularioComponent]

})
export class ComponentsModule {}
