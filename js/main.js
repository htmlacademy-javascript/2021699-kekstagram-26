import { getData} from './api.js';
import {initValidation} from './user-form.js';
import {renderApp} from './filter.js';
import {showAlert} from './util.js';
import './avatar.js';

initValidation();
getData(renderApp, showAlert);


