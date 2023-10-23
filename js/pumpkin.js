(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.halloweenLights = {
    attach: function (context, settings) {
      function setPumpkins() {
        // Check if the wrapper with ID 'halloween-lights' already exists.
        let wrapper = $('#halloween-lights');

        if (wrapper.length === 0) {
          // Create the wrapper if it doesn't exist.
          wrapper = $('<div id="halloween-lights"></div>');
          // Append the wrapper to the body.
          $('body').append(wrapper);
        }
        // if halloween-lights does not exist.
        if ($('#halloween-lights').length === 0) {
          $('body').append('<div id="halloween-lights"></div>');
        }

        // Define the SVG code for the pumpkins
        const pumpkinSvgCode = '<svg class="pump_' + i + '">' +
          '<circle class="glow" cx="32" cy="32" r="24" fill="#000" />' +
          '<path d="m37.191 10.93c-.003 0-.004-.001-.006-.002-1.525-.417-.9-2.579 1.595-5.115l-.009-.005c.391-.483-.504-1.534-2.187-2.49-1.854-1.053-3.947-1.584-4.672-1.185-.036.021-.05.051-.077.072l-.015-.007c-3.743 3.156-4.43 7.722-4.544 8.836-13.333-2.067-25.276 8.005-25.276 26.532 0 16.074 20.934 24.434 30 24.434s30-8.36 30-24.434c0-18.234-10.607-28.927-24.809-26.636m5.293 18.641c1.129-.363 12.24-5.444 12.24-3.952 0 1.755-6.086 10.864-10.617 12.276-1.436.447-6.887-3.902-5.816-9.188.272-1.335 2.645 1.364 4.193.864m-7.111-24.123c.652.266 1.281.451 1.826.55-1.311 1.803-2.219 4.374-1.463 5.065.93.849 2.875 1.941 3.457 2.394.58.452-2.736.564-4.094 1.979.001.001-3.357-5.587.274-9.988m-3.373 27.784c1.172 0 5.713 2.045 5.713 5.432 0 3.388-2.557.343-5.713.343-3.154 0-5.711 3.045-5.711-.343 0-3.387 4.539-5.432 5.711-5.432m-4.738-21.602c.299 2.085-1.76 3.865-1.76 3.865-.035-1.364-1.361-2.183-1.361-2.183.923-.982 3.121-1.682 3.121-1.682m-5.744 17.941c1.549.5 3.922-2.199 4.191-.864 1.07 5.286-4.381 9.636-5.814 9.188-4.532-1.412-10.616-10.521-10.616-12.276 0-1.492 11.11 3.589 12.239 3.952" fill="#f38b04" />' +
          '</svg>';

        for (let i = 1; i < 26; i++) {
          // Determine if this pumpkin should glow with an orange light
          const glowPumpkin = Math.random() < 0.5;

          // Create a pumpkin
          const pumpkin = '<div class="pumpkin">' +
            '<svg class="pump_' + i + '">' +
            (glowPumpkin ? '<circle class="glow" cx="32" cy="32" r="24" fill="#000" />' : '') +
            pumpkinSvgCode +
            '</svg>' +
            '</div>';

          // Append the pumpkin to the wrapper
          wrapper.append(pumpkin);

          // Toggle the glow class at regular intervals to make the pumpkins constantly change
          setInterval(function () {
            wrapper.find('.glow').toggleClass('glow-on');
          }, Math.random() * 3000 + 750);
        }
      }
      // Call the setPumpkins function.
      setPumpkins();
    }
  };
})(jQuery, Drupal);
