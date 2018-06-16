import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormularioPage } from './formulario';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FormularioPage,
    
  ],
  imports: [
    IonicPageModule.forChild(FormularioPage),
    ComponentsModule
  ],
})
export class FormularioPageModule {}
