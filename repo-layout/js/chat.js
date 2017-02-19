var disqus_config = function () {
	this.page.url = window.location.url;
	this.page.identifier = (window.location.pathname).replace('index', '').replace('screenshot', '').replace('changelog', '').replace('.html', '');
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = '//hudsongtv.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
