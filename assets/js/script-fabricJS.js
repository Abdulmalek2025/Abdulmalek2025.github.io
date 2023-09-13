//fabricJS
// Initialize a simple canvas
var canvas = new fabric.Canvas("canvas-container", {
    isDrawingMode: false,
    hoverCursor: 'default',
    selection: true,
    preserveObjectStacking: true,
});

const ctx = canvas.getContext('2d');

canvas.backgroundColor = '#FFFFFF';
initCenteringGuidelines(canvas);
initAligningGuidelines(canvas);

fabric.Object.prototype.controls.mtr.offsetY = -25;
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: '#FFFFFF',
    cornerStrokeColor: '#3699FF',
    borderColor: '#BDF8FA',
    cornerSize: 12,
    borderScaleFactor: 2,
    padding: 10,
    cornerStyle: 'circle',
    borderDashArray: [6, 3]
  });

//global variables 
canvasScale = 1;
SCALE_FACTOR = 1.11;
var zoomLevel = 1;
var canvasHeight = 360;
var canvasWidth = 360;
var selectMach = 1;

//Global display/hide controls
canvas.on('selection:updated', function () {
   let objType = (canvas.getActiveObject().type ? canvas.getActiveObject().type : "");
   if(objType === 'textbox'){
      document.getElementById('fonts-control-wrap').hidden = false;
      document.getElementById('shapes-control-wrap').hidden = true;
      document.getElementById('filters-wrapper').hidden = true;
      //document.getElementById('font-name-btn').classList.remove('active');
      document.getElementById('filter-wrap-btn').classList.remove('active');
      document.getElementById('text-wrap-btn').classList.remove('active');
   } else if(objType === 'image'){
      document.getElementById('fonts-control-wrap').hidden = true;
      document.getElementById('shapes-control-wrap').hidden = false;
      document.getElementById('filters-wrapper').hidden = false;
      document.getElementById('font-name-btn').classList.remove('active');
      //document.getElementById('filter-wrap-btn').classList.remove('active');
   } else if(objType === 'path'){
      document.getElementById('shapes-control-wrap').hidden = false;
      document.getElementById('filters-wrapper').hidden = false;
      document.getElementById('fonts-control-wrap').hidden = true;
      document.getElementById('font-name-btn').classList.remove('active');
      //document.getElementById('filter-wrap-btn').classList.remove('active');
   }
 });

canvas.on('selection:created', function () {
  let objType = (canvas.getActiveObject().type ? canvas.getActiveObject().type : "");
   if(objType === 'textbox'){
     document.getElementById('fonts-control-wrap').hidden = false;
     document.getElementById('shapes-control-wrap').hidden = true;
     document.getElementById('filters-wrapper').hidden = true;
     //document.getElementById('font-name-btn').classList.remove('active');
     document.getElementById('filter-wrap-btn').classList.remove('active');
     document.getElementById('text-wrap-btn').classList.remove('active');
   } else if(objType === 'image'){
    document.getElementById('fonts-control-wrap').hidden = true;
    document.getElementById('shapes-control-wrap').hidden = false;
    document.getElementById('filters-wrapper').hidden = false;
    document.getElementById('font-name-btn').classList.remove('active');
    //document.getElementById('filter-wrap-btn').classList.remove('active');
   } else if(objType === 'path'){
    document.getElementById('shapes-control-wrap').hidden = false;
    document.getElementById('filters-wrapper').hidden = false;
    document.getElementById('fonts-control-wrap').hidden = true;
    document.getElementById('font-name-btn').classList.remove('active');
    //document.getElementById('filter-wrap-btn').classList.remove('active');
   }
  document.getElementById('global-controls-wrap').hidden = false;
});

canvas.on('selection:cleared', function () {
  document.getElementById('global-controls-wrap').hidden = true;
  document.getElementById('fonts-control-wrap').hidden = true;
  document.getElementById('shapes-control-wrap').hidden = true;
  document.getElementById('filters-wrapper').hidden = true;
});

//set properties of objects
canvas.on({
  'selection:updated': HandleElement,
  'selection:created': HandleElement
});

function HandleElement(){
  let activeObj = canvas.getActiveObject();
  //set opacity or transperency of objects
  let opc = canvas.getActiveObject().get('opacity');
  $('#transparencyLabel').val(opc*100);
  $('#transparencyInputRange').val(opc*100);

  //set font family name
  let fontsName = canvas.getActiveObject().get('fontFamily');
  let fontsNameText = $("[data-font-family="+fontsName+"] .font-title").text();
  $('#font-family-name-drop').text(fontsNameText);

  let fontActive = $('.font-family-btn');
  for(i = 0; i < fontActive.length; i++){
      fontActive[i].classList.remove('active');
  }
  $("[data-font-family="+fontsName+"]").addClass('active'); 

  //set font size
  let fonsz = parseInt(canvas.getActiveObject().get('fontSize')).toFixed(0);
  $('#fontSizeLabel').val(fonsz);
  $('#fontSizeLabelView').text(fonsz);
  $('#fontSizeInputRange').val(fonsz);

  //set font color
  let fonCor = canvas.getActiveObject().get('fill');
  $('#fontColorLabel').val(fonCor);
  $('#fontColorWrap').css({
      'background-color': fonCor,
  });

  //set text shadow
  let txtShadow = activeObj.shadow;
  if(txtShadow == null){
    $('#text-shadow').prop( 'checked', false );
    $('#text-shadow-options-wrap').css({
        'display': 'none',
    });
    $('#shadowColorWrap').css({
      'background-color': '#000000',
    });
    $('#shadowColorInput').val('#000000');
    $('#shadowBlurInput').val(1);
    $('#shadowoffsetXInput').val(0);
    $('#shadowoffsetYInput').val(0);
  } else {
    $('#text-shadow').prop( 'checked', true );
    $('#text-shadow-options-wrap').css({
        'display': 'flex',
    });

    let shadowColor = activeObj.shadow.color;
    let shadowBlurs = activeObj.shadow.blur;
    let shadowoffsetX = activeObj.shadow.offsetX;
    let shadowoffsetY = activeObj.shadow.offsetY;

    $('#shadowColorWrap').css({
        'background-color': shadowColor,
    });
    $('#shadowColorInput').val(shadowColor);
    $('#shadowBlurInput').val(shadowBlurs);
    $('#shadowoffsetXInput').val(shadowoffsetX);
    $('#shadowoffsetYInput').val(shadowoffsetY);

  }

  //set text stroke
  let txtStroke = activeObj.stroke;
  if(txtStroke == null){
    $('#text-stroke').prop( 'checked', false );
    $('#text-stroke-options-wrap').css({
        'display': 'none',
    });
    $('#strokeColorWrap').css({
      'background-color': '#FF0000',
    });
    $('#strokeColorInput').val('#FF0000');
    $('#strokeWidthInput').val(0);
  } else {
    $('#text-stroke').prop( 'checked', true );
    $('#text-stroke-options-wrap').css({
        'display': 'flex',
    });

    let strokeColor = activeObj.stroke;
    let strokeWidth = activeObj.strokeWidth;

    $('#strokeColorWrap').css({
        'background-color': strokeColor,
    });
    $('#strokeColorInput').val(strokeColor);
    $('#strokeWidthInput').val(strokeWidth);

  }

}

//Disable active objects
$(document).on('click', '.container-of-canvas', function (e) {
  var cavdis = $('.canvas-container');
  if (!cavdis.is(e.target) && cavdis.has(e.target).length === 0) {
      canvas.discardActiveObject().renderAll();
  }
});

//Zoom Canvas Functions
function zoomIn() {
  canvasScale = canvasScale * SCALE_FACTOR;
  canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
  canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
  var objects = canvas.getObjects();
  for (var i in objects) {
      var scaleX = objects[i].scaleX;
      var scaleY = objects[i].scaleY;
      var left = objects[i].left;
      var top = objects[i].top;
      var tempScaleX = scaleX * SCALE_FACTOR;
      var tempScaleY = scaleY * SCALE_FACTOR;
      var tempLeft = left * SCALE_FACTOR;
      var tempTop = top * SCALE_FACTOR;
      objects[i].scaleX = tempScaleX;
      objects[i].scaleY = tempScaleY;
      objects[i].left = tempLeft;
      objects[i].top = tempTop;
      objects[i].setCoords();
  }
  let bakImg = canvas.get('backgroundImage');
  if (bakImg != null){
      canvas.setBackgroundImage(bakImg, canvas.renderAll.bind(canvas), {
          backgroundImageOpacity: 0.5,
          backgroundImageStretch: false,
          scaleX: canvas.getWidth() / bakImg.width,
          scaleY: canvas.getHeight() / bakImg.height,
      });
  }
  canvas.renderAll();
}

function zoomOut() {
  canvasScale = canvasScale / SCALE_FACTOR;
  canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
  canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
  var objects = canvas.getObjects();
  for (var i in objects) {
      var scaleX = objects[i].scaleX;
      var scaleY = objects[i].scaleY;
      var left = objects[i].left;
      var top = objects[i].top;
      var tempScaleX = scaleX * (1 / SCALE_FACTOR);
      var tempScaleY = scaleY * (1 / SCALE_FACTOR);
      var tempLeft = left * (1 / SCALE_FACTOR);
      var tempTop = top * (1 / SCALE_FACTOR);
      objects[i].scaleX = tempScaleX;
      objects[i].scaleY = tempScaleY;
      objects[i].left = tempLeft;
      objects[i].top = tempTop;
      objects[i].setCoords();
  }
  let bakImg = canvas.get('backgroundImage');
  if (bakImg != null){
      canvas.setBackgroundImage(bakImg, canvas.renderAll.bind(canvas), {
          backgroundImageOpacity: 0.5,
          backgroundImageStretch: false,
          scaleX: canvas.getWidth() / bakImg.width,
          scaleY: canvas.getHeight() / bakImg.height,
      });
  }
  canvas.renderAll();
}

function getSizeOfCanvas() {
  let cW = canvas.getWidth().toFixed(0);
  let cH = canvas.getHeight().toFixed(0);
  $('#sizeOfCanvasView').text(cW + 'px | ' + cH +'px');
}

$(document).on('click', '#zoomIn', function () {
  zoomIn();
  getSizeOfCanvas();
});

$(document).on('click', '#zoomOut', function () {
  zoomOut();
  getSizeOfCanvas();
});

//Text Controls
//Font Size
$('#fontSizeInputRange').on('input', function() {
  let fontSz = $(this).val();
  $('#fontSizeLabel').val(fontSz);
  $('#fontSizeLabelView').text(fontSz);
  let obj = canvas.getActiveObject();
    obj.set({
        fontSize: fontSz,
    });
    canvas.renderAll();
});
$('#fontSizeLabel').on('input', function() {
  let fontSz = $(this).val();
  if(fontSz > 72){
    $(this).val(72);
    $('#fontSizeInputRange').val(72);
    let obj = canvas.getActiveObject();
    obj.set({
        fontSize: 72,
    });
    canvas.renderAll();
  } else if(fontSz < 0){
    $(this).val(6);
    $('#fontSizeInputRange').val(6);
    let obj = canvas.getActiveObject();
    obj.set({
        fontSize: 6,
    });
    canvas.renderAll();
  } else {
    $('#fontSizeInputRange').val(fontSz);
    let obj = canvas.getActiveObject();
    obj.set({
        fontSize: fontSz,
    });
    canvas.renderAll();
  }
  
});

//Font Colors
$('#fontColorInput').on('input', function () {
  let fontCor = $(this).val();
  $('#fontColorWrap').css({
      'background-color': fontCor,
  });
  let obj = canvas.getActiveObject();
  obj.set({
      fill: fontCor,
  });
  canvas.renderAll();
});

$('.set-text-color').click(function(){
  let color = $(this).attr('data-text-color');
  let obj = canvas.getActiveObject();
  obj.set({
      fill: color,
  });
  canvas.renderAll();
  $('#fontColorWrap').css({
    'background-color': color,
  });
  $('#fontColorInput').val(color);
});

//Shapes Colors
$('#shapesColorInput').on('input', function () {
  let shapeCor = $(this).val();
  $('#shapesColorWrap').css({
      'background-color': shapeCor,
  });

  let obj = canvas.getActiveObject();

  obj.set({
      fill: shapeCor,
  });
  canvas.renderAll();

	/*obj.paths.forEach(function(path) {path.fill = color});
  canvas.renderAll();*/
  
});

//Transparency Objects
$('#transparencyInputRange').on('input', function() {
  let tranValue = $(this).val();
  $('#transparencyLabel').val(tranValue);
  let obj = canvas.getActiveObject();
    obj.set({
        opacity: tranValue/100,
    });
    canvas.renderAll();
});
$('#transparencyLabel').on('input', function() {
  let tranValue = $(this).val();
  if(tranValue > 100){
    $(this).val(100);
    $('#transparencyInputRange').val(100);
  } else if(tranValue < 0){
    $(this).val(0);
    $('#transparencyInputRange').val(0);
  } else {
    $(this).val(tranValue);
    $('#transparencyInputRange').val(tranValue);
  }
  let obj = canvas.getActiveObject();
    obj.set({
        opacity: $(this).val()/100,
    });
    canvas.renderAll();
});

//Align to page
$('.alignment').click(function() {
  var cur_value = $(this).attr('data-action');
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (cur_value != '' && activeObj) {
    process_align(cur_value, activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  } else {
    alert('Please select a item');
    return false;
  }
});

/*Align the selected object*/
function process_align(val, activeObj) {
  switch (val) {

    case 'left':
      var left;
      if(activeObj.angle <= 90) {
        left = activeObj.aCoords.tl.x - activeObj.aCoords.bl.x;
      }
      if(activeObj.angle > 90 && activeObj.angle <= 180) {
        left = activeObj.aCoords.tl.x - activeObj.aCoords.br.x;
      }
      if(activeObj.angle > 180 && activeObj.angle <= 270) {
        left = activeObj.aCoords.tl.x - activeObj.aCoords.tr.x;
      }
      if(activeObj.angle > 270) {
        left = 0;
      }
      activeObj.set({
        left: left
      });
      break;
    case 'right':
      var left;
      if(activeObj.angle <= 90) {
        left = activeObj.aCoords.tl.x + (canvasWidth - activeObj.aCoords.tr.x);
      }
      if(activeObj.angle > 90 && activeObj.angle <= 180) {
        left = canvasWidth;
      }
      if(activeObj.angle > 180 && activeObj.angle <= 270) {
        left = activeObj.aCoords.tl.x + (canvasWidth - activeObj.aCoords.bl.x);
      }
      if(activeObj.angle > 270) {
        left = activeObj.aCoords.tl.x + (canvasWidth - activeObj.aCoords.br.x);
      }
      activeObj.set({
        left: left
      });
      break;
    case 'top':
      var top;
      if(activeObj.angle <= 90) {
        top = 0;
      }
      if(activeObj.angle > 90 && activeObj.angle <= 180) {
        top = activeObj.aCoords.tl.y - activeObj.aCoords.bl.y;
      }
      if(activeObj.angle > 180 && activeObj.angle <= 270) {
        top = activeObj.aCoords.tl.y - activeObj.aCoords.br.y;
      }
      if(activeObj.angle > 270) {
        top = activeObj.aCoords.tl.y - activeObj.aCoords.tr.y;
      }
      activeObj.set({
        top: top
      });
      break;
    case 'bottom':
      var top;
      if(activeObj.angle <= 90) {
        top = activeObj.aCoords.tl.y + (canvasHeight - activeObj.aCoords.br.y);
      }
      if(activeObj.angle > 90 && activeObj.angle <= 180) {
        top = activeObj.aCoords.tl.y + (canvasHeight - activeObj.aCoords.tr.y);
      }
      if(activeObj.angle > 180 && activeObj.angle <= 270) {
        top = canvasHeight;
      }
      if(activeObj.angle > 270) {
        top = activeObj.aCoords.tl.y + (canvasHeight - activeObj.aCoords.bl.y);
      }
      activeObj.set({
        top: top
      });
      break;
    case 'centerH':
      activeObj.viewportCenterH();
      break;
    case 'centerV':
      activeObj.viewportCenterV();
      break;
  }
}

//Functions of Right Menu
function deleteCanvas(){
  var activeObject = canvas.getActiveObjects();
  //if (confirm('Are you sure?')) {
    canvas.discardActiveObject();
    canvas.remove(...activeObject);
  //}
}
function bringForwardCanvas() {
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.bringForward(activeObject);
  }
}
function bringToFrontCanvas() {
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.bringToFront(activeObject);
  }
}
function sendBackwardsCanvas(){
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendBackwards(activeObject);
  }
}
function sendToBackCanvas(){
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendToBack(activeObject);
  }
}
function selectAll(){
  canvas.discardActiveObject();
  var sel = new fabric.ActiveSelection(canvas.getObjects(), {
    canvas: canvas,
  });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
}
function groupCanvas(){
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'activeSelection') {
    return;
  }
  canvas.getActiveObject().toGroup();
  canvas.requestRenderAll();
}
function ungroupCanvas() {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'group') {
    return;
  }
  canvas.getActiveObject().toActiveSelection();
  canvas.requestRenderAll();
}

//FlipXY
 $(function() {
      //flipX and flipY
      document.getElementById('flipY').addEventListener('click', function () {
        canvas.getActiveObject().toggle('flipY');
        canvas.renderAll();
      });
      document.getElementById('flipX').addEventListener('click', function () {
          canvas.getActiveObject().toggle('flipX');
          canvas.renderAll();
      });
 });

 //set json file as template

 /*$('.set-temp-image').click(function(){
    //var json_file = this.getAttribute('data-url-json');
    
    var json_file = '{"version":"4.5.1","objects":[{"type":"image","version":"4.5.1","originX":"left","originY":"top","left":125,"top":76,"width":300,"height":200,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.5,"scaleY":0.5,"angle":0,"flipX":false,"flipY":false,"opacity":0.5,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://app.dhad.me/static/img/images/logo.png","crossOrigin":"anonymous","filters":[]},{"type":"image","version":"4.5.1","originX":"left","originY":"top","left":125,"top":221,"width":300,"height":200,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.5,"scaleY":0.5,"angle":0,"flipX":false,"flipY":true,"opacity":0.15,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://app.dhad.me/static/img/images/logo.png","crossOrigin":"anonymous","filters":[]}],"background":{"type":"linear","coords":{"x1":100,"y1":100,"x2":400,"y2":400},"colorStops":[{"color":"rgba(201, 247, 245, 0.4)","offset":0},{"color":"#3699FF","offset":1}],"offsetX":0,"offsetY":0,"gradientUnits":"pixels","gradientTransform":null}}';
    canvas.loadFromJSON(
      json_file,
      canvas.renderAll.bind(canvas)
      );

  });*/


  $('.set-template').click(function(){

      canvas.clear();

      var json_file = this.getAttribute('data-url-template');

      $('#spinner-load-canvas').css({
          'display': 'block',
      });

      setTimeout(() => {

        var json = (function () {
          var json = null;
          $.ajax({
              'async': false,
              'global': false,
              'url': json_file,
              'dataType': "json",
              'success': function (data) {
                  json = data;
              }
          });
          return json;
        })();

        canvas.loadFromJSON(
          json,
          canvas.renderAll.bind(canvas)
          );

          $('#spinner-load-canvas').css({
              'display': 'none',
          });
        
      }, 1800);
      
  });

 //Add fonts name
$(document).on('click', '.font-family-btn', function () {
  let font = $('.font-family-btn');
  for(i = 0; i < font.length; i++){
      font[i].classList.remove('active');
  }
  $(this).addClass('active');
  let font_name = this.getAttribute('data-font-family');
  let fontsNameText = $(this).find('.font-title').text();
  $('#font-family-name-drop').text(fontsNameText);

  let obj = canvas.getActiveObject();
  obj.set({
      fontFamily: font_name,
  });  
  canvas.renderAll();
});

//Add Color Backgrounds to Canvas
$('#colorpicker').on('input', function() {
  hideRemoveBg();
  canvas.setBackgroundImage(null);
  $('#hexcolor').val(this.value);
  canvas.backgroundColor = this.value;
  canvas.renderAll();

  $("#colors-bg-wrapper").css({
      "background": this.value
  });
});
$('#hexcolor').on('input', function() {
  hideRemoveBg();
  canvas.setBackgroundImage(null);
  $('#colorpicker').val(this.value);
  canvas.backgroundColor = this.value;
  canvas.renderAll();
});
$('.set-bg-color').click(function(){
  hideRemoveBg();
  canvas.setBackgroundImage(null);
  let color = $(this).attr('data-bg-color');
  canvas.backgroundColor = color;
  canvas.renderAll();

  $('#colors-bg-wrapper').css({
    'background-color': color,
  });
  $('#colorpicker').val(color);
});
$('.set-bg-gradient-color').click(function(){
  hideRemoveBg();
  canvas.setBackgroundImage(null);
  let color = $(this).attr('data-bg-color');
  let gradient = $(this).attr('data-bg-gradient-color');
  var grad = new fabric.Gradient({
    type: 'linear',
    coords: {
        x1: 100,
        y1: 100,
        x2: canvas.width,
        y2: canvas.height,
    },
    colorStops: [
    {
        color: gradient,
        offset: 0,
    },
    {    
        color: color,
        offset: 1,
    }
    ]
  });
  canvas.setBackgroundColor(grad);
  canvas.renderAll();
});

//Set Background Image
function set_bg_img(el){
  let imageUrl = el.getAttribute('data-url-bg');
  canvas.setBackgroundColor(null);
  fabric.Image.fromURL(imageUrl, function (img) {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        backgroundImageOpacity: 0.5,
        backgroundImageStretch: false,
        scaleX: canvas.getWidth() / img.width,
        scaleY: canvas.getHeight() / img.height,
      });
  }, {crossOrigin: 'anonymous'});
}

$(document).on('click', '.set-bg-image', function (){
  set_bg_img(this);
  hideRemoveBg();
});

//Add background using file upload
document.getElementById('add_bg_from_pc').addEventListener('change', function (e) {
  canvas.setBackgroundImage(null);
  canvas.renderAll();
  canvas.setBackgroundColor('', canvas.renderAll.bind(canvas));
  canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
  var reader = new FileReader();
  reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img) {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              backgroundImageOpacity: 0.5,
              backgroundImageStretch: false,
              scaleX: canvas.getWidth() / img.width,
              scaleY: canvas.getHeight() / img.height,
          });
      });
  };
  reader.readAsDataURL(e.target.files[0]);
  canvas.renderAll();
});

//Remove background from file
$(document).on('click', '#remove_bg_from_pc', function () {
  canvas.setBackgroundImage(null);
  canvas.setBackgroundColor('#FFFFFF');
  canvas.renderAll();
});

function hideRemoveBg(){
  $('#add_bg_wrap').removeClass('image-input-changed');
  $('#view_bg_from_pc').css({
    'background-image': 'url(assets/media/bg/blank.png)'
  });
}

//Add a heading
$('#add-text-h-to-canvas-btn').click(function(){
  var text = 'اضف عنوانًا';
  var textSample = new fabric.Textbox(text, {
    fontSize: 38,
    left: getRandomInt(50, 50),
    top: getRandomInt(50, 50),
    fontFamily: 'Droid-kufi',
    angle: 0,
    fill: '#' + getRandomColor(),
    fontWeight: '900',
    textAlign: 'center',
    originX: 'left',
    width: 300,
    centerTransform: true
  });
  canvas.setActiveObject(textSample);
  canvas.add(textSample);
});

//Add a sub-heading
$('#add-text-p-to-canvas-btn').click(function(){
  var text = 'اضف عنوانًا فرعيًا';
  var textSample = new fabric.Textbox(text, {
    fontSize: 22,
    left: getRandomInt(50, 50),
    top: getRandomInt(110, 110),
    fontFamily: 'Droid-kufi',
    angle: 0,
    fill: '#' + getRandomColor(),
    fontWeight: '600',
    textAlign: 'center',
    originX: 'left',
    width: 300,
    centerTransform: true
  });
  canvas.setActiveObject(textSample);
  canvas.add(textSample);
});

//Add a text in page
$('#add-text-s-to-canvas-btn').click(function(){
  var text = 'اضف نصًّا في الصفحة';
  var textSample = new fabric.Textbox(text, {
    fontSize: 14,
    left: getRandomInt(50, 50),
    top: getRandomInt(170, 170),
    fontFamily: 'Droid-kufi',
    angle: 0,
    fill: '#000000',
    fontWeight: '400',
    textAlign: 'right',
    originX: 'left',
    width: 300,
    centerTransform: true
  });
  canvas.setActiveObject(textSample);
  canvas.add(textSample);
});

//insert and drawing text
$('.eq-btn-drawing').click(function(){
  canvas.isDrawingMode = !canvas.isDrawingMode;
  let eleText = $(this).find('.eq-cup-text').html().trim().replace(/\s+/g, " ");

  canvas.on('before:path:created', function(opt) {
    var path = opt.path;
    var pathInfo = fabric.util.getPathSegmentsInfo(path.path);
    path.segmentsInfo = pathInfo;
    var pathLength = pathInfo[pathInfo.length - 1].length;
    var text = eleText;
    var fontSize = 2.5 * pathLength / text.length;
    var text = new fabric.Text(text, { fontSize: fontSize, path: path, top: path.top, left: path.left });
    canvas.add(text);
  });
  
  canvas.on('path:created', function(opt) {
    canvas.remove(opt.path);
  })
  
});

//insert text
function insert_text(el){
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'textb') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });

  var bText = el.getAttribute('data-text');
  var bQuote = new fabric.Textbox(bText, {
      id: 'textb',
      fontSize: canvas.width/27,
      lineHeight: 1.6,
      fontFamily: 'Droid-kufi',
      angle: 0,
      fill: '#000000',
      fontWeight: '400',
      top: canvas.height/1.8,
      textAlign: 'center',
      direction: 'rtl',
      originX: 'left',
      width: canvas.width/1.2,
      centerTransform: true,
      editable: false,
  });
  canvas.setActiveObject(bQuote);
  canvas.add(bQuote);
  bQuote.viewportCenterH();
  canvas.renderAll();
}

$(document).on('click', '.eq-btn-text', function () {
  insert_text(this);
});

//insert wasaam
function insert_wasaam(el){
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'wasaam') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });
  
  var myImg = el.getAttribute('data-url');
  fabric.Image.fromURL(myImg, function (oImg) {
    canvas.add(oImg.set({
      id: 'wasaam',
      opacity: 0.8,
      top: 0,
      padding: 0,
      zIndex: -1,
      scaleX: canvas.getWidth() / oImg.width,
      scaleY: canvas.getHeight() / oImg.height,
      //selectable: false,
    }));
      canvas.renderAll();
      canvas.sendToBack(oImg);
  }, {crossOrigin: 'anonymous'});
}

$(document).on('click', '.insert-icon-ele', function (){
  insert_wasaam(this);
  hideRemoveWasaam();  
});

/*
function sendToBackCanvas(){
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendToBack(activeObject);
  }
}
*/

//insert wasaam from upload file
document.getElementById('add_wasaam_from_pc').onchange = function handleImage(e) {

  canvas.getObjects().forEach(function(o) {
    if(o.id === 'wasaam') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });

  var reader = new FileReader();
  reader.onload = function (event) {
      let imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
          let image = new fabric.Image(imgObj);
          image.set({
              id: 'wasaam',
              opacity: 0.5,
              top: 0,
              padding: 0,
              scaleX: canvas.getWidth() / imgObj.width,
              scaleY: canvas.getHeight() / imgObj.height,
              //selectable: false,
              zIndex: -1,
          });
          canvas.add(image);
      }
  }
  reader.readAsDataURL(e.target.files[0]);

}

//Remove wasaam from file
$(document).on('click', '#remove_wasaam_from_pc', function () {
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'wasaam') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });
  canvas.renderAll();
});

function hideRemoveWasaam(){
  $('#add_wasaam_wrap').removeClass('image-input-changed');
  $('#view_wasaam_from_pc').css({
    'background-image': 'url(assets/media/art/blank.png)'
  });
}

//insert Makhtotah
function insert_makhtotah(el){
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'makhtotah') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });
  
  var myImg = el.getAttribute('data-url');
  fabric.Image.fromURL(myImg, (oImg) => {
    canvas.add(oImg.set({
      id: 'makhtotah',
      top: canvas.height/6,
      padding: 0,
      zIndex: 2,
      scaleX: (canvas.getWidth() / oImg.width)/3,
      scaleY: (canvas.getWidth() / oImg.height)/3,
    }));
    canvas.setActiveObject(oImg);
    oImg.viewportCenterH();
    canvas.renderAll();
  }, {crossOrigin: 'anonymous'});
}

$(document).on('click', '.insert-image', function (){
  insert_makhtotah(this);
  hideRemoveMakhtotah()
});

//insert makhtotah from upload file
document.getElementById('add_makhtotah_from_pc').onchange = function handleImage(e) {

  canvas.getObjects().forEach(function(o) {
    if(o.id === 'makhtotah') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });

  var reader = new FileReader();
  reader.onload = function (event) {
      let imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
          let image = new fabric.Image(imgObj);
          image.set({
              id: 'makhtotah',
              top: 60,
          });
          canvas.setActiveObject(image);
          canvas.add(image);
          image.scaleToHeight(200)
          .scaleToWidth(200);
          image.viewportCenterH();
      }
  }
  reader.readAsDataURL(e.target.files[0]);

}

//Remove makhtotah from file
$(document).on('click', '#remove_makhtotah_from_pc', function () {
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'makhtotah') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });
  canvas.renderAll();
});

function hideRemoveMakhtotah(){
  $('#add_makhtotah_wrap').removeClass('image-input-changed');
  $('#view_makhtotah_from_pc').css({
    'background-image': 'url(assets/media/manuscript/blank.png)'
  });
}

// Load the SVG to the canvas when it gets clicked on
$('.insert-shape').on('click', 'svg', function () {
  var serializer = new XMLSerializer(),
      svgStr = serializer.serializeToString(this);
  fabric.loadSVGFromString(svgStr, function (objects, options) {
      options.id = this.id;
      var obj = fabric.util.groupSVGElements(objects, options);
      obj.set({
          fill: '#' + getRandomColor(),
      });
      canvas.add(obj);
      obj.scaleToHeight(100)
          .scaleToWidth(100);
      obj.viewportCenterV();
      obj.viewportCenterH();
      canvas.setActiveObject(obj).renderAll();
  });
});

//insert Name
function insert_name(){
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'nameb') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });
  
  var bText = document.getElementById('textName').value;
  var bQuote = new fabric.Textbox(bText, {
      id: 'nameb',
      fontSize: canvas.width/22,
      lineHeight: 1.8,
      fontFamily: 'Droid-kufi',
      angle: 0,
      fill: '#000000',
      fontWeight: '400',
      top: canvas.height/1.15,
      textAlign: 'center',
      direction: 'rtl',
      originX: 'left',
      width: canvas.width/1.2,
      centerTransform: true,
      editable: false,
  });
  canvas.setActiveObject(bQuote);
  canvas.add(bQuote);
  bQuote.viewportCenterH();
  canvas.renderAll();
}

$(document).on('click', '#add-name-btn', function () {
  insert_name();
});

//insert Memo
function insert_memo(){
  canvas.getObjects().forEach(function(o) {
    if(o.id === 'memo') {
        canvas.setActiveObject(o);
        var activeObject = canvas.getActiveObjects();
        canvas.discardActiveObject();
        canvas.remove(...activeObject);
    }
  });
  
  var bText = document.getElementById('memo').value;
  var bQuote = new fabric.Textbox(bText, {
      id: 'memo',
      fontSize: canvas.width/27,
      lineHeight: 1.6,
      fontFamily: 'Droid-kufi',
      angle: 0,
      fill: '#000000',
      fontWeight: '400',
      top: canvas.height/1.8,
      textAlign: 'center',
      direction: 'rtl',
      originX: 'left',
      width: canvas.width/1.2,
      centerTransform: true,
      editable: false,
  });
  canvas.setActiveObject(bQuote);
  canvas.add(bQuote);
  bQuote.viewportCenterH();
  canvas.renderAll();
}

$(document).on('click', '#add-memo-btn', function () {
  insert_memo();
});

//Download canvas as images
$(document).on('click', '#downdom2imgjpg', function () {
  canvas.discardActiveObject().renderAll();
  let x = Math.floor((Math.random() * 11111111111111)+1);
  $("#canvas-container").get(0).toBlob(function(blob) {
      saveAs(blob, "Dhad-cards-"+x+".jpg");
  });
});

//Download canvas as .json
const toJSON = async () => {
  const json = canvas.toDatalessJSON(["clipPath"]);
  const out = JSON.stringify(json, null, "\t");
  const blob = new Blob([out], { type: "text/plain" });
  const clipboardItemData = { [blob.type]: blob };
  try {
    navigator.clipboard &&
      (await navigator.clipboard.write([
        new ClipboardItem(clipboardItemData)
      ]));
  } catch (error) {
    console.log(error);
  }
  const blobURL = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobURL;
  a.download = "btaqaatJSON.json";
  a.click();
  URL.revokeObjectURL(blobURL);
};

//Canvas Sizes Controls.
//Canvas size squre
$(document).on('click', '#convert2sq', function () {
    let canvW = canvas.getWidth();
    canvas.setHeight(canvW);
    let canvH = canvas.getHeight();
    var objects = canvas.getObjects();
    for (var i in objects) {
        var top = objects[i].top;
        if(top >= canvH){
            objects[i].top = canvH/1.15;
        }
        objects[i].setCoords();
    }

    let bakImg = canvas.get('backgroundImage');
    if (bakImg != null){
        canvas.setBackgroundImage(bakImg, canvas.renderAll.bind(canvas), {
            backgroundImageOpacity: 0.5,
            backgroundImageStretch: false,
            scaleX: canvas.getWidth() / bakImg.width,
            scaleY: canvas.getHeight() / bakImg.height,
        });
    }

    canvas.renderAll();

    $(this).prop('disabled', true);
    $('#convert2tal').prop('disabled', false);

    $(this).css({
        'display': 'none',
    });
  
    $('#convert2tal').css({
        'display': 'block',
    });

    getSizeOfCanvas();

});

//Canvas size tall
$(document).on('click', '#convert2tal', function () {
  canvas.setHeight(canvas.getHeight() * 1.8);
  let bakImg = canvas.get('backgroundImage');
  if (bakImg != null){
      canvas.setBackgroundImage(bakImg, canvas.renderAll.bind(canvas), {
          backgroundImageOpacity: 0.5,
          backgroundImageStretch: false,
          scaleX: canvas.getWidth() / bakImg.width,
          scaleY: canvas.getHeight() / bakImg.height,
      });
  }

  canvas.renderAll();

  $(this).prop('disabled', true);
  $('#convert2sq').prop('disabled', false);

  $(this).css({
      'display': 'none',
  });

  $('#convert2sq').css({
      'display': 'block',
  });

  getSizeOfCanvas();

});

//Move Objects by keyboard
const STEP = 1;
var Direction = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3
};

fabric.util.addListener(document.body, 'keydown', function(options) {
  if (options.repeat) {
    return;
  }
  var key = options.which || options.keyCode; // key detection
  if (key === 37) { // handle Left key
    moveSelected(Direction.LEFT);
  } else if (key === 38) { // handle Up key
    moveSelected(Direction.UP);
  } else if (key === 39) { // handle Right key
    moveSelected(Direction.RIGHT);
  } else if (key === 40) { // handle Down key
    moveSelected(Direction.DOWN);
  }
});

function moveSelected(direction) {
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    switch (direction) {
      case Direction.LEFT:
        canvas.getActiveObject().left -= STEP;
        break;
      case Direction.UP:
        canvas.getActiveObject().top -= STEP;
        break;
      case Direction.RIGHT:
        canvas.getActiveObject().left += STEP;
        break;
      case Direction.DOWN:
        canvas.getActiveObject().top += STEP;
        break;
    }
    activeObject.setCoords();
    canvas.renderAll();
    //console.log('selected objects was moved');
  } else {
    toastr.warning("الرّجاء أختيار عنصر لتحريكه!");
  }

}

//Drawing Mode
(function() {
    var $ = function(id){return document.getElementById(id)};
    var drawingModeEl = $('drawing-mode'),
        drawingOptionsEl = $('drawing-mode-options'),
        drawingColorEl = $('drawing-color'),
        drawingShadowColorEl = $('drawing-shadow-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        drawingShadowWidth = $('drawing-shadow-width'),
        drawingShadowOffset = $('drawing-shadow-offset'),
        clearEl = $('clear-canvas');
  
    clearEl.onclick = function() { canvas.clear(); };

    drawingModeEl.onclick = function() {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      if (canvas.isDrawingMode) {
        drawingModeEl.innerHTML = 'إلغاء وضع الرسم';
        drawingOptionsEl.style.opacity = '1';
        drawingOptionsEl.style.pointerEvents = 'auto';
      }
      else {
        drawingModeEl.innerHTML = 'تفعيل وضع الرسم';
        drawingOptionsEl.style.opacity = '0.4';
        drawingOptionsEl.style.pointerEvents = 'none';
      }
    };
  
    if (fabric.PatternBrush) {
      var vLinePatternBrush = new fabric.PatternBrush(canvas);
      vLinePatternBrush.getPatternSrc = function() {
  
        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');
  
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();
  
        return patternCanvas;
      };
  
      var hLinePatternBrush = new fabric.PatternBrush(canvas);
      hLinePatternBrush.getPatternSrc = function() {
  
        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');
  
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();
  
        return patternCanvas;
      };
  
      var squarePatternBrush = new fabric.PatternBrush(canvas);
      squarePatternBrush.getPatternSrc = function() {
  
        var squareWidth = 10, squareDistance = 2;
  
        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        var ctx = patternCanvas.getContext('2d');
  
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);
  
        return patternCanvas;
      };
  
      var diamondPatternBrush = new fabric.PatternBrush(canvas);
      diamondPatternBrush.getPatternSrc = function() {
  
        var squareWidth = 10, squareDistance = 0;
        var patternCanvas = fabric.document.createElement('canvas');
        var rect = new fabric.Rect({
          width: squareWidth,
          height: squareWidth,
          angle: 45,
          fill: this.color
        });
  
        var canvasWidth = rect.getBoundingRect().width;
  
        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
  
        var ctx = patternCanvas.getContext('2d');
        rect.render(ctx);
  
        return patternCanvas;
      };
  
    }
  
    $('drawing-mode-selector').onchange = function() {
  
      if (this.value === 'hline') {
        canvas.freeDrawingBrush = vLinePatternBrush;
      }
      else if (this.value === 'vline') {
        canvas.freeDrawingBrush = hLinePatternBrush;
      }
      else if (this.value === 'square') {
        canvas.freeDrawingBrush = squarePatternBrush;
      }
      else if (this.value === 'diamond') {
        canvas.freeDrawingBrush = diamondPatternBrush;
      }
      else {
        canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
      }
  
      if (canvas.freeDrawingBrush) {
        var brush = canvas.freeDrawingBrush;
        brush.color = drawingColorEl.value;
        if (brush.getPatternSrc) {
          brush.source = brush.getPatternSrc.call(brush);
        }
        brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        brush.shadow = new fabric.Shadow({
          blur: parseInt(drawingShadowWidth.value, 10) || 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: true,
          color: drawingShadowColorEl.value,
        });
      }

    };
  
    drawingColorEl.oninput = function() {
      var brush = canvas.freeDrawingBrush;
      brush.color = this.value;
      if (brush.getPatternSrc) {
        brush.source = brush.getPatternSrc.call(brush);
      }
      document.getElementById('drawingLineCodeColor').innerHTML = this.value;
    };
    drawingShadowColorEl.oninput = function() {
      canvas.freeDrawingBrush.shadow.color = this.value;
      document.getElementById('drawingLineCodeShadow').innerHTML = this.value;
    };
    drawingLineWidthEl.oninput = function() {
      canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
      document.getElementById('drawingLineSize').innerHTML = this.value;
    };
    drawingShadowWidth.oninput = function() {
      canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
      document.getElementById('drawingShadowSize').innerHTML = this.value;
    };
    drawingShadowOffset.oninput = function() {
      canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
      canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
      document.getElementById('drawingShadowOffset').innerHTML = this.value;
    };
  
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingColorEl.value;
      //canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(drawingShadowWidth.value, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: drawingShadowColorEl.value,
      });
    }

    //Images Control
    fabric.Object.prototype.transparentCorners = false;
    var $ = function(id){return document.getElementById(id)};
    var angleControl = $('angle-control');
    angleControl.oninput = function() {
      var activeObject = canvas.getActiveObject();
      activeObject.set('angle', parseInt(this.value, 10)).setCoords();
      canvas.requestRenderAll();
    };

    var skewXControl = $('skewX-control');
    skewXControl.oninput = function() {
      var activeObject = canvas.getActiveObject();
      activeObject.set('skewX', parseInt(this.value, 10)).setCoords();
      canvas.requestRenderAll();
    };

    var skewYControl = $('skewY-control');
    skewYControl.oninput = function() {
      var activeObject = canvas.getActiveObject();
      activeObject.set('skewY', parseInt(this.value, 10)).setCoords();
      canvas.requestRenderAll();
    };

    function updateControls() {
      var activeObject = canvas.getActiveObject();
      angleControl.value = activeObject.angle;
      skewXControl.value = activeObject.skewX;
      skewYControl.value = activeObject.skewY;
    }
    canvas.on({
      'object:rotating': updateControls,
      'object:skewing': updateControls
    });

  })();