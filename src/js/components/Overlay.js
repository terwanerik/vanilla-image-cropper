import {MODES} from '../constants';
import {cell} from '../utils/Dom';

export default class Overlay {
    constructor (parent) {
        this.$$view = cell('svg', ['imgc-overlay'], {}, parent, true);

        this.$$path = cell('path', null, {
            'fill-rule' : 'evenodd'
        }, this.$$view, true);
    }

    update ({x, x2, y, y2, w, h}, {mode}) {
        const half_w = w * 0.5; //  Half width
        const half_h = h * 0.5; //  Half height
        const crop_w = x2 - x;  //  Crop Width
        const crop_h = y2 - y;  //  Crop Height

        this.$$path.setAttribute('d', `M 0 0 v ${h} h ${w} v ${-h} H-0zM` + ((mode === MODES.SQUARE)
            ? `${x} ${y} h ${crop_w} v ${crop_h} h ${-crop_w} V ${-crop_h} z`
            : `${x + crop_w * 0.5} ${y + crop_h * 0.5} m ${-half_w},0 a ${half_w}, ${half_h} 0 1,0 ${crop_w},0 a ${half_w}, ${half_h} 0 1,0 ${-crop_w} ,0 z`
        ));
    }
}