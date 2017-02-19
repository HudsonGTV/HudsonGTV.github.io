InsertRepoLink = (function() {
	$('ul.is-supported').before(
		'<ul class="repo-link">' +
			'<li class="link">' +
				'<a href="http://repo.hudsongreen.com/" class="link-inner light-chevron" target="_new">' +
					'<div>' +
						'<img class="icon icon-top" src="../../../assets/favicon.png">' +
						'<label class="light-link">HKG Repository</label>' +
					'</div>' +
				'</a>' +
			'</li>' +
		'</ul>'
	);
});

InsertRepoLink();

/*
		<ul class="repo-link">
			<li class="link">
				<a href="http://repo.hudsongreen.com/" class="link-inner light-chevron" target="_new">
					<div>
						<img class="icon icon-top" src="../../../assets/favicon.png">
						<label class="light-link">HKG Repository</label>
					</div>
				</a>
			</li>
		</ul>
*/