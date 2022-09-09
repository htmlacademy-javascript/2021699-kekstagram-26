import { getData } from './api.js';
import {renderPictures} from './render-picture.js';
import {initValidation} from './user-form.js';
// import {filterPictures} from './filter.js';
import {showAlert} from './util.js';
initValidation();

getData((pictures) =>{renderPictures(pictures);},showAlert);
