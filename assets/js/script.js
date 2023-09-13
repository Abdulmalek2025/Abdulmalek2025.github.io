jQuery(document).ready(function() {

    //open menu
    $('#kt_aside_mobile_toggle').click();

    //Notify message Script
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    //Validation Script
    FormValidation.formValidation(
        document.getElementById('addmemo'),
        {
         fields: {
    
          memo: {
           validators: {
            empty: {
             message: 'الرَّجاء أدخال النّصّ'
            },
            stringLength: {
             max:140,
             message: 'الأحرف المدخلة أكثر من 140'
            }
           }
          },
    
         },
       
         plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap(),
          // Validate fields when clicking the Submit button
          submitButton: new FormValidation.plugins.SubmitButton(),
                   // Submit the form when all fields are valid
          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
         }
        }
       );

    //position canvas
    $('#positionObjectCanvasBtn').click(function(){
        $('#card-position-wrap').show();
        $('#positionObjectCanvasBtn').toggleClass("bg-dark-o-50");
    });

    //Transparency canvas
    $('#transparencyObjectCanvasBtn').click(function(){
        $('#card-transparency-wrap').show();
        $('#transparencyObjectCanvasBtn').toggleClass("bg-dark-o-50");
    });

    //More setting canvas
    $('#settingMoreCanvasBtn').click(function(){
        $('#card-setting-more-wrap').show();
        $('#settingMoreCanvasBtn').toggleClass("bg-dark-o-50");
    });

    //Font Size canvas
    $('#font-size-btn').click(function(){
        $('#card-font-size-wrap').show();
        $('#font-size-btn').toggleClass("bg-dark-o-50");
    });

    //Font Colors canvas
    $('#font-color-btn').click(function () {
        $('#card-font-color-wrap').show();
        $('#font-color-btn').toggleClass("bg-light");
    });
    

    $('#font-name-btn').click(function(){
        $('#aside-controls-wrap').show();
        $('.nav-link.active').removeClass('active');
        $('#text-wrap-btn').removeClass('active');
        $('#filter-wrap-btn').removeClass('active');
        //open menu
        $('#kt_aside_mobile_toggle').click();
    });

    $('#filter-wrap-btn').click(function(){
        $('#aside-controls-wrap').show();
        $('.nav-link.active').removeClass('active');
        $('#font-name-btn').removeClass('active');
        $('#text-wrap-btn').removeClass('active');
        //open menu
        $('#kt_aside_mobile_toggle').click();
    });

    $('#text-wrap-btn').click(function(){
        $('#aside-controls-wrap').show();
        $('.nav-link.active').removeClass('active');
        $('#font-name-btn').removeClass('active');
        $('#filter-wrap-btn').removeClass('active');
        //open menu
        $('#kt_aside_mobile_toggle').click();
    });

    $('body').mouseup(function (e) {
        var container = $('#card-position-wrap');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
             container.hide(100);
            $('#positionObjectCanvasBtn').removeClass('bg-dark-o-50');
        }
        var container2 = $('#card-transparency-wrap');
        if (!container2.is(e.target) && container2.has(e.target).length === 0) {
             container2.hide(100);
            $('#transparencyObjectCanvasBtn').removeClass('bg-dark-o-50');
        }
        var container3 = $('#card-font-size-wrap');
        if (!container3.is(e.target) && container3.has(e.target).length === 0) {
             container3.hide(100);
            $('#font-size-btn').removeClass('bg-dark-o-50');
        }
        var container4 = $('#card-setting-more-wrap');
        if (!container4.is(e.target) && container4.has(e.target).length === 0) {
             container4.hide(100);
            $('#settingMoreCanvasBtn').removeClass('bg-dark-o-50');
        }
    });

    //owl-Carousel-Colors
    var owl_color = $('.owl-carousel-colors');
    owl_color.owlCarousel({
        rtl: true,
        margin: 5,
        nav: true,
        loop: false,
        responsive:{
            0:{
                items:3,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    });

    //Filters Options
    $("#filters-form input[type=checkbox]").change(function() {
        var fow = $(this).parent().parent().parent().parent().children('.filter-options-wrap')
        if(this.checked) {
            fow.css({
                'display': 'flex',
            });
        } else {
            fow.css({
                'display': 'none',
            });
        }
    });

    //Text Shadow Options
    $("#text-setting-form #text-shadow").change(function() {
        var fow = $('#text-shadow-options-wrap')
        if(this.checked) {
            fow.css({
                'display': 'flex',
            });

            let obj = canvas.getActiveObject();
            obj.set({
                shadow: new fabric.Shadow({
                    color: '#000000',
                    blur: 1,
                    offsetX: 0,
                    offsetY: 3
                }),
            });
            canvas.renderAll();

        } else {
            fow.css({
                'display': 'none',
            });

            let obj = canvas.getActiveObject();
            obj.shadow = null;
            canvas.renderAll();
        }
    });

    $('#shadowColorInput').on('input', function () {
        let colors = $(this).val();
        let obj = canvas.getActiveObject();
        let shadowBlur = obj.shadow.blur;
        let shadowoffsetX = obj.shadow.offsetX;
        let shadowoffsetY = obj.shadow.offsetY;
        obj.set({
            shadow: new fabric.Shadow({
                color: colors,
                blur: shadowBlur,
                offsetX: shadowoffsetX,
                offsetY: shadowoffsetY
            }),
        });
        canvas.renderAll();

        $('#shadowColorWrap').css({
            'background-color': colors,
        });
      });

      $('#shadowBlurInput').on('input', function () {
        let blurs = $(this).val();
        let obj = canvas.getActiveObject();
        let shadowColor = obj.shadow.color;
        let shadowoffsetX = obj.shadow.offsetX;
        let shadowoffsetY = obj.shadow.offsetY;
        obj.set({
            shadow: new fabric.Shadow({
                color: shadowColor,
                blur: blurs,
                offsetX: shadowoffsetX,
                offsetY: shadowoffsetY
            }),
        });
        canvas.renderAll();
      });

      $('#shadowoffsetXInput').on('input', function () {
        let offsetXs = $(this).val();
        let obj = canvas.getActiveObject();
        let shadowColor = obj.shadow.color;
        let shadowBlur = obj.shadow.blur;
        let shadowoffsetY = obj.shadow.offsetY;
        obj.set({
            shadow: new fabric.Shadow({
                color: shadowColor,
                blur: shadowBlur,
                offsetX: offsetXs,
                offsetY: shadowoffsetY
            }),
        });
        canvas.renderAll();
      });

      $('#shadowoffsetYInput').on('input', function () {
        let offsetYs = $(this).val();
        let obj = canvas.getActiveObject();
        let shadowColor = obj.shadow.color;
        let shadowBlur = obj.shadow.blur;
        let shadowoffsetX = obj.shadow.offsetX;
        obj.set({
            shadow: new fabric.Shadow({
                color: shadowColor,
                blur: shadowBlur,
                offsetX: shadowoffsetX,
                offsetY: offsetYs
            }),
        });
        canvas.renderAll();
      });

    //Text Stroke Options
    $("#text-setting-form #text-stroke").change(function() {
        var fow = $('#text-stroke-options-wrap')
        if(this.checked) {
            fow.css({
                'display': 'flex',
            });

            let obj = canvas.getActiveObject();
            obj.set({
                stroke: 'red',
                strokeWidth: 1,
            });
            canvas.renderAll();

        } else {
            fow.css({
                'display': 'none',
            });

            let obj = canvas.getActiveObject();
            obj.set({
                stroke: null,
                strokeWidth: 0,
            });
            canvas.renderAll();
        }
    });

    $('#strokeColorInput').on('input', function () {
        let strokecolors = $(this).val();
        let obj = canvas.getActiveObject();
        let strokeWidths = obj.strokeWidth;
        obj.set({
            stroke: strokecolors,
            strokeWidth: strokeWidths,
        });
        canvas.renderAll();

        $('#strokeColorWrap').css({
            'background-color': strokecolors,
        });
      });

      $('#strokeWidthInput').on('input', function () {
        let widths = $(this).val();
        let obj = canvas.getActiveObject();
        let strokeColors = obj.stroke;
        obj.stroke = strokeColors;
        obj.strokeWidth = parseFloat(widths);
        canvas.renderAll();
      });

    //Search Text
    var nomatch = document.getElementById("noResultText");
    $("#textSearch").on('keyup', function(){
        var value = $(this).val().toLowerCase();
        let itemsFound = false;
        $(".textTahaniWrap .textTahaniItem").each(function () {
        if ($(this).text().toLowerCase().search(value) > -1) {
            $(this).show();
            itemsFound = true;
        } else {
            $(this).hide();
        }
        });
        nomatch.style.display = itemsFound ? "none" : "block";
    });

    var nomatchMolod = document.getElementById("noResultTextMolod");
    $("#textSearchMolod").on('keyup', function(){
        var value = $(this).val().toLowerCase();
        let itemsFound = false;
        $(".textTahaniMolodWrap .textTahaniMolodItem").each(function () {
        if ($(this).text().toLowerCase().search(value) > -1) {
            $(this).show();
            itemsFound = true;
        } else {
            $(this).hide();
        }
        });
        nomatchMolod.style.display = itemsFound ? "none" : "block";
    });

    var nomatchAam = document.getElementById("noResultTextAam");
    $("#textSearchAam").on('keyup', function(){
        var value = $(this).val().toLowerCase();
        let itemsFound = false;
        $(".textTahaniAamWrap .textTahaniAamItem").each(function () {
        if ($(this).text().toLowerCase().search(value) > -1) {
            $(this).show();
            itemsFound = true;
        } else {
            $(this).hide();
        }
        });
        nomatchAam.style.display = itemsFound ? "none" : "block";
    });

    var nomatchFont = document.getElementById("noResultFontName");
    $("#fontNameSearch").on('keyup', function(){
        var value = $(this).val().toLowerCase();
        let itemsFound = false;
        $("#fontsFamilyWrap .fontsItem").each(function () {
        if ($(this).text().toLowerCase().search(value) > -1) {
            $(this).show();
            itemsFound = true;
        } else {
            $(this).hide();
        }
        });
        nomatchFont.style.display = itemsFound ? "none" : "block";
    });

});

//JS
var avatar1 = new KTImageInput('add_bg_wrap');
var avatar2 = new KTImageInput('add_wasaam_wrap');
var avatar3 = new KTImageInput('add_makhtotah_wrap');

//Drawing Mode
function drawingModeCancel() {
    canvas.isDrawingMode = false;
    if (!canvas.isDrawingMode) {
        document.getElementById('drawing-mode').innerHTML = 'تفعيل وضع الرسم';
        document.getElementById('drawing-mode-options').style.opacity = '0.4';
        document.getElementById('drawing-mode-options').style.pointerEvents = 'none';
    }
    document.getElementById('font-name-btn').classList.remove('active');
    document.getElementById('filter-wrap-btn').classList.remove('active');
    document.getElementById('text-wrap-btn').classList.remove('active');
};

//Right Menu
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}

$(function() {

    var $contextMenu = $("#contextMenu");
    var $isCnvBlank = $("#isCanvasBlankWrap");
    var $isNotCnvBlank = $("#isCanvasNotBlankWrap");

    $("body").on("contextmenu", "#eqtibas-wrapper", function(e) {

        var cnv = document.getElementById('canvas-container');
        if (isCanvasBlank(cnv)){
            $contextMenu.css({
                display: "block",
                left: e.pageX,
                top: e.pageY
            });
            $isCnvBlank.css({
                display: "block"
            });
            $isNotCnvBlank.css({
                display: "none"
            });
        } else {
            $contextMenu.css({
                display: "block",
                left: e.pageX,
                top: e.pageY
            });
            $isCnvBlank.css({
                display: "none"
            });
            $isNotCnvBlank.css({
                display: "block"
            });
        }
        //debugger;
        return false;
    });

    $('html').click(function() {
         $contextMenu.hide();
    });

});