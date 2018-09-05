(function(jQuery, undefined) {

// Plugin name
var plugin = "parallax";

// VAR

var options = {
        mouseport:      'body',    // jQuery object or selector - DOM Element to use as mouse detector
        xparallax:      true,      // boolean | 0-1 | 'npx' | 'n%' - Sets axis of reaction and by how much they react
        yparallax:      true,      //
        xorigin:        0.5,       // 0-1 - Sets default alignment. Only has effect when parallax values are something other than 1 (or true, or '100%')
        yorigin:        0.5,       //
        decay:          0.66,      // 0-1 (0 instant, 1 forever) - Sets rate of decay curve for catching up with target mouse position
        frameDuration:  30,        // Int (milliseconds)
        freezeClass:    'freeze'   // String - Class added to layer when frozen
    },
    value = {
        left: 0,
        top: 0,
        middle: 0.5,
        center: 0.5,
        right: 1,
        bottom: 1
    },
    regex = {
        px:         /^\d+\s?px$/,
        percent:    /^\d+\s?%$/
    },
    frameEvent = 'frame.'+plugin,
    abs = Math.abs,
    pointer = [0, 0];

// FUNCTIONS

function parseValue(value) { return this.lib[value]; }
parseValue.lib = value;

// Converts numbers or numbers in strings to boolean
function parseBool(x) {
    return typeof x === "boolean" ? x : !!( parseFloat(x) ) ;
}

// CONSTRUCTORS

function Mouse(options, pointer){
    
    // Convert parallax options to boolean values
    var parallax = [ parseBool(options.xparallax), parseBool(options.yparallax) ];
    
    this.ontarget = false;
    this.decay = options.decay;
    this.pointer = pointer || [0.5, 0.5];
    this.update = function(pointer, threshold){
        
        // Pointer is already on target
        if (this.ontarget) {
            this.pointer = pointer;
        }
        
        // Pointer has arrived within the target thresholds
        else if ( (!parallax[0] || abs(pointer[0] - this.pointer[0]) < threshold[0]) &&
                  (!parallax[1] || abs(pointer[1] - this.pointer[1]) < threshold[1]) ) {
        
            this.ontarget = true;
            this.pointer = pointer;
        }
        
        // Pointer is nowhere near the target
        else {
            var lagPointer = [],
                x = 2;
            
            while (x--) {
                if ( parallax[x] ) {
                    lagPointer[x] = pointer[x] + this.decay * (this.pointer[x] - pointer[x]) ;
                }
            }
            this.pointer = lagPointer;
        }
    };
}

function Port(object, options){
    var self = this,
        elem = object instanceof jQuery ? object : jQuery(object) ,
        // Convert parallax options to boolean values
        parallax = [parseBool(options.xparallax), parseBool(options.yparallax)],
        // State of mouse position (0 - outside, 1 - inside, 2 - just gone outside)
        inside = 0,
        // Stores mouse position on mouseleave event
        leaveCoords;
    
    this.pointer = [0, 0];
    this.active = false;
    this.activeOutside = (options && options.activeOutside) || false;
    this.update = function(coords){
        var pos = this.pos,
            size = this.size,
            pointer = [],
            x = 2;
        
        // Is mouse inside port?
        // Yes.
        if ( inside > 0 ) {
            // But it just went outside, so make this the last move
            // Use leaveCoords stored by mouseleave event
            if ( inside === 2 ) {
                inside = 0;
                if (leaveCoords) {
                    coords = leaveCoords
                };
            }
            
            while (x--) {
                if ( parallax[x] ) {
                    pointer[x] = (coords[x] - pos[x]) / size[x] ;
                    pointer[x] = pointer[x] < 0 ? 0 : pointer[x] > 1 ? 1 : pointer[x] ;
                }
            }
            
            this.active = true;
            this.pointer = pointer;
        }
        // No.
        else {
            this.active = false;
        }
    };
    this.updateSize = function(){
        var width = elem.width(),
            height = elem.height();
        
        self.size = [width, height];
        self.threshold = [ 1/width, 1/height ];
    };
    this.updatePos = function(){
        var offset = elem.offset() || {left: 0, top: 0},
            left = parseInt(elem.css('borderLeftWidth')) + parseInt(elem.css('paddingLeft')),
            top = parseInt(elem.css('borderTopWidth')) + parseInt(elem.css('paddingTop'));
        
        self.pos = [offset.left + left, offset.top + top];
    };
    
    // Update mouseport dimensions on window resize
    jQuery(window)
    .bind('resize', self.updateSize)
    .bind('resize', self.updatePos);
    
    // Detect entry and exit of mouse
    elem
    .bind('mouseenter', function(e){
        inside = 1;
    })
    .bind('mouseleave', function(e){
        inside = 2;
        leaveCoords = [e.pageX, e.pageY];
    });
    
    // Set up layer
    this.updateSize();
    this.updatePos();
}

function Layer(elem, options){
    var px = [],
        parallax = [],
        offset = [],
        position = [];

    this.update = function(pointer){
        var pos = [],
            cssPosition,
            cssMargin,
            x = 2,
            css = {};
        
        while (x--) {
            if ( parallax[x] ) {
                pos[x] = parallax[x] * pointer[x] + offset[x];
                
                // We're working in pixels
                if ( px[x] ) {
                    cssPosition = position[x];
                    cssMargin = pos[x] * -1;
                }
                // We're working by ratio
                else {
                    cssPosition = pos[x] * 100 + '%';
                    cssMargin = pos[x] * this.size[x] * -1;
                }
                
                // Fill in css object
                if ( x === 0 ) {
                    css.left = cssPosition;
                    css.marginLeft = cssMargin;
                }
                else {
                    css.top = cssPosition;
                    css.marginTop = cssMargin;
                }
            }
        }
        
        // Set css
        elem.css(css);
    };

    this.setParallax = function(xp, yp, xo, yo){
        var p = [ xp || options.xparallax, yp || options.yparallax ],
            origin = [ xo || options.xorigin, yo || options.yorigin ],
            i = 2,
            css = {};
        
        while (i--) {
            // Set px flag
            px[i] = regex.px.test(p[i]);
            
            // Convert origin to numbers
            if (typeof origin[i] === 'string') {
                origin[i] = regex.percent.test(origin[i]) ?
                    parseFloat(origin[i])/100 :
                    value[ origin[i] ] || 1 ;
            }
            
            // We're dealing with pixel dimensions
            if ( px[i] ) {
                // Set parallax
                parallax[i] = parseInt(p[i]);
                
                // Set offset
                offset[i] = origin[i] * ( this.size[i] - parallax[i] );
                
                // Set css position constant
                position[i] = origin[i] * 100 + '%';
            }
            
            // We're dealing with ratios
            else {
                // Set parallax, converting to ratio where necessary
                parallax[i] =
                    p[i] === true ? 1 :
                    regex.percent.test(p[i]) ? parseFloat(p[i])/100 :
                    p[i] ;
                
                // Set offset
                offset[i] = parallax[i] ? origin[i] * ( 1 - parallax[i] ) : 0 ;
            }
        }
    };

    this.getPointer = function(){
        var viewport = elem.offsetParent(),
            pos = elem.position(),
            position = [],
            pointer = [],
            i = 2;
            
        // Reverse-engineer ratio from layer's current position
        while (i--) {
            if ( px[i] ) {
                // TODO: reverse calculation for pixel case
                position[i] = 0;
            }
            else {
                position[i] = pos[ i === 0 ? 'left' : 'top' ] / (viewport[ i === 0 ? 'outerWidth' : 'outerHeight' ]() - this.size[i]) ;
            }
            
            pointer[i] = (position[i] - offset[i]) / parallax[i] ;
        }
        
        return pointer;
    };

    this.setSize = function(x, y){
        this.size = [ x || elem.outerWidth(), y || elem.outerHeight() ];
    };
    
    this.setSize(options.width, options.height);
    this.setParallax(options.xparallax, options.yparallax, options.xorigin, options.yorigin);
}

// EVENT HANDLERS

function update(e){
    
    var elem = jQuery(this),
        global = e.data,
        local = elem.data(plugin),
        port = global.port,
        mouse = global.mouse,
        localmouse = local.mouse,
        process = global.timeStamp !== e.timeStamp;
    
    // Global objects have yet to be processed for this frame
    if ( process ) {
        // Set timeStamp to current time
        global.timeStamp = e.timeStamp;
    
        // Process mouseport
        port.update(pointer);
        
        // Process mouse
        if ( port.active || !mouse.ontarget ) {
            mouse.update(port.pointer, port.threshold);
        }
    }
    
    // Layer has it's own mouse
    if ( localmouse ) {
    
        // Process mouse
        localmouse.update( local.freeze ? local.freeze.pointer : port.pointer, port.threshold );
    
        // If it hits target
        if ( localmouse.ontarget ) {
            
            delete local.mouse;
    
            // Stop animating frozen layers
            if (local.freeze) {
                elem
                .unbind(frameEvent)
                .addClass(global.freezeClass);
            }
        }
        
        // Use localmouse in place of mouse
        mouse = localmouse;
    }
    // Layer is responding to global mouse
    else {
        // When no longer active, unbind
        if ( mouse.ontarget && !port.active ) {
            elem.unbind(frameEvent);
        }
    }
    
    local.layer.update(mouse.pointer);
}

// PLUG DEFINITION

jQuery.fn[plugin] = function(o){
    var global = jQuery.extend({}, jQuery.fn[plugin].options, o),
        args = arguments,
        layers = this;
    
    //console.log(global.mouseport);
    
    // Turn mouseport into jQuery obj
    if ( !(global.mouseport instanceof jQuery) ) {
        global.mouseport = jQuery(global.mouseport); 
    }
    
    //console.log(global.mouseport);
    
    global.port = new Port(global.mouseport, global);
    global.mouse = new Mouse(global);
    
    global.mouseport
    .bind("mouseenter", function(e){
        global.mouse.ontarget = false;
        
        // Animate unfrozen layers
        layers
        .each(function(i){
            var layer = jQuery(this);
            
            if ( !layer.data(plugin).freeze ) {
                layer
                .bind(frameEvent, global, update);
            }
        });
    });
    
    return layers
    .bind("freeze", function(e){
        var elem = jQuery(this),
            local = elem.data(plugin),
            mouse = local.mouse || local.freeze || global.mouse,
            x = regex.percent.exec(e.x) ? parseFloat(e.x.replace(/%$/, ''))/100 : (e.x || mouse.pointer[0]) ,
            y = regex.percent.exec(e.y) ? parseFloat(e.y.replace(/%$/, ''))/100 : (e.y || mouse.pointer[1]) ,
            decay = e.decay;
        
        // Store position
        local.freeze = {
            pointer: [x, y]
        };
        
        // Create local mouse, passing in current pointer with options
        local.mouse = new Mouse(global, mouse.pointer);
        
        if (decay !== undefined) {
            local.mouse.decay = decay
        };
        
        // Start animating
        elem
        .bind(frameEvent, global, update);
    })
    .bind("unfreeze", function(e){
        var elem = jQuery(this),
            local = elem.data(plugin),
            decay = e.decay,
            pointer;
        
        if (local.freeze) {
            
            // Create local mouse, passing local freeze pointer with options
            pointer = local.mouse ? local.mouse.pointer : local.freeze.pointer ;
            local.mouse = new Mouse(global);
            local.mouse.pointer = pointer;
            
            // Override decay with decay passed as e.decay
            if (decay !== undefined) local.mouse.decay = decay;
            
            // Destroy local.freeze
            delete local.freeze;
            
            // Remove freeze class and start animating
            elem
            .removeClass(options.freezeClass)
            .bind(frameEvent, global, update);
        }
    })
    .each(function(i){
        var elem = jQuery(this),
            
            // Construct layer options from extra arguments
            layerOptions = args[i+1] ? jQuery.extend({}, global, args[i+1]) : global ,
            layer = new Layer(elem, layerOptions);
        
        // Set up layer data. Give it a local mouse 
        // initialises it to start smoothly from current position
        elem.data(plugin, {
            layer: layer,
            mouse: new Mouse(layerOptions, layer.getPointer())
        });
    });
};

// EXPOSE

jQuery.fn[plugin].options = options;

// RUN

jQuery(document).ready(function(){
    // Pick up and store mouse position on jQuery(document)
    // IE does not register mousemove on jQuery(window)
    jQuery(document)
    .mousemove(function(e){
        pointer = [e.pageX, e.pageY];
    });
});

}(jQuery));