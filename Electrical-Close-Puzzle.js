jQuery( document ).ready(function() {
  var rect = '';
  jQuery(".electrical-close-puzzle img").attr("style", "z-index:-1");
  jQuery( ".electrical-close-puzzle .av-image-hotspot_inner" ).each(function( index ) {
    var text_num = jQuery(this).text();
    if(text_num > 2 && text_num != 7 && text_num != 8 && text_num != 13 && text_num != 14 && text_num != 19 && text_num != 20 && text_num != 25 && text_num != 26 && text_num != 31 && text_num != 32 && text_num != 37 && text_num != 38){
      var position = jQuery(this).closest(".av-image-hotspot").position();
      jQuery(this).closest(".av-image-hotspot").addClass("drag_drop_"+text_num);
      position.left = parseInt(position.left);
      position.top = parseInt(position.top);

      rect = rect + '<rect x="'+position.left+'" y="'+position.top+'" data-new_x="'+position.left+'" data-new_y="'+position.top+'" width="20" height="10" class="drag drag-'+text_num+' drag_drop_'+text_num+'" data-svg-origin="'+position.left+' '+position.top+'" style="transform-origin: 0px 0px; touch-action: none; cursor: grab; user-select: none;"></rect>  <line x1="'+position.left+'" y1="'+position.top+'" x2="'+position.left+'" y2="'+position.top+'" class="line line-back line-'+text_num+'"></line>  <line x1="'+position.left+'" y1="'+position.top+'" x2="'+position.left+'" y2="'+position.top+'" class="line line-'+text_num+'"></line>';
    } else {
      if(text_num > 2) {
        var position = jQuery(this).closest(".av-image-hotspot").position();
        jQuery(this).closest(".av-image-hotspot").addClass("drag_drop_"+text_num);
        position.left = parseInt(position.left);
        position.top = parseInt(position.top);

        jQuery(this).closest(".av-image-hotspot").attr("data_x_vale", position.left);
        jQuery(this).closest(".av-image-hotspot").attr("data_y_vale", position.top);
      }
    }
  });
  var main_width = jQuery(".av-hotspot-container-inner-cell").width();
  var main_height = jQuery(".av-hotspot-container-inner-cell").height();
  jQuery( ".electrical-close-puzzle .av-hotspot-container-inner-wrap" ).prepend('<svg width="'+main_width+'" height="'+main_height+'" viewBox="0 0 '+main_width+' '+main_height+'" style="touch-action: none;position: absolute;">'+rect+'</svg>');


  var completedLights = [];
  var target_x_one = [];
  var target_y_one = [];
  var target_x_two = [];
  var target_y_two = [];
  jQuery( ".electrical-close-puzzle .av-image-hotspot_inner" ).each(function( index ) {
    var text_num = jQuery(this).text();
    if(text_num > 2 && text_num != 7 && text_num != 8 && text_num != 13 && text_num != 14 && text_num != 19 && text_num != 20 && text_num != 25 && text_num != 26 && text_num != 31 && text_num != 32 && text_num != 37 && text_num != 38){
      var new_x = jQuery(".drag_drop_"+text_num).attr("data-new_x");
      var new_y = jQuery(".drag_drop_"+text_num).attr("data-new_y");
      new_x = parseInt(new_x);
      new_y = parseInt(new_y);
      var target_x = 0;
      var target_y = 0;
      var target_class = 0;
      if(text_num == '3' || text_num == '4' || text_num == '5' || text_num == '6') { var target_class_one = 7; var target_class_two = 8; }
      if(text_num == '9' || text_num == '10' || text_num == '11' || text_num == '12') { var target_class_one = 13; var target_class_two = 14; }
      if(text_num == '15' || text_num == '16' || text_num == '17' || text_num == '18') { var target_class_one = 19; var target_class_two = 20; }
      if(text_num == '21' || text_num == '22' || text_num == '23' || text_num == '24') { var target_class_one = 25; var target_class_two = 26; }
      if(text_num == '27' || text_num == '28' || text_num == '29' || text_num == '30') { var target_class_one = 31; var target_class_two = 32; }
      if(text_num == '33' || text_num == '34' || text_num == '35' || text_num == '36') { var target_class_one = 37; var target_class_two = 38; }

      if(text_num == '3') { var target_class = 7; }
      if(text_num == '5') { var target_class = 8; }
      if(text_num == '9') { var target_class = 13; }
      if(text_num == '12') { var target_class = 14; }
      if(text_num == '17') { var target_class = 20; }
      if(text_num == '18') { var target_class = 19; }
      if(text_num == '22') { var target_class = 25; }
      if(text_num == '24') { var target_class = 26; }
      if(text_num == '27') { var target_class = 31; }
      if(text_num == '29') { var target_class = 32; }
      if(text_num == '33') { var target_class = 37; }
      if(text_num == '34') { var target_class = 38; }
      if(target_class != '0') {
        target_x = parseInt(jQuery('.drag_drop_'+target_class).attr("data_x_vale") - new_x);
        target_y = parseInt(jQuery('.drag_drop_'+target_class).attr("data_y_vale") - new_y);
      }
      if(target_class_one != '0') {
        target_x_one[text_num] = parseInt(jQuery('.drag_drop_'+target_class_one).attr("data_x_vale") - new_x);
        target_y_one[text_num] = parseInt(jQuery('.drag_drop_'+target_class_one).attr("data_y_vale") - new_y);
        target_x_two[text_num] = parseInt(jQuery('.drag_drop_'+target_class_two).attr("data_x_vale") - new_x);
        target_y_two[text_num] = parseInt(jQuery('.drag_drop_'+target_class_two).attr("data_y_vale") - new_y);
      }

      new Draggable('.drag_drop_'+text_num, {
        onDrag: function () {
          updateLine('.line-'+text_num, this.x + new_x, this.y + new_y);
        },
        onRelease: function () {
          if(text_num != 1 && text_num != 2) {
            if (this.x == target_x_one[text_num] && this.y == target_y_one[text_num] ) {
              var insert_array_value = jQuery('.drag_drop_'+target_class_one).attr("data_x_vale")+'='+jQuery('.drag_drop_'+target_class_one).attr("data_y_vale");
              if(jQuery.inArray(insert_array_value, completedLights) !== -1) {
                reset('.drag_drop_'+text_num, '.line-'+text_num, new_x, new_y);
              } else {
                completedLights[text_num] = insert_array_value;
              }
            } else if (this.x == target_x_two[text_num] && this.y == target_y_two[text_num] ) {
              var insert_array_value = jQuery('.drag_drop_'+target_class_two).attr("data_x_vale")+'='+jQuery('.drag_drop_'+target_class_two).attr("data_y_vale");
              if(jQuery.inArray(insert_array_value, completedLights) !== -1) {
                reset('.drag_drop_'+text_num, '.line-'+text_num, new_x, new_y);
              } else {
                completedLights[text_num] = insert_array_value;
              }
            } else {
              reset('.drag_drop_'+text_num, '.line-'+text_num, new_x, new_y);
            }
          } else {
            reset('.drag_drop_'+text_num, '.line-'+text_num, new_x, new_y);
          }
          if(check_final(completedLights)) {
            console.log("redirect_url");
          }
        },
        liveSnap: {points: [{x: target_x_one[text_num], y: target_y_one[text_num]}, {x: target_x_two[text_num], y: target_y_two[text_num]}],radius: 20},
      });
      jQuery(this).closest(".av-image-hotspot").remove();
    }
  });


  function check_final(array) {
    var return_array = [];
    jQuery( array ).each(function( index, value ) {
      if(value != undefined && value != '') {
        if(index == '3') { var target_class = 7; }
        if(index == '5') { var target_class = 8; }
        if(index == '9') { var target_class = 13; }
        if(index == '12') { var target_class = 14; }
        if(index == '17') { var target_class = 20; }
        if(index == '18') { var target_class = 19; }
        if(index == '22') { var target_class = 25; }
        if(index == '24') { var target_class = 26; }
        if(index == '27') { var target_class = 31; }
        if(index == '29') { var target_class = 32; }
        if(index == '33') { var target_class = 37; }
        if(index == '34') { var target_class = 38; }

        if(target_class != '0') {
          target_x = parseInt(jQuery('.drag_drop_'+target_class).attr("data_x_vale"));
          target_y = parseInt(jQuery('.drag_drop_'+target_class).attr("data_y_vale"));
        }
        if(value == target_x+'='+target_y) {
          return_array.push(index+'__');
        }
      }
    });
    if(return_array.indexOf('3__') !== -1 && return_array.indexOf('5__') !== -1 && return_array.indexOf('9__') !== -1 && return_array.indexOf('12__') !== -1 && return_array.indexOf('17__') !== -1 && return_array.indexOf('18__') !== -1 && return_array.indexOf('22__') !== -1 && return_array.indexOf('24__') !== -1 && return_array.indexOf('27__') !== -1 && return_array.indexOf('29__') !== -1 && return_array.indexOf('33__') !== -1 && return_array.indexOf('34__') !== -1) {
      return true;
    }
    return false;
  }
  function updateLine(selector, x, y) {
    gsap.set(selector, {
      attr: {
        x2: x,
        y2: y
      }
    });
  }

  function reset(drag, line, x, y) {
    gsap.to(drag, {
      duration: 0.3,
      ease: 'power2.out',
      x: 0,
      y: 0
    });
    gsap.to(line, {
      duration: 0.3,
      ease: 'power2.out',
      attr: {
        x2: x,
        y2: y
      }
    });
  }


});
