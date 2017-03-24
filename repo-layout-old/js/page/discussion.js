LoadDiscussionLinks = (function() {
	
	$('.table-insert-after').after(
		'<ul>' +
			'<li class="link">' +
				'<a href="changelog.html?package=" id="package-link" class="link-inner chevron">' +
					'<div>' +
						'<img class="icon" src="../assets/changelog.png">' +
						'<label>Recent Changes</label>' +
					'</div>' +
				'</a>' +
			'</li>' +
			'<li class="link">' +
				'<a href="screenshot.html?package=" id="package-link" class="link-inner chevron">' +
					'<div>' +
						'<img class="icon" src="../assets/screenshot.png">' +
						'<label>Screenshots</label>' +
					'</div>' +
				'</a>' +
			'</li>' +
		'</ul>' +
		'<ul>' +
			'<li class="link">' +
				'<a href="twitter:///user?screen_name=HKGTV" class="link-inner chevron" target="_new">' +
					'<div>' +
						'<img class="icon" src="../assets/twitter.png">' +
						'<label>Follow Developer</label>' +
						'<label class="chevron-right">@HKGTV</label>' +
					'</div>' +
				'</a>' +
			'</li>' +
		'</ul>'
	);
	
});

LoadDiscussionLinks();

/*
			<ul>
				<li class="link">
					<a href="changelog.html" class="link-inner chevron">
						<div>
							<img class="icon" src="../../../assets/changelog.png">
							<label>Recent Changes</label>
						</div>
					</a>
				</li>
				<li class="link">
					<a href="screenshot.html" class="link-inner chevron">
						<div>
							<img class="icon" src="../../../assets/screenshot.png">
							<label>Screenshots</label>
						</div>
					</a>
				</li>
			</ul>
			
			<ul>
				<li class="link">
					<a href="safari://https://twitter.com/HKGTV" class="link-inner chevron" target="_new">
						<div>
							<img class="icon" src="../../../assets/twitter.png">
							<label>Follow Developer</label>
							<label class="chevron-right">@HKGTV</label>
						</div>
					</a>
				</li>
			</ul>
*/
