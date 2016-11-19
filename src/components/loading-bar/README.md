# ui-loading-bar

## Usage

Before you can use the ui-loading-bar, you need to register it as a service provider 
with the dependency injection system. Register providers by importing 
other NgModules to the root NgModule in ```app.module.ts```. 
After that you need to add the next code in your html template:

```html
<ui-loading-bar [cssWrapper]="'ui-loading-wpapper-bar'" [cssBar]="'ui-loading-bar'"></ui-loading-bar>
```

Here's the component class ```user.component.ts```

```ts
...
import {UILoadingBarService} from "agpilot/index";

public constructor(public loading: UILoadingBarService) {}

public getUser(id: number):  void {
    this.loading.start();
    this.userService.getUser(id)
        .subscribe(
            (user: User) => {
                this.user = user;
                this.loading.complete();
            },
            (error: HandleError) => {
                this.loading.complete();
                console.log(error.message);
            }
        );
}
```