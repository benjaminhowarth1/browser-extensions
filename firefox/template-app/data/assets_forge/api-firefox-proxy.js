/* global unsafeWindow, cloneInto, exportFunction, createObjectIn, self */

var FirefoxMajorVersion = parseInt(navigator.userAgent.match(/(firefox(?=\/))\/?\s*(\d+)/i)[2], 10);

if (FirefoxMajorVersion <= 32) {
	unsafeWindow._forge = unsafeWindow._forge || {};
	unsafeWindow._forge.self = self;
} else {
	unsafeWindow._forge = cloneInto(unsafeWindow._forge || {}, unsafeWindow);
	unsafeWindow._forge.self = createObjectIn(unsafeWindow._forge, {defineAs: "self"});
	exportFunction(self.on, unsafeWindow._forge.self, {defineAs:"on", allowCallbacks:true});
	exportFunction(self.postMessage, unsafeWindow._forge.self, {defineAs:"postMessage", allowCallbacks:true});
}

window.addEventListener("update-window-size", function() {
  var el = document.querySelector('body');
  var data = {width: el.scrollWidth + 1, height: el.scrollHeight + 1};
  self.port.emit("winsize", data);

}, false);
