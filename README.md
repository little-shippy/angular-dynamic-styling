# Dynamic Styling

This project is used to demonstrate a few ways to dynamically retrieve remote configuration files before page render and how to swap theme at runtime with multiple Bootstrap flavours.

With each page refresh the theme is swapped between dark mode and light mode by storing the state in local storage. This logic should be replaced with a request origin check or some other type of condition.

## Important Files

```
DynamicStyling
├── scripts
│   └── generate-themes.js
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── global
│   │   │   │   ├── global.component.scss
│   │   │   │   └── global.component.ts
│   │   │   └── inline
│   │   │       ├── inline.component.html
│   │   │       └── inline.component.ts
│   │   ├── services
│   │   │   └── config
│   │   │       └── config.service.ts
│   │   └── app.module.ts
│   └── assets
│       ├── scss
│       │    └── themes
│       │        └── *.scss
│       └── themes
│           └── *.css
├── angular.json
├── gulpfile.js
└── package.json
```

## Themes
### Creation

The themes in this project use Bootstrap with custom variables. To achieve this the theme files are added into src/assets/scss/themes. 

Each theme file should provide Bootstrap and custom variables that need to overridden. In the example themes primary, secondary and background-color are used in the themes instead of the default values. The theme files should also import main.scss because it is required to compile Bootstrap for different flavours.

Example:
```
$primary:          red;
$secondary:        $blue;
$background-color: $efefef;

@import "../main.scss";
```

### Generation

To compile the themes from scss to css node-sass is used. There is a script in scripts/generate-themes.js which runs through all the scss themes and compiles them along with Bootstrap. The output files are placed in src/app/assets/themes.

You can run the following command to generate all themes.

```
npm run generate:themes
```

The generated css are injected at runtime to dynamically style the project. 

## Configuration

The ConfigService is responsible for getting a remote config and injecting the theme that is specified in the retrieved config. This service can be further expanded to each projects needs.

To use the generated css there is a link element inject into the head element inside the ConfigService.

### Initialisation

It is required to initialise the ConfigService before the page is rendered. Angular offers a provider called ```APP_INITIALIZER``` which is used to run code (usually async) before the page is rendered.

The ConfigService is initialised in app.module.ts.

```
function initializeApp(configService: ConfigService) {
    return configService.init;
}
```

```
{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    multi: true,
    deps: [ConfigService]
}
```

## Component Styling

When using a dynamic theme there is issues with component styling and using scss variables. Due to the Angular compiling all scss at build time there is customisation needed.

### Global

This approach uses custom encapsulation of styling instead of the built in Angular component encapsulation. To achieve this a class is given to the host element of a component and then all styles for that component must be inside that components class.

Steps for adding a global component:
- ```ng g c components/<name>```
- Remove stylesUrls from the component declaration
- Import the components scss file in main.scss
- Turn encapsulation off in the component
- Bind a unique class to the host element (the best idea is to just use the component name lowercased and hyphen separated)
- Add the components unique class as the most outer class in the components scss file


| Pros | Cons |
|---|---|
| Components still use individual scss files | Component styling loses Angular encapsulation |
| There is no need for storing scss variables in JS | Each components styling needs an outer class to achieve encapsulation |
| The component stays clean even when it gets rather large | There is a little more setup for getting a component to run |

### Inline

This approach is taken from ReactJS by declaring the styling in the components TS file. A public readonly styles variable is added to the component and then each HTML element uses ngStyle to bind to their specific styles.

Steps for adding a inline component:
- ```ng g c components/<name>```
- Inject the ConfigService into the component
- Declare a public readonly styles variable inside the component
- Add your styles and get any variables needed from ConfigService
- Bind the HTML elements to the styles variables (```[ngStyles]="styles.title"```)

| Pros | Cons |
|---|---|
| The styling is encapsulated to each component | The scss variables need to accessible in JS code |
| Requires less customisation of Angular defaults compared to the global solution | Bloats the component code |
|  | Could cause issues due to being inline styling |
|  | Could cause more thrown errors if styling is missing |

## Tools

Due to the amount of customisation that is need to achieve this with Angular there has to be some additional tools written.

### Generate theme

This tool compiles all the scss themes into css.

```npm run generate:theme```

### Gulp

This is used for local development to get the same styling recompiling as Angular.

There is a default gulp task to run in gulpfile. The default task will watch all scss themes and compile them to css. Gulp should be run in another terminal tab whenever using ```ng serve```.

```npm run gulp```

## Verdict

I think that the global styling is a better choice even though it requires more tools and customisation. Global styling follows more of the Angular way of development but with an old school way of controlling styling.

The inline styling solution feels dirty and can cause issues with styling because everything is inline. Global styling may also be better performance due to having less bind to the styles declared in the component.
