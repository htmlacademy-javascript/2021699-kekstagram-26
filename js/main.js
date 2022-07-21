import { generatePhotos} from './data.js';
import {renderPictures} from './render-picture.js';
import {initValidation} from './user-form.js';
import {scallerControlPhoto, checkoutEffects} from './slider.js';

const pictures = generatePhotos(25);
renderPictures(pictures);
initValidation();
scallerControlPhoto();
checkoutEffects();
