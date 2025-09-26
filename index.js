function changeContent(page) {
	var contentDiv = document.getElementById('content');
	switch (page) {
		case 'store':
			contentDiv.innerHTML = `
				<h2>
					Welcome to the about page!
				</h2>
				<p>
					here soon will be the information
				</p>
			`;
			break;
		case 'new':
			contentDiv.innerHTML = `
				no new staff as for now(
			`;
			break;
		case 'catalog':
			contentDiv.innerHTML = 
				`main`;
			break;

		default:
			contentDiv.innerHTML = '<h2>Page not found!</h2>';
	}
}