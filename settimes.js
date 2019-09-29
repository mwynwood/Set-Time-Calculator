function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function calculateSet() {
	var duration = getUrlVars()["duration"];
	var sets = getUrlVars()["sets"];
	var setLength = getUrlVars()["setLength"];
	var startHour = getUrlVars()["startTime"];

	if(duration == undefined) {
		duration = 240;
	}
	if(sets == undefined) {
		sets = 4;
	}
	if(setLength == undefined) {
		setLength = 45;
	}
	if(startHour == undefined) {
		startHour = 9;
	}

	var startTime = new Date(1, 1, 1970, startHour, 00, 00);

	document.SetCalculator.ConcertDuration.value = duration;
	document.SetCalculator.NumberOfSets.value = sets;
	document.SetCalculator.SetLength.value = setLength;
	document.SetCalculator.startTime.value = startHour;

	var totalPerformanceTime = sets * setLength;
	var totalBreakTime = duration - totalPerformanceTime;
	var breaks = sets - 1;
	var breakLength = totalBreakTime / breaks;

	var scale = 2;
	var height = duration * scale;
	var width = "660px"; // 700px is about A4 size

	document.getElementById("summary").innerHTML = "There are " + sets + " x " + setLength + " minute sets, totaling " + totalPerformanceTime + " minutes performance time.<br />There are " + breaks + " x " + breakLength + " minute breaks, totaling " + totalBreakTime + " minutes break time.</br />";

	document.getElementById("graph").innerHTML = "";
	document.getElementById("graph").style.height = height;
	document.getElementById("graph").style.width = width;
	document.getElementById("graph").style.border = "3px black solid";

	if(totalPerformanceTime < duration) {
		for(i = 0; i < sets; i++) {
			document.getElementById("graph").innerHTML = document.getElementById("graph").innerHTML + "<div class='set' style='height: " + setLength * scale + ";'>" + niceTime(startTime) + " (" + setLength + " minute set)</div>";
			if(i < breaks) {
				startTime = new Date(startTime.getTime() + (setLength * 60 * 1000))
				document.getElementById("graph").innerHTML = document.getElementById("graph").innerHTML + "<div class='break' style='height: " + breakLength * scale + ";'>&nbsp;" + niceTime(startTime) + " (" + breakLength + " minute break)</div>";
			}
			startTime = new Date(startTime.getTime() + (breakLength * 60 * 1000))
		}
	} else {
		document.getElementById("graph").innerHTML = "Error!<br />You are performing longer than you need to.";
	}
}

function niceTime(theDateObject) {
	var hours = theDateObject.getHours();
	var minutes = theDateObject.getMinutes();
	if(minutes < 10) {
		minutes = "0" + minutes;
	}
	return hours + ":" + minutes;
}

function reloadPageWithArgs() {
	var url = window.location.href.substring(0, window.location.href.indexOf('?'));
	url += '?&duration=' + document.SetCalculator.ConcertDuration.value + '&sets=' + document.SetCalculator.NumberOfSets.value + '&setLength=' + document.SetCalculator.SetLength.value + '&startTime=' + document.SetCalculator.startTime.value;
	window.location.href = url
}

calculateSet();