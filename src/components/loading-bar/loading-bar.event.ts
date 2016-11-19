export class UILoadingBarEvent
{
    public constructor(public type: string, public value: any) {}

    public static get EVENT_PROGRESS(): string
    {
        return 'progress';
    }

    public static get EVENT_VISIBLE(): string
    {
        return 'visible';
    }
}
