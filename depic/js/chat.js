$.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results == null) {
		return null;
	} else {
		return results[1] || 0;
	}
}

var disqus_config = function () {
	this.page.url = window.location.url;
	this.page.identifier = $.urlParam('package');
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = '//hudsongtv.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
