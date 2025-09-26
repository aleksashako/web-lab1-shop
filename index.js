function changeContent(page) {
    const startScreen = document.getElementById('startScreen');
    const contentDiv = document.getElementById('content');
    const backButton = document.getElementById('backButton');
    
    backButton.style.display = 'block';
    startScreen.style.display = 'none';
    contentDiv.style.display = 'block';
    
    switch (page) {
        case 'store':
            contentDiv.innerHTML = `
                <h2>about store</h2>
                <p>Welcome to the Ugly Things Store! We believe that ugly doesn't mean unwanted.</p>
                <p>Here you can find unique items that others might overlook.</p>
            `;
            break;
        case 'new':
            contentDiv.innerHTML = `
                <h2>New Arrivals</h2>
                <p>No new staff as for now(</p>
                <p>Check back later for new ugly treasures!</p>
            `;
            break;
        case 'catalog':
            goBackToStart();
            return; 
        default:
            contentDiv.innerHTML = '<h2>Page not found!</h2>';
    }
}

function goBackToStart() {
    const startScreen = document.getElementById('startScreen');
    const contentDiv = document.getElementById('content');
    const backButton = document.getElementById('backButton');
    
    backButton.style.display = 'none';
    contentDiv.style.display = 'none';
    
    startScreen.style.display = 'block';
}

