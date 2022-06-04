
export interface LiveExample {
  /** Title of the example. */
  title: string;
  /** Name of the example component. */
  componentName: string;
  /** Selector to match the component of this example. */
  selector: string;
  /** Name of the primary file of this example. */
  primaryFile: string;
  /** List of files which are part of the example. */
  files: string[];
  /** Path to the directory containing the example. */
  packagePath: string;
  /** List of additional components which are part of the example. */
  additionalComponents: string[];
  /** NgModule that declares this example. */
  module: NgModuleInfo;
}

export interface NgModuleInfo {
  /** Name of the NgModule. */
  name: string;
  /**
   * Import specifier that resolves to this module. The specifier is not scoped to
   * `@angular/components-examples` because it's up to the consumer how the module is
   * imported. For example, in the docs app, modules are lazily imported from `fesm2015/`.
   */
  importSpecifier: string;
}

export const EXAMPLE_COMPONENTS: { [id: string]: LiveExample } = {
  "workshop-live-example": {
    packagePath: "lib/workshop-live-example",
    title: "Test Component",
    componentName: "WorkshopLiveExamplesComponent",
    files: [
        "workshop-live-examples.component.ts",
        "workshop-live-examples.component.html",
        "workshop-live-examples.component.scss"
    ],
    selector: "workshop-live-examples",
    additionalComponents: [],
    primaryFile: "workshop-live-examples.component.ts",
    module: {
        name: "WorkshopLiveExamplesModule",
        importSpecifier: "lib/workshop-live-examples"
    }
  }
  // "autocomplete-simple": {
  //   packagePath: "material/autocomplete/autocomplete-simple",
  //   title: "Simple autocomplete",
  //   componentName: "AutocompleteSimpleExample",
  //   files: [
  //       "autocomplete-simple-example.ts",
  //       "autocomplete-simple-example.html",
  //       "autocomplete-simple-example.css"
  //   ],
  //   selector: "autocomplete-simple-example",
  //   additionalComponents: [],
  //   primaryFile: "autocomplete-simple-example.ts",
  //   module: {
  //       name: "AutocompleteExamplesModule",
  //       importSpecifier: "material/autocomplete"
  //   }
  // },
};