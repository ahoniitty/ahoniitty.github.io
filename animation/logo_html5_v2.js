(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"logo_html5_v2_atlas_1", frames: [[1242,1668,120,183],[1096,1668,144,221],[1096,1406,239,260],[951,1406,143,441],[1379,939,239,413],[1379,1354,156,419],[1537,1354,156,419],[1388,421,90,220],[0,1406,791,348],[793,1406,156,419],[1388,0,90,419],[0,939,1377,465],[0,0,1386,937]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_35 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.IMG_0071 = function() {
	this.initialize(img.IMG_0071);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4352,3098);


(lib.CachedBmp_28 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.prinssastrologo = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["logo_html5_v2_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(-30.3,-55.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.3,-55.2,60,91.5);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(-36.05,-55.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36,-55.2,72,110.5);


(lib.raketti = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(380.7,56.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_32();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_31();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.raketti, new cjs.Rectangle(0,0,693,468.5), null);


(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.IMG_0071();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg, new cjs.Rectangle(0,0,4352,3098), null);


(lib.hantacopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween2("synched",0);
	this.instance.setTransform(57.75,151.4);

	this.instance_1 = new lib.CachedBmp_30();
	this.instance_1.setTransform(19.6,-3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hantacopy, new cjs.Rectangle(19.6,-3,71.5,220.5), null);


(lib.hanta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween2("synched",0);
	this.instance.setTransform(57.75,151.4);

	this.instance_1 = new lib.CachedBmp_29();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hanta, new cjs.Rectangle(0,0,119.5,206.5), null);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.hanta();
	this.instance.setTransform(0.05,0,1,1,0,0,0,59.9,103.3);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(-8.2,-39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.8,-103.3,119.5,206.5);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.hanta();
	this.instance.setTransform(0.05,0,1,1,0,0,0,59.9,103.3);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(-8.2,-39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.8,-103.3,119.5,206.5);


(lib.hantaliike = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.raketti();
	this.instance.setTransform(110.8,99.9,0.2656,0.2656,-150.0011,0,0,346.4,234.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30));

	// Layer_2
	this.instance_1 = new lib.hantacopy();
	this.instance_1.setTransform(256.1,137.55,1,1,-81.7322,0,0,55.4,107.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:231.1},9).to({x:255.1},10).to({x:256.1},10).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0.1,370.2,199.70000000000002);


// stage content:
(lib.logo_HTML5Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(198));

	// raketti
	this.instance = new lib.raketti();
	this.instance.setTransform(536.85,572.1,0.4172,0.4065,-66.2281,0,0,346.4,234.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:198.3},24).wait(5).to({y:205.9},0).wait(2).to({y:194.45},0).to({y:198.3},6).wait(10).to({y:-270.9},24).to({_off:true},1).wait(126));

	// lisäliekki
	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(490.6,260.3,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2();
	this.instance_2.setTransform(490.6,260.3,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_3();
	this.instance_3.setTransform(465.4,260.3,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_28();
	this.instance_4.setTransform(465.4,260.3,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_27();
	this.instance_5.setTransform(465.4,240.75,0.5,0.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},29).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_4,p:{y:260.3}}]},7).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_4,p:{y:-208.85}}]},1).to({state:[]},1).wait(126));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(48).to({_off:false},0).wait(1).to({y:221.2},0).wait(1).to({y:201.65},0).wait(1).to({y:182.1},0).wait(1).to({y:162.55},0).wait(1).to({y:143},0).wait(1).to({y:123.45},0).wait(1).to({y:103.9},0).wait(1).to({y:84.35},0).wait(1).to({y:64.8},0).wait(1).to({y:45.25},0).wait(1).to({y:25.7},0).wait(1).to({y:6.15},0).wait(1).to({y:-13.35},0).wait(1).to({y:-32.9},0).wait(1).to({y:-52.45},0).wait(1).to({y:-72},0).wait(1).to({y:-91.55},0).wait(1).to({y:-111.1},0).wait(1).to({y:-130.65},0).wait(1).to({y:-150.2},0).wait(1).to({y:-169.75},0).wait(1).to({y:-189.3},0).to({_off:true},1).wait(127));

	// liekki
	this.instance_6 = new lib.Tween1("synched",0);
	this.instance_6.setTransform(509.35,422.6);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween4("synched",0);
	this.instance_7.setTransform(517.55,440);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween5("synched",0);
	this.instance_8.setTransform(517.55,440);
	this.instance_8._off = true;

	this.instance_9 = new lib.hanta();
	this.instance_9.setTransform(511.5,352.9,1,1,0,0,0,59.9,103.3);
	this.instance_9._off = true;

	this.instance_10 = new lib.hantacopy();
	this.instance_10.setTransform(502.3,151.35,1,1,0,0,0,55.4,107.3);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(16).to({_off:false},0).to({_off:true,x:517.55,y:440},2).wait(180));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(16).to({_off:false},2).to({_off:true},1).wait(179));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(18).to({_off:false},1).to({_off:true,regX:59.9,regY:103.3,x:511.5,y:352.9,mode:"independent"},5).wait(174));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(19).to({_off:false},5).wait(10).to({y:364.35},0).wait(13).to({y:327.45},0).to({_off:true,regX:55.4,regY:107.3,x:502.3,y:151.35},10).to({_off:false,regX:59.9,regY:103.3,x:511.5,y:-141.75},14).to({_off:true},1).wait(126));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(47).to({_off:false},10).to({_off:true,regX:59.9,regY:103.3,x:511.5,y:-141.75},14).wait(127));

	// vasoikeeraketti
	this.instance_11 = new lib.hantaliike();
	this.instance_11.setTransform(1180.4,196.05,1,1,0,0,0,185.2,99.9);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(75).to({_off:false},0).to({x:-199.95,y:182.6},49).wait(74));

	// maski (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_94 = new cjs.Graphics().p("Egdfgj8MDUKAAAMAAABH5MjUKAAAg");
	var mask_graphics_95 = new cjs.Graphics().p("Egjdgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_96 = new cjs.Graphics().p("Egpbgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_97 = new cjs.Graphics().p("EgvZgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_98 = new cjs.Graphics().p("Eg1Xgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_99 = new cjs.Graphics().p("Eg7Vgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_100 = new cjs.Graphics().p("EhBTgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_101 = new cjs.Graphics().p("EhBTgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_102 = new cjs.Graphics().p("EhBTgj7MDUKAAAMAAABH3MjUKAAAg");
	var mask_graphics_103 = new cjs.Graphics().p("EhHRgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_104 = new cjs.Graphics().p("EhNPgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_105 = new cjs.Graphics().p("EhNPgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_106 = new cjs.Graphics().p("EhNPgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_107 = new cjs.Graphics().p("EhNPgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_108 = new cjs.Graphics().p("EhTNgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_109 = new cjs.Graphics().p("EhTNgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_110 = new cjs.Graphics().p("EhZLgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_111 = new cjs.Graphics().p("EhfJgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_112 = new cjs.Graphics().p("EhlHgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_113 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_114 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_115 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_116 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_117 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_118 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_119 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_120 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_121 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_122 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_123 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_124 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_125 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_126 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_127 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_128 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_129 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_130 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_131 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_132 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_133 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_134 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_135 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_136 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_137 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_138 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_139 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_140 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_141 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_142 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_143 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_144 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_145 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_146 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_147 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_148 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_149 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_150 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_151 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_152 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_153 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_154 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_155 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_156 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_157 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_158 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_159 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_160 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_161 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_162 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_163 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_164 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_165 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_166 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_167 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_168 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_169 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_170 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_171 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_172 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_173 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_174 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_175 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_176 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_177 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_178 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_179 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_180 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_181 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_182 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_183 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_184 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_185 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_186 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_187 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_188 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_189 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_190 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_191 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_192 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_193 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_194 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_195 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_196 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");
	var mask_graphics_197 = new cjs.Graphics().p("EhqEgj7MDUJAAAMAAABH3MjUJAAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(94).to({graphics:mask_graphics_94,x:1169.1457,y:182.6215}).wait(1).to({graphics:mask_graphics_95,x:1130.9125,y:182.6479}).wait(1).to({graphics:mask_graphics_96,x:1092.6875,y:182.6479}).wait(1).to({graphics:mask_graphics_97,x:1054.4875,y:182.6479}).wait(1).to({graphics:mask_graphics_98,x:1016.2875,y:182.6479}).wait(1).to({graphics:mask_graphics_99,x:978.0625,y:182.6479}).wait(1).to({graphics:mask_graphics_100,x:939.8625,y:182.6479}).wait(1).to({graphics:mask_graphics_101,x:939.8625,y:182.6479}).wait(1).to({graphics:mask_graphics_102,x:939.8625,y:182.6479}).wait(1).to({graphics:mask_graphics_103,x:901.6375,y:182.6479}).wait(1).to({graphics:mask_graphics_104,x:863.4375,y:182.6479}).wait(1).to({graphics:mask_graphics_105,x:863.4375,y:182.6479}).wait(1).to({graphics:mask_graphics_106,x:863.4375,y:182.6479}).wait(1).to({graphics:mask_graphics_107,x:863.4375,y:182.6479}).wait(1).to({graphics:mask_graphics_108,x:825.2375,y:182.6479}).wait(1).to({graphics:mask_graphics_109,x:825.2375,y:182.6479}).wait(1).to({graphics:mask_graphics_110,x:786.9793,y:182.6742}).wait(1).to({graphics:mask_graphics_111,x:748.7793,y:182.6742}).wait(1).to({graphics:mask_graphics_112,x:710.5793,y:182.6742}).wait(1).to({graphics:mask_graphics_113,x:665.8543,y:182.6742}).wait(1).to({graphics:mask_graphics_114,x:589.4543,y:182.6742}).wait(1).to({graphics:mask_graphics_115,x:513.0043,y:182.6742}).wait(1).to({graphics:mask_graphics_116,x:436.6043,y:182.6742}).wait(1).to({graphics:mask_graphics_117,x:360.2043,y:182.6742}).wait(1).to({graphics:mask_graphics_118,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_119,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_120,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_121,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_122,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_123,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_124,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_125,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_126,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_127,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_128,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_129,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_130,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_131,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_132,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_133,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_134,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_135,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_136,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_137,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_138,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_139,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_140,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_141,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_142,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_143,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_144,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_145,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_146,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_147,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_148,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_149,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_150,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_151,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_152,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_153,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_154,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_155,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_156,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_157,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_158,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_159,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_160,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_161,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_162,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_163,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_164,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_165,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_166,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_167,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_168,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_169,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_170,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_171,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_172,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_173,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_174,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_175,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_176,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_177,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_178,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_179,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_180,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_181,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_182,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_183,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_184,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_185,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_186,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_187,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_188,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_189,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_190,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_191,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_192,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_193,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_194,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_195,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_196,x:283.7543,y:182.6742}).wait(1).to({graphics:mask_graphics_197,x:283.7543,y:182.6742}).wait(1));

	// logo
	this.instance_12 = new lib.prinssastrologo();
	this.instance_12.setTransform(72,81);
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(94).to({_off:false},0).wait(104));

	// bg
	this.instance_13 = new lib.bg();
	this.instance_13.setTransform(478.95,182.6,0.312,0.1485,0,0,0,2175.9,1548.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(198));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(104.8,-241.6,1260.6000000000001,984.3000000000001);
// library properties:
lib.properties = {
	id: 'EB75D9150A58714E8B7768BAD5B58323',
	width: 980,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/IMG_0071.jpg", id:"IMG_0071"},
		{src:"images/logo_html5_v2_atlas_1.png", id:"logo_html5_v2_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['EB75D9150A58714E8B7768BAD5B58323'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;