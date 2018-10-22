import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [],
  entryComponents: []
})
export class LayoutModule { }
