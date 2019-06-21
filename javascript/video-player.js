function videoPlayerEvent(event) {
	// body...
	var videoBox = document.querySelector("video#video-source");
	var playButton = document.querySelector("div.play-switch");
	var videoBoxBlock = document.querySelector("div.video-box");
	var line = document.querySelector("div.move-line");
	var length = 0;
	line.style.width = "0px";
	var currentTimeStop;
	var lineWidth = 514;
	var fullTime = videoBox.duration;
	var stepTime = fullTime * 1000 / lineWidth;
	var lineWidthStop;
	var lineClickItem = document.querySelector("div.current-line");
	//播放（暂停）事件
	var playEvent = function (event) {
		// body...
		var playIcon = document.querySelector("p.play-switch");
		var playSwitchIcon = document.querySelector("div.play-switch i");
		if (videoBox.paused) {
			videoBox.play();
			playIcon.style.display = "none";
			playSwitchIcon.style.background = "url(images/pause.png)";
			currentTimeStop = setInterval(function (argument) {
				// body...
				var videoBox = document.querySelector("video#video-source");
				currentTimeEvent(videoBox);
			},1000);
			lineWidthStop = setInterval(function (argument) {
				// body...
				currentLineEvent();
			},stepTime);
		}else{
			videoBox.pause();
			playIcon.style.display = "block";
			playSwitchIcon.style.background = "url(images/play-small.png)";
			clearInterval(currentTimeStop);
			clearInterval(lineWidthStop);
		}
	};

	addEvent(playButton,"click",playEvent);
	addEvent(videoBoxBlock,"click",playEvent);

	

	//视频实时时间事件
	var currentTimeEvent = function (videoElement) {
		// body...
		var minute = 0,second = 0;
		var currentTime = videoElement.currentTime.toFixed(0);
		var durationTime = videoElement.duration.toFixed(0);
		var playIcon = document.querySelector("p.play-switch");
		var playSwitchIcon = document.querySelector("div.play-switch i");
		var currentTimeDisplay = document.querySelector("span#current-time");
		
		if (currentTime == durationTime) {//当视频结束时
			clearInterval(currentTimeStop);
			playSwitchIcon.style.background = "url(images/play-small.png)";
			currentTimeDisplay.innerHTML = "00:00";
			playIcon.style.display = "block";
		}else{
			if (currentTime > 60) {
				minute++;
				if (minute < 10) {
					minute = "0" + minute;
				}
				second = currentTime - minute*60;
				if (second < 10) {
					second = "0" + second;
				}
			}else{
				minute = "00";
				if (currentTime < 10) {
					second = "0" + currentTime;
				}else{
					second = currentTime;
				}
			}
			var result = minute + ":" + second;
			currentTimeDisplay.innerHTML = result;
		}
		
	}

	//视频总时间事件
	var durationTime = function (videoElement) {
		// body...
		var second,minute,result;
		var duration = videoElement.duration.toFixed(0);
		if (duration > 60) {
			minute = (duration/60).toFixed(0);
			if (minute < 10) {
				minute = "0" + minute;
			}
			second = duration - minute*60;
		}else{
			minute = "00";
			if (duration < 10) {
				second = "0" + duration;
			}else{
				second = duration;
			}
		}
		result = minute + ":" + second;
		return result;
	}
	var videoTime = function (event) {
		// body...
		var fullTimeDisplay = document.querySelector("span#duration-time");
		var fullTime = durationTime(videoBox);
		fullTimeDisplay.innerHTML = fullTime;
	}
	videoTime();


	//进度条事件
	var currentLineEvent = function (argument) {
		// body...
		if (length < lineWidth) {
			length++;
		}else{
			length = 0;
			clearInterval(lineWidthStop);
		}
		line.style.width = length + "px";
	}
	addEvent(lineClickItem,"click",function (event) {
		// body...
		length = event.clientX - elementLeft(this);
		videoBox.currentTime = (length * stepTime / 1000).toFixed(0);
		line.style.width = length + "px";
	});

	// 调节音量事件
	function volumeSelect(argument) {
		// body...
		var leftElement,rightElement;
		var volumeSlient = document.querySelector("em#volume-slient");
		var volumeList = document.querySelectorAll("div.volume-block ul li");
		leftElement = volumeList;
		for (var j = 0; j < leftElement.length; j++) {
			leftElement[j].style.background = "linear-gradient(#57ace3,#418fda)";
		}
		rightElement = [];
		for (var i = 0; i < volumeList.length; i++) {
			addEvent(volumeList[i],"click",function (event) {
				// body...
				this.style.background = "linear-gradient(#57ace3,#418fda)";
				leftElement = selectedArrowNodes(this,1);
				rightElement = selectedArrowNodes(this,0);
				for (var j = 0; j < leftElement.length; j++) {
					leftElement[j].style.background = "linear-gradient(#57ace3,#418fda)";
				}
				for (var k = 0; k < rightElement.length; k++) {
					rightElement[k].style.background = "linear-gradient(#474747,#343434)";
				}
				videoBox.volume = 1 * this.index / volumeList.length;
			});
			volumeList[i].index = i;
		}
		addEvent(volumeSlient,"click",function (event) {//静音事件
			// body...
			if (videoBox.muted) {
				this.style.background = "url(images/sound.png)";
				videoBox.muted = false;
				for (var j = 0; j < leftElement.length; j++) {
					leftElement[j].style.background = "linear-gradient(#57ace3,#418fda)";
				}
				for (var k = 0; k < rightElement.length; k++) {
					rightElement[k].style.background = "linear-gradient(#474747,#343434)";
				}
				videoBox.volume = 1 * (leftElement.length)/volumeList.length;
			}else{
				this.style.background = "url(images/slient.png)";
				videoBox.muted = true;
				for (var i = 0; i < volumeList.length; i++) {
					volumeList[i].style.background = "linear-gradient(#474747,#343434)";
				}
			}
		});
	}
	volumeSelect();

	var fullScreenButton = document.querySelector("div.screen-full");
	addEvent(fullScreenButton,"click",function (event) {
		// body...
		videoBox.requestFullscreen();
	});
}
addEvent(window,"load",videoPlayerEvent);