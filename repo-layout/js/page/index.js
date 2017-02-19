LoadIndexLinks = (function() {
	
	$('.table-insert-after').after(
		'<ul>' +
			'<li class="link">' +
				'<a href="changelog.html" class="link-inner chevron">' +
					'<div>' +
						'<img class="icon" src="../../../assets/changelog.png">' +
						'<label>Recent Changes</label>' +
					'</div>' +
				'</a>' +
			'</li>' +
			'<li class="link">' +
				'<a href="discussion.html" class="link-inner chevron">' +
					'<div>' +
						'<img class="icon" src="../../../assets/discussion.png">' +
						'<label>Discussion</label>' +
					'</div>' +
				'</a>' +
			'</li>' +
		'</ul>' +
		'<ul>' +
			'<li class="link">' +
				'<a href="safari://https://twitter.com/HKGTV" class="link-inner chevron" target="_new">' +
					'<div>' +
						'<img class="icon" src="../../../assets/twitter.png">' +
						'<label>Follow Developer</label>' +
						'<label class="chevron-right">@HKGTV</label>' +
					'</div>' +
				'</a>' +
			'</li>' +
		'</ul>'
	);
	
});

LoadIndexLinks();

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
					<a href="discussion.html" class="link-inner chevron">
						<div>
							<img class="icon" src="../../../assets/discussion.png">
							<label>Discussion</label>
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