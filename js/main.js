import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showAlert } from './utils.js';
import { createFilters } from './create-filters.js';
import { sendFormData } from './send-form-data.js';

const initApplication = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
  } catch (err) {
    showAlert(err.message);
  }
};

initApplication();
createFilters();
sendFormData();
