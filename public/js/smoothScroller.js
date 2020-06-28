//~ --------------------------------------------------------------
//*     Smooth Scroller Component
//~ --------------------------------------------------------------
//~     Parameters:
//~     1. $element: HTMLElement; toggle element container
//~
//~     Use:
//~     > requires scroll children have attribute data-role as 
//~         'scroll_item'
//~ --------------------------------------------------------------

function SmoothScroller ($element) {
    var ctrl = this;
    
    this._el = $element;
    ctrl._scrolling = false;
    ctrl._scrollList = $element.querySelector('[data-role=scroll_list]');
    ctrl._scrollCount = $element.querySelectorAll('[data-role=scroll_item]').length;
    ctrl._scrollIndex = 0;
    ctrl._scrollWidth = $element.getBoundingClientRect().width;
    ctrl._scrollStart = 0;
    ctrl._scrollChange = 0;
    ctrl._timeout = null;
    
    addSmoothScrollerEvents.call(ctrl);
}

SmoothScroller.prototype = {
    throttledUpdateScroll: function(changeValue) {
        var ctrl = this;

        if (!ctrl._scrolling) {
            ctrl._scrolling = true;

            setTimeout(function() { ctrl._scrolling = false; }, 500);

            ctrl._scrollChange = changeValue - ctrl._scrollStart;
        }

        return;
    },
    getScrollDirection: function() {
        if (this._scrollChange < 0 && this._scrollIndex < this._scrollCount) {
            this._scrollIndex++;
        }
        else if (this._scrollChange > 0 && this._scrollIndex > 0) {
            this._scrollIndex--;
        }

        this.scrollToElement();
        
        return;
    },
    scrollToElement: function() {
        //el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
        
        this._scrollList.style.transform='translate(' + (this._scrollWidth * (this._scrollIndex * -1)) + 'px)';
        
        return;
    }
}

function addSmoothScrollerEvents() {
    var ctrl = this;

    ctrl._el.addEventListener('touchstart', function(evt) {
        var eventDrag;
        
        ctrl._scrollStart = evt.touches[0].clientX;

        ctrl._el.addEventListener('touchmove', function eventDrag(evt) {
            ctrl.throttledUpdateScroll(evt.touches[0].clientX);
        });

        ctrl._el.addEventListener('touchend', function eventEnd(evt) {
            ctrl.getScrollDirection();

            //- Reset
            ctrl._scrollChange = 0;
            ctrl._scrollStart = 0;
            ctrl._el.removeEventListener('touchmove', eventDrag);
            ctrl._el.removeEventListener('touchend', eventEnd);
        });
    });
}