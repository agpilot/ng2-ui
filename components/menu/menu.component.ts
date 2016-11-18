import {
    Component, ContentChildren, QueryList, Input, OnDestroy,
    style, state, animate, transition, trigger
} from "@angular/core";
import {Router} from "@angular/router";
import {UIMenuItem} from "../api";

@Component({
    moduleId: module.id,
    selector: 'ui-menu',
    templateUrl: 'menu.component.html',
    animations: [
        trigger('fadeInOut', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('600ms')),
            transition('hidden => visible', animate('600ms'))
        ])
    ]
})

export class UIMenuComponent implements OnDestroy
{
    @Input() items: UIMenuItem[];
    @Input() expanded: boolean;
    @Input() css: string;

    @ContentChildren(UIMenuComponent) list: QueryList<UIMenuItem>;

    private menuItemRef: UIMenuItem;

    public constructor(private router: Router) {}

    public ngOnDestroy(): void
    {
        this.inActiveRoot();
    }

    public onSelect(event, menuItem): void
    {
        event.preventDefault();
        this.menuItemRef = menuItem;
        this.active();
        if (menuItem.url) {
            this.router.navigate(menuItem.url);
        }
    }

    private active(): void
    {
        this.inActiveRoot();
        this.menuItemRef.active = true;
        this.menuItemRef.expanded = !this.menuItemRef.expanded;
    }    
    
    private inActiveRoot(): void
    {
        this.list.toArray().forEach((menuItem: UIMenuItem) => {
            if (menuItem.items) {
                this.inActiveChildren(menuItem);
            }
        });
    }    
    
    private inActiveChildren(menuItem: UIMenuItem): void
    {
        menuItem.items
            .filter((item: UIMenuItem) => item !== this.menuItemRef)
            .forEach((item: UIMenuItem) => {
                item.active = false;
                if (item.items) {
                    item.expanded = false;
                    this.inActiveChildren(item);
                }
            });
    }
}