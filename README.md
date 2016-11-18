Angular 2 ui-components
=========

## Installation

## How to use loading bar
```
getUser(id: number):  void {
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

## To Do
- Improve documentation.