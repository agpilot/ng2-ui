import {Component, OnInit, Input} from "@angular/core";
import {UILoadingBarService} from "./loading-bar.service";
import {UILoadingBarEvent} from "./loading-bar.event";

@Component({
    moduleId: module.id,
    selector: 'ui-loading-bar',
    templateUrl: 'loading-bar.component.html'
})

export class UILoadingBarComponent implements OnInit
{
    public visible: boolean = false;
    private width: string = '0%';

    @Input() cssWrapper: string;
    @Input() cssBar: string;

    constructor(private service:UILoadingBarService) {}

    public set progress(value: string)
    {
        this.width = value + '%';
    }

    public get progress(): string
    {
        return this.width;
    }

    public ngOnInit()
    {
        this.service.observable.subscribe((event:UILoadingBarEvent) => {
            if (event.type === UILoadingBarEvent.EVENT_PROGRESS) {
                this.progress = event.value;
            }
            if (event.type === UILoadingBarEvent.EVENT_VISIBLE) {
                this.visible = event.value;
            }
        });
    }
}