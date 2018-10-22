import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    InlineSVGModule.forRoot({ baseUrl: '/assets/icon/' })
  ],
  declarations: [],
  exports: [
    InlineSVGModule,
    TranslateModule
  ],
  providers: []
})
export class SharedModule {
}
