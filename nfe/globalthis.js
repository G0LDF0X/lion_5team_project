// globalthis.js
if (typeof globalThis === 'undefined') {
    window.globalThis = window;
  }
  
  window.global = window.globalThis;