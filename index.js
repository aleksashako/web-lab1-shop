const things = [{
    id: 1,
    image: "",
    title: "Ugly Vase",
    description: "just a broken vase with history",
    price: 15,
    },
    {
    id: 2,
    image: "",
    title: "Mug Without a Plate",
    description: "it lost it's and feels lonely",
    price: 8,  
    },
    {
    id: 3,
    image: "",
    title: "Clock (Without Any Arrows)",
    description: "no comments.",
    price: 19,  
    }
];

let cart = [];
let favs = [];

document.addEventListener('DOMContentLoaded', function() {
    renderThings();
})

function renderThings() {
    const thingList = document.getElementById('thing-list');
    thingList.innerHTML = '';
    
    things.forEach(thing => {
        const isFavorited = favorites.some(fav => fav.id === thing.id);
        const favoriteClass = isFavorited ? 'active' : '';
        const favoriteSymbol = isFavorited ? '♥' : '♡';
        
        const thingCard = document.createElement('li');
        thingCard.className = 'thing-card';
        thingCard.innerHTML = `
            <div class="pr-image" style="background-image: url('${thing.image}')"></div>
            <div class="pr-info">
                <h3 class="title">${thing.title}</h3>
                <p class="description">${thing.description}</p>
                <p class="price">$${thing.price}</p>
                <button class="add-to-fav-button ${favoriteClass}" data-id="${thing.id}">${favoriteSymbol}</button>
                <button class="add-to-cart-button" data-id="${thing.id}">Add to cart</button>
            </div>
        `;
        thingList.appendChild(thingCard);
    });
    
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function() {
            const thingId = parseInt(this.getAttribute('data-id'));
            addToCart(thingId);
        });
    });
    
    document.querySelectorAll('.add-to-fav-button').forEach(button => {
        button.addEventListener('click', function() {
            const thingId = parseInt(this.getAttribute('data-id'));
            toggleFavorite(thingId);
        });
    });
}


function addToCart(thingId) {
    let thing = things.find(t => t.id === thingId);
    if(!thing) return;

    let existingItem = cart.find(item => item.id === thingId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
        });
    }
}

function saveCartToStorage() {
    localStorage.setItem('uglyThingsCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('uglyThingsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}


//реализовать добавление и удаление из избранного (возможно по аналогии с корзиной, но пока не точно)


function changeContent(page) {
    const startContent = document.getElementById('startContent');
    const contentDiv = document.getElementById('content');
    
    startContent.style.display = 'none';
    contentDiv.style.display = 'block';
    
    switch (page) {
        case 'store':
            contentDiv.innerHTML = `
                <h2>about store</h2>
                <p>welcome to the Ugly Things Store! we believe that ugly doesn't mean unwanted.</p>
            `;
            break;
        case 'new':
            contentDiv.innerHTML = `
                <h2>new arrivals</h2>
                <p>no new staff as for now(</p>
            `;
            break;
        case 'catalog':
            goBackToStart();
            return; 
        default:
            contentDiv.innerHTML = '<h2>sorry, page not found!</h2>';
    }

}

function goBackToStart() {
    const startContent = document.getElementById('startContent');
    const contentDiv = document.getElementById('content');
    
    contentDiv.style.display = 'none';
    startContent.style.display = 'block';
}
