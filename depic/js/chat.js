$.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results == null) {
		return null;
	} else {
		return results[1] || 0;
	}
}

var disqus_config = function () {
	var packageID = $.urlParam('package');
	packageID = packageID.substring(packageID.indexOf('/') + 1);
	this.page.url = window.location.url;
	this.page.identifier = packageID;
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = '//hudsongtv.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
