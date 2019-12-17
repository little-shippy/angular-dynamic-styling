import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'app-inline',
    templateUrl: './inline.component.html',
    styleUrls: ['./inline.component.scss']
})
export class InlineComponent {

    constructor(private config: ConfigService) {}

    public readonly styles = {
        content: {
            'background': this.config.get('background-color'),
            'min-height': '100vh',
        },

        title: {
            'color': this.config.get('primary'),
        },

        description: {
            'color': this.config.get('secondary'),
        },
    };

}
