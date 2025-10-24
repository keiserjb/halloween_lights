(function ($) {
  'use strict';

  Backdrop.behaviors.halloweenLights = {
    attach: function (context, settings) {

      function hlCustomTop() {
        var s = Backdrop.settings.halloween_lights || {};
        if (!s.lightsCustomMargin) return 0;
        var v = parseInt(s.lightsCustomMarginText, 10);
        return (isNaN(v) || v < 0) ? 0 : v;
      }
      function hlSetBaseTop(baseTop) { // for toolbars/admin bars only
        $('#halloween-lights').css('top', (baseTop || 0) + 'px');
      }
      function hlApplyCustomPadding() { // paint the custom gap with the bar's bg
        $('#halloween-lights').css('padding-top', hlCustomTop() + 'px');
      }

      function setPumpkins() {
        let $wrapper = $('#halloween-lights');
        let created = false;

        if ($wrapper.length === 0) {
          created = true;
          $wrapper = $('<div id="halloween-lights"></div>');
          $('header').first().prepend($wrapper);
        }

        // Clear existing intervals
        let intervalIds = $wrapper.data('hlIntervals') || [];
        intervalIds.forEach(clearInterval);
        intervalIds = [];

        if (created) {
          for (let i = 1; i < 26; i++) {
            const glow = Math.random() < 0.5;
            if (glow) {
              const $p = $(
                '<div class="pumpkin"><svg class="pumpkin__item pump_' + i + '" viewBox="0 0 64 64">' +
                '<circle class="glow" cx="32" cy="32" r="24" fill="#000" />' +
                '<path d="m37.191 10.93c-.003 0-.004-.001-.006-.002-1.525-.417-.9-2.579 1.595-5.115l-.009-.005c.391-.483-.504-1.534-2.187-2.49-1.854-1.053-3.947-1.584-4.672-1.185-.036.021-.05.051-.077.072l-.015-.007c-3.743 3.156-4.43 7.722-4.544 8.836-13.333-2.067-25.276 8.005-25.276 26.532 0 16.074 20.934 24.434 30 24.434s30-8.36 30-24.434c0-18.234-10.607-28.927-24.809-26.636m5.293 18.641c1.129-.363 12.24-5.444 12.24-3.952 0 1.755-6.086 10.864-10.617 12.276-1.436.447-6.887-3.902-5.816-9.188.272-1.335 2.645 1.364 4.193.864m-7.111-24.123c.652.266 1.281.451 1.826.55-1.311 1.803-2.219 4.374-1.463 5.065.93.849 2.875 1.941 3.457 2.394.58.452-2.736.564-4.094 1.979.001.001-3.357-5.587.274-9.988m-3.373 27.784c1.172 0 5.713 2.045 5.713 5.432 0 3.388-2.557.343-5.713.343-3.154 0-5.711 3.045-5.711-.343 0-3.387 4.539-5.432 5.711-5.432m-4.738-21.602c.299 2.085-1.76 3.865-1.76 3.865-.035-1.364-1.361-2.183-1.361-2.183.923-.982 3.121-1.682 3.121-1.682m-5.744 17.941c1.549.5 3.922-2.199 4.191-.864 1.07 5.286-4.381 9.636-5.814 9.188-4.532-1.412-10.616-10.521-10.616-12.276 0-1.492 11.11 3.589 12.239 3.952m30.832 19.391-3.492-1.979-2.221 5.687-3.65-3.583-2.857 6.797-7.459-5.315-3.809 4.575-4.125-4.82-6.348 2.347-3.695-6.513-4.766 2.112-3.123-12.78 4.791 7.998 4.666-2.471 2.92 5.596 5.25-3.041 4.283 5.769 4.035-5.522 4.939 3.709 3.016-4.334 4.643 2.493 2.756-5.163 3.252 3.379 7.342-8.412z" fill="#f38b04" />' +
                '</svg></div>'
              );
              $wrapper.append($p);
              $wrapper.append($p);
              const id = setInterval(function () {
                $p.find('.glow').toggleClass('glow-on');     
              }, Math.random() * 3000 + 750);
              intervalIds.push(id);
            } else {
              $wrapper.append(
                '<div class="pumpkin"><svg class="pumpkin__item pump_' + i + '" viewBox="0 0 64 64">' +
                '<circle cx="32" cy="32" r="24" fill="#000" />' +
                '<path d="m37.191 10.93c-.003 0-.004-.001-.006-.002-1.525-.417-.9-2.579 1.595-5.115l-.009-.005c.391-.483-.504-1.534-2.187-2.49-1.854-1.053-3.947-1.584-4.672-1.185-.036.021-.05.051-.077.072l-.015-.007c-3.743 3.156-4.43 7.722-4.544 8.836-13.333-2.067-25.276 8.005-25.276 26.532 0 16.074 20.934 24.434 30 24.434s30-8.36 30-24.434c0-18.234-10.607-28.927-24.809-26.636m5.293 18.641c1.129-.363 12.24-5.444 12.24-3.952 0 1.755-6.086 10.864-10.617 12.276-1.436.447-6.887-3.902-5.816-9.188.272-1.335 2.645 1.364 4.193.864m-7.111-24.123c.652.266 1.281.451 1.826.55-1.311 1.803-2.219 4.374-1.463 5.065.93.849 2.875 1.941 3.457 2.394.58.452-2.736.564-4.094 1.979.001.001-3.357-5.587.274-9.988m-3.373 27.784c1.172 0 5.713 2.045 5.713 5.432 0 3.388-2.557.343-5.713.343-3.154 0-5.711 3.045-5.711-.343 0-3.387 4.539-5.432 5.711-5.432m-4.738-21.602c.299 2.085-1.76 3.865-1.76 3.865-.035-1.364-1.361-2.183-1.361-2.183.923-.982 3.121-1.682 3.121-1.682m-5.744 17.941c1.549.5 3.922-2.199 4.191-.864 1.07 5.286-4.381 9.636-5.814 9.188-4.532-1.412-10.616-10.521-10.616-12.276 0-1.492 11.11 3.589 12.239 3.952m30.832 19.391-3.492-1.979-2.221 5.687-3.65-3.583-2.857 6.797-7.459-5.315-3.809 4.575-4.125-4.82-6.348 2.347-3.695-6.513-4.766 2.112-3.123-12.78 4.791 7.998 4.666-2.471 2.92 5.596 5.25-3.041 4.283 5.769 4.035-5.522 4.939 3.709 3.016-4.334 4.643 2.493 2.756-5.163 3.252 3.379 7.342-8.412z" fill="#f38b04" />' +
                '</svg></div>'
              );
            }
          }
          $wrapper.data('hlIntervals', intervalIds);
        }
      }

      // NEW: non-fixed behavior → full width + hide on scroll
      function setupNonFixedBehavior() {
        var s = Backdrop.settings.halloween_lights || {};
        if (s.lightsTopFixed) return;

        var $lights = $('#halloween-lights');
        if (!$lights.length) return;

        var $header = $('header').first();
        if (!$lights.parent().is($header)) $lights.detach().prependTo($header);

        function measure() {
          // Apply custom padding so it paints the header color
          $lights.css({ height: 'auto', paddingTop: hlCustomTop() + 'px' });
          var H = $lights.outerHeight() || 0;      // now includes custom padding
          $lights.data('hlHeight', H);
          $lights.css('height', H + 'px');
        }
        function onScroll() {
          var hide = $(window).scrollTop() > 5;
          if (hide) {
            $lights.css({ height: '0px', paddingTop: '0px' }); // collapse everything
          } else {
            var H = $lights.data('hlHeight') || 0;
            $lights.css({ height: H + 'px', paddingTop: hlCustomTop() + 'px' });
          }
        }

        measure();
        onScroll();
        $(window).off('scroll.hlightsNF').on('scroll.hlightsNF', onScroll);
        $(window).off('resize.hlightsNF').on('resize.hlightsNF', function () {
          measure();
          onScroll();
        });
      }

      function applyHeaderOffset() {
        var s = Backdrop.settings.halloween_lights || {};
        var fixed = !!s.lightsTopFixed;

        var $header = $('header.l-header').first();
        if (!$header.length) $header = $('header').first();

        if ($header.data('hlBasePadding') === undefined) {
          var basePad = parseInt($header.css('padding-top'), 10);
          $header.data('hlBasePadding', isNaN(basePad) ? 0 : basePad);
        }
        var basePadding = $header.data('hlBasePadding');

        $header.css('margin-top', ''); // never use margin for this

        var $lights = $('#halloween-lights');
        if (!$lights.length) return;

        // Helper: measure any admin bars that should sit above the lights.
        function computeBaseTop() {
          var top = 0;
          // Core admin bar adds a border-top to body. Use that if configured.
          if (s.lightsCoreToolbar) {
            var btw = parseInt($('body').css('border-top-width'), 10);
            if (!isNaN(btw) && btw > 0) top += btw;
            // Fallback: direct admin bar height if present and visible.
            var $ab = $('#admin-bar:visible');
            if ($ab.length) top = Math.max(top, $ab.outerHeight() || 0);
          }
          // Admin menu (contrib) classic ID.
          if (s.lightsAdminMenu) {
            var $am = $('#admin-menu:visible');
            if ($am.length) top += ($am.outerHeight() || 0);
          }
          // Bootstrap fixed navbar at top.
          if (s.lightsBootstrapFixed) {
            var $nv = $('.navbar-fixed-top:visible').first();
            if ($nv.length) top += ($nv.outerHeight() || 0);
          }
          return top;
        }

        var baseTop = computeBaseTop();

        if (!fixed) {
          // NON-FIXED: put custom spacing inside the bar as padding
          $lights.css({ top: '', paddingTop: hlCustomTop() + 'px' });
          $header.css('padding-top', basePadding + 'px');    // header stays at base
          return;
        }

        // FIXED: place lights under admin bars and push header by lights height only.
        $lights.css('top', baseTop + 'px');
        // Height including any custom padding inside the lights.
        var H = $lights.outerHeight(true) || 0;
        $header.css('padding-top', (basePadding + H) + 'px');
      }

      // Run:
      setPumpkins();
      setTimeout(function () {
        setupNonFixedBehavior();   // non-fixed
        applyHeaderOffset();       // fixed
      }, 60);

      var _hlResizeTimer;
      $(window)
        .off('load.hlights resize.hlights')
        .on('load.hlights resize.hlights', function () {
          clearTimeout(_hlResizeTimer);
          _hlResizeTimer = setTimeout(function () {
            setupNonFixedBehavior();
            applyHeaderOffset();
          }, 80);
        });
    }
  };
})(jQuery);
