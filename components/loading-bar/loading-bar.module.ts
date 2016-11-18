import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {UILoadingBarComponent} from "./loading-bar.component";

@NgModule({
    imports: [CommonModule],
    exports: [UILoadingBarComponent],
    declarations: [UILoadingBarComponent]
})

export class UILoadingBarModule { }