// Class definition
var KTnoUiSliderDemos = function() {

    // Private functions
    var demo1 = function() {
        // init slider
        var slider = document.getElementById('kt_nouislider_1');
        var zooom = 0;

        noUiSlider.create(slider, {
            start: [ 400 ],
            step: 1,
            range: {
                'min': [ 200 ],
                'max': [ 700 ]
            },
            format: wNumb({
                decimals: 0,
                //postfix: 'px',
            })
        });

        // init slider input
        var sliderInput = document.getElementById('kt_nouislider_1_input');

        slider.noUiSlider.on('update', function( values, handle ) {
            
            sliderInput.value = values[handle];
            $("#eqtibas-wrapper").css({
                "width": values[handle],
                "height": values[handle],
            });
            zooom = values[handle];
            //document.getElementById("c").width=values[handle];
            //document.getElementById("c").height=values[handle];
            //document.getElementById("c").nextElementSibling.width=values[handle];
            //document.getElementById("c").nextElementSibling.height=values[handle];
            canvas.setHeight(values[handle]);
            canvas.setWidth(values[handle]);

            if(values[handle]<=zooom){
                zoomIn();
            } else {
                zoomOut();
            }
            
        });

        sliderInput.addEventListener('change', function(){
            slider.noUiSlider.set(this.value);

        });
    }

    return {
        // public functions
        init: function() {
            demo1();
        }
    };
}();

jQuery(document).ready(function() {
    KTnoUiSliderDemos.init();
});
