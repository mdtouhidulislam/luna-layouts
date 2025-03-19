/*
Flowbite Components
*/

// Import all components
//import 'flowbite';

// Using init helper function
/*
import { initTooltips } from 'flowbite/lib/esm/components/tooltip';
document.addEventListener('DOMContentLoaded', () => {
  initTooltips();
});
*/

// Using component classes
import Tooltip from 'flowbite/lib/esm/components/tooltip';
import Dropdown from 'flowbite/lib/esm/components/dropdown';
// Create a custom wrapper for the Flowbite component that adds the prefix dynamically.
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
// Create a custom wrapper for the Dropdown component
class CustomDropdown extends Dropdown {
  show() {
    // Remove the default 'hidden' class and add 'smw:block'
    this._targetEl.classList.remove('smw:hidden');
    this._targetEl.classList.add('smw:block');
    super.show(); // Call the original show method
  }

  hide() {
    // Remove the default 'block' class and add 'smw:hidden'
    this._targetEl.classList.remove('smw:block');
    this._targetEl.classList.add('smw:hidden');
    super.hide(); // Call the original hide method
  }
}
document.addEventListener('DOMContentLoaded', () => {
  // Initialize tooltips
  document.querySelectorAll('[data-tooltip-target]').forEach((triggerEl) => {
    const tooltipId = triggerEl.getAttribute('data-tooltip-target');
    const tooltipEl = document.getElementById(tooltipId);
    if (tooltipEl) {
      new CustomTooltip(tooltipEl, triggerEl);
    }
  });
  // Initialize dropdowns
  document.querySelectorAll('[data-dropdown-toggle]').forEach((triggerEl) => {
    const dropdownId = triggerEl.getAttribute('data-dropdown-toggle');
    const dropdownEl = document.getElementById(dropdownId);
    if (dropdownEl) {
      new CustomDropdown(dropdownEl, triggerEl);
    }
  });
});

/*
Fallback Color Palette
*/
/*
import tinycolor from 'tinycolor2';
// Function to generate fallback colors
function generateFallbackColors(baseColor) {
  const color = tinycolor(baseColor); // Convert baseColor to a tinycolor object
  return {
    50: color.clone().lighten(30).toHexString(), // Adjusted lightening
    100: color.clone().lighten(25).toHexString(), // Adjusted lightening
    200: color.clone().lighten(20).toHexString(),
    300: color.clone().lighten(15).toHexString(),
    400: color.clone().lighten(10).toHexString(),
    500: color.toHexString(), // Base color
    600: color.clone().darken(10).toHexString(),
    700: color.clone().darken(20).toHexString(),
    800: color.clone().darken(30).toHexString(),
    900: color.clone().darken(40).toHexString(),
    950: color.clone().darken(45).toHexString(), // Darkest
  };
}

// Function to apply fallback colors for a specific color type (default or accent)
function applyFallbackColors(baseColor, colorType) {
  const fallbackColors = generateFallbackColors(baseColor);
  for (const [shade, color] of Object.entries(fallbackColors)) {
    document.documentElement.style.setProperty(`--smw-color-${colorType}-${shade}`, color);
  }
}

// Function to check if the browser supports oklch()
function supportsOklch() {
  try {
    // Create a temporary element and check if oklch() is supported
    const tempElement = document.createElement('div');
    tempElement.style.color = 'oklch(0 0 0)';
    return !!tempElement.style.color;
  } catch (e) {
    return false;
  }
}

// Function to get the base color from the CSS variable
function getBaseColorFromRoot(variableName) {
  // Get the computed value of the CSS variable from the root element
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// Apply fallback colors only if oklch() is not supported
if (!supportsOklch()) {
  // Handle default color palette
  const defaultBaseColor = getBaseColorFromRoot('--smw-color-default'); // Fetch default base color
  if (defaultBaseColor) {
    applyFallbackColors(defaultBaseColor, 'default'); // Apply default fallback colors
  } else {
    console.warn('Default base color (--smw-color-default) not found in :root. Using fallback color.');
    applyFallbackColors('#6b7280', 'default'); // Fallback to a default color
  }

  // Handle accent color palette
  const accentBaseColor = getBaseColorFromRoot('--smw-color-accent'); // Fetch accent base color
  if (accentBaseColor) {
    applyFallbackColors(accentBaseColor, 'accent'); // Apply accent fallback colors
  } else {
    console.warn('Accent base color (--smw-color-accent) not found in :root. Using fallback color.');
    applyFallbackColors('#84cc16', 'accent'); // Fallback to an accent color
  }

  // Handle heading color palette
  const headingBaseColor = getBaseColorFromRoot('--smw-color-heading'); // Fetch heading base color
  if (headingBaseColor) {
    applyFallbackColors(headingBaseColor, 'heading'); // Apply heading fallback colors
  } else {
    console.warn('Heading base color (--smw-color-heading) not found in :root. Using fallback color.');
    applyFallbackColors('#1e3a8a', 'heading'); // Fallback to an heading color
  }
}

// Log oklch() support status
if (supportsOklch()) {
  console.log('oklch() is supported');
} else {
  console.log('oklch() is not supported');
  document.documentElement.classList.add('fallback-color-palette');
}
*/

/*
Test Out Color manipulation
*/
import chroma from 'chroma-js';

document.addEventListener('DOMContentLoaded', function () {
  function generateTailwindPalette(baseColor, colorName) {
    const steps = [50, 100, 200, 300, 400, 600, 700, 800, 900, 950]; // Skipping 500

    // Generate light → base → dark shades
    const isDark = chroma(baseColor).luminance() < 0.3;
    console.log(`${colorName} - ${isDark ? 'Dark' : 'Light'} color detected:`, baseColor); // Debugging

    const scale = chroma
      .scale([
        chroma(baseColor).brighten(isDark ? 3.25 : 3.5), // Brighter for dark colors
        baseColor,
        chroma(baseColor).darken(isDark ? 3.25 : 3.5), // Darker for light colors
      ])
      .mode('lab')
      .colors(steps.length);

    // Apply colors to root variables
    const root = document.documentElement;
    steps.forEach((step, index) => {
      root.style.setProperty(`--smw-color-${colorName}-${step}`, scale[index]);
    });

    console.log(`${colorName} Updated Palette:`, scale); // Debugging
  }

  // Define the color variables to process
  const defaultColorVariable = '--smw-color-default';
  const defaultColorValue = '#6b7280'; // Default Tailwind Gray-500

  const colorVariables = [
    { name: 'default', var: defaultColorVariable, excludeValue: defaultColorValue },
    { name: 'accent', var: '--smw-color-accent' },
  ];

  colorVariables.forEach(({ name, var: cssVar, excludeValue }) => {
    let baseColor = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();

    if (baseColor) {
      // Only process default if it's not the default value
      if (name === 'default' && baseColor.toLowerCase() === excludeValue) {
        console.log(`Skipping ${name} color as it's the default: ${excludeValue}`);
        return;
      }
      generateTailwindPalette(baseColor, name);
    }
  });
});

/*
Custom Components
*/
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('smw:hidden');
} else {
  themeToggleDarkIcon.classList.remove('smw:hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('smw:hidden');
  themeToggleLightIcon.classList.toggle('smw:hidden');

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
