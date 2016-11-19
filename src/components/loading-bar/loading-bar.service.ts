import {Injectable} from "@angular/core";
import {Subscriber} from 'rxjs/Subscriber';
import {Observable} from "rxjs/Observable";
import {UILoadingBarEvent} from "./loading-bar.event";


@Injectable()
export class UILoadingBarService
{
    public observable: Observable<UILoadingBarEvent>;

    private subscriber: Subscriber<UILoadingBarEvent>;
    private visibleBar: boolean = false;
    private progressValue: number = 0;
    private interval: any;

    public constructor()
    {
        this.observable = new Observable<UILoadingBarEvent>((subscriber:Subscriber<UILoadingBarEvent>) => {
            this.subscriber = subscriber;
        });
    }

    public set progress(value: number)
    {
        this.progressValue = value;
        this.emitEvent(new UILoadingBarEvent(UILoadingBarEvent.EVENT_PROGRESS, this.progressValue));
    }

    public get progress(): number
    {
        return this.progressValue;
    }

    public set visible(visible: boolean)
    {
        this.visibleBar = visible;
        this.emitEvent(new UILoadingBarEvent(UILoadingBarEvent.EVENT_VISIBLE, this.visibleBar));
    }

    public get visible()
    {
        return this.visibleBar;
    }

    public complete(): void
    {
        this.stop();
        this.progress = 100;
        setTimeout(() => {
            this.visible = false;
            setTimeout(() => {
                this.progress = 0;
            }, 250);
        }, 250);
    }

    public start(): void
    {
        this.stop();
        this.progress = 0;
        this.visible = true;
        this.interval = setInterval(() => {
            this.progress++;
            if (this.progress == 100 && this.visible) {
                this.start();
            }
        }, 500);
    }

    public stop(): void
    {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    private emitEvent(event: UILoadingBarEvent): void
    {
        if (this.subscriber) {
            this.subscriber.next(event);
        }
    }
}