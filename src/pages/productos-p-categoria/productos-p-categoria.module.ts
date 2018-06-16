import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductosPCategoriaPage } from './productos-p-categoria';
import { TitleCasePipe } from '@angular/common';


@NgModule({
  declarations: [
    ProductosPCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductosPCategoriaPage),
  ],
})
export class TestPageModule {}