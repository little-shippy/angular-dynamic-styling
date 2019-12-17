import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-global',
    templateUrl: './global.component.html',
    // styleUrls: ['./global.component.scss'], // Do not include styles as they are imported in the main.scss file
    encapsulation: ViewEncapsulation.None, // This will stop Angular from adding the _ngcontent-cX in front of compiled styles
})
export class GlobalComponent {
    @HostBinding('class') classes = 'global-component'; // This class will be applied to the host element of the component
}
