function getVideoId(url) {
	// TODO  update by using regex
	if (url.indexOf('www.youtube.com') != -1) {
		var lastEqual = url.lastIndexOf('v=');
		return url.substring(lastEqual+2);	
	} else if (url.indexOf('vimeo.com') != -1) {
		return url.substring(url.lastIndexOf('/') + 1);
	}
}

function getLoopUrl(url, videoId) {
	if (url.indexOf('www.youtube.com') != -1) {
		return 'http://www.youtube.com/v/' + videoId + '?version=3&autoplay=1&loop=1&playlist=' + videoId;
	} else if (url.indexOf('vimeo.com') != -1) {
		return 'http://player.vimeo.com/video/' + videoId + '?autoplay=1&loop=1';
	}
}

chrome.tabs.query(
	{active : true, windowId : chrome.windows.WINDOW_ID_CURRENT},
	function(tabs) {
		var currentUrl = tabs[0].url;
		var videoId = getVideoId(currentUrl);
		var loopUrl = getLoopUrl(currentUrl, videoId);

		var iframe = document.getElementById('iframe');
		iframe.src = loopUrl;
		iframe.width = '420'; 
		iframe.height = '315';
	}
);

