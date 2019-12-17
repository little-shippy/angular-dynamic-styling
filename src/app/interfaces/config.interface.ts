export interface Config {
    // Relative URL for the compiled css for a specific environment
    stylesUrl: string;

    // Theme variables
    // The below variables are needed for the inline styling
    'background-color': string;
    'primary': string;
    'secondary': string;
}
