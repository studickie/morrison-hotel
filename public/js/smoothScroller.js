//~ --------------------------------------------------------------
//*     Smooth Scroller Component
//~     -------------------------
//~     Parameters:
//~     1. element: HTMLElement; scroller containing element
//~
//~     Use:
//~     > modifies element CSS to create a smooth-scroll effects
//~     > requires a list with attribute 'data-role' as
//~         'scroll_list', children with attribute 'data-role' as 
//~         'scroll_item'
//~ --------------------------------------------------------------

function SmoothScroller(scrollElement) {
    this._index = 0;

    this._scrollElement = scrollElement;
    this._scrollList = new ScrollList(scrollElement.querySelector('[data-role=scroll_list]'));

    this._changeValues = {
        forward: 1,
        back: -1,
        noChange: 0
    };

    this.addTouchEvents();
    this.addClickEvents();
}

SmoothScroller.prototype = {
    handleChangeEvent: function (changeValue) {
        if (this.canScroll(this._index, changeValue)) {
            this._index = this.calcDifference(this._index, changeValue);
            this.transitionToNext(this.getTransformValue(this._index));
        }
    },
    addTouchEvents: function() {
        var ctrl = this;

        ctrl._scrollElement.addEventListener('touchstart', function (event) {
            var touchStartX = event.touches[0].clientX;
            
            ctrl._scrollElement.addEventListener('touchend', function touchEnd (event) {
                var touchEndX = event.changedTouches[0].clientX;
                ctrl.handleChangeEvent(ctrl.calcChangeValue(ctrl.calcDifference(touchStartX, touchEndX)));

                ctrl._scrollElement.removeEventListener('touchend', touchEnd);
            });
        });
    },
    addClickEvents: function() {
        var ctrl = this;
        var buttons = document.querySelectorAll('.scroller__button > button');

        if (buttons.length != 2) return; 

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var changeValue = ctrl._changeValues.noChange;
                
                if (this.name == 'scroll_right') {
                    changeValue = ctrl._changeValues.back;
                } else { //~ it's gunna' be scroll_left
                    changeValue = ctrl._changeValues.forward;
                }

                ctrl.handleChangeEvent(changeValue);
            });
        });
    },
    calcDifference(numberA, numberB) {
        return numberA - numberB;
    },
    calcChangeValue(delta) {
        return (delta > 0)
            ? this._changeValues.back
            : (delta < 0)
                ? this._changeValues.forward
                : this._changeValues.noChange;
    },
    canScroll: function (index, changeValue) {
        switch (changeValue) {
            case this._changeValues.back:
                return (index < this._scrollList.length - 1);
            case this._changeValues.forward:
                return (index > 0);
            default:
                return false;
        }
    },
    getTransformValue: function (multiplyer) {
        return ((this._scrollList.width * multiplyer) * -1);
    },
    transitionToNext: function (transformValue) {
        this._scrollList.element.style.transform = 'translate(' + transformValue + 'px)';
    }
};

function ScrollList(scrollElement) {
    this._scrollElement = scrollElement;
}

ScrollList.prototype = {
    get element() {
        return this._scrollElement;
    },
    get width() {
        return this._scrollElement.getBoundingClientRect().width;
    },
    get length() {
        return this._scrollElement.children.length;
    }
};