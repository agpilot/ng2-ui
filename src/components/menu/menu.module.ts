import {CommonModule} from "@angular/common";
import {UIMenuComponent} from "./menu.component";
import {NgModule} from "@angular/core";

@NgModule({
    imports: [CommonModule],
    exports: [UIMenuComponent],
    declarations: [UIMenuComponent]
})

export class UIMenuModule { }