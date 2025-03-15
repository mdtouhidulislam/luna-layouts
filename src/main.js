/*
Flowbite Components
*/

// Import all components
//import 'flowbite';

// Using init helper function

import { initTooltips } from 'flowbite/lib/esm/components/tooltip';
document.addEventListener('DOMContentLoaded', () => {
  initTooltips();
});

// Using component class
/*
import Tooltip from 'flowbite/lib/esm/components/tooltip';
class CustomTooltip extends Tooltip {
  show() {
    this._targetEl.classList.remove('smw:opacity-0', 'smw:invisible');
    this._targetEl.classList.add('smw:opacity-100', 'smw:visible');
    super.show();
  }

  hide() {
    this._targetEl.classList.remove('smw:opacity-100', 'smw:visible');
    this._targetEl.classList.add('smw:opacity-0', 'smw:invisible');
    super.hide();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tooltip-target]').forEach((triggerEl) => {
    const tooltipId = triggerEl.getAttribute('data-tooltip-target');
    const tooltipEl = document.getElementById(tooltipId);
    if (tooltipEl) {
      new CustomTooltip(tooltipEl, triggerEl);
    }
  });
});
*/
/*
Custom Components
*/
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // if set via local storage previously
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
});
