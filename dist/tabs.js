/*! Tabs - v0.0.4 - 2014-01-22
* https://github.com/daveespionage/jquery-tabs
* Copyright (c) 2014 David Cox-Espenlaub; Licensed MIT */
(function($){
  $.fn.tabs = function(options) {
    // on click of one of tabs
    var displayPage = function(e) {
      var $that = $(this),
        o = e.data.o;
      var $parent = $that.parent();
      var current = $parent.attr("data-tab-current"),
        ident = $that.attr("data-tab");
      var currentSel = '[data-tab="' + current + '"]',
        identSel = '[data-tab="' + ident + '"]';
            var currHeight;

      if(ident !== current){

                // find the current height for the current content;
                currHeight = $(o.cselector + currentSel).height();

        // hide current content
        $(o.selector + currentSel + ', '+ o.cselector + currentSel).removeClass(o.activeClass);

        // show new content
        $(o.selector + identSel + ', '+ o.cselector + identSel).addClass(o.activeClass);

                // shim up the height of the new content so that the page doesn't shrink in height
                // and then immediately grow again.  This is strictly for appearances.  A better user
                // experience
                $(o.cselector + identSel).height(currHeight);

        // update current data
        $parent.attr("data-tab-current",ident);

                // clear our height  -- have to wait so that browser actually applies the height, otherwise javascript
                // or perhaps browser optomization recognizes that height is getting erased and never sets the height.
                window.setTimeout(function(){
                    $(o.cselector + identSel).css('height','');
                },2000);

        // call callback
        if($.isFunction(o.callback)) {
          o.callback.apply(this,[e,ident]);
        }
      }
      e.preventDefault();
    };

    var settings = {
      // default tab class
      selector : '.tab',
      // default tab content class
      cselector: '.tab-content',
      // default selected state class
      activeClass: 'selected',
      // default callback (does nothing)
      callback: function(e,ident){
      }
    };

    // get our options together
    $.extend( settings, options );

    options = settings;

    return this.each (function () {
      // set up variables
      var o = options,
      container = this,
      $parent = $(o.selector).parent(),
      $navitem = $(o.selector,container).first();

      // store which tab we are on
      var ident = $navitem.attr('data-tab');
      $parent.attr("data-tab-current",ident);

      // set current tab active
      $navitem.addClass(o.activeClass);

      // hide other tab contents
      var $pages = $(o.cselector + '[data-tab!="' + ident + '"]', container);
      $pages.removeClass(o.activeClass);

      // add trigger event to tabs
      var $tabs = $(o.selector, container);
      $tabs.on('click.tabs',{o:o},displayPage);
    });

  };
})(jQuery);
