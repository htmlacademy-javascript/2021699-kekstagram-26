import { generatePhotos} from './data.js';
import {renderPictures} from './render-picture.js';
import './render-big-picture.js';

const pictures = generatePhotos(25);
renderPictures(pictures);
