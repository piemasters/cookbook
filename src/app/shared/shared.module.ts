import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [
        CommonModule,
        NgbModule,
        DropdownDirective
    ]
})
export class SharedModule {}
