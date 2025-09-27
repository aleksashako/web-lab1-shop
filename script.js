const things = [{
    id: 1,
    image: "",
    title: "Ugly Vase",
    description: "just a broken vase with a history",
    price: 15,
    },
    {
    id: 2,
    image: "",
    title: "Mug Without Saucer",
    description: "it lost it's pair and feels lonely",
    price: 8,  
    },
    {
    id: 3,
    image: "../../img/clock-without-arrows.jpg",
    title: "Clock (Without Arrows)",
    description: "no comments.",
    price: 19,  
    },
    {
    id: 4,
    image: "",
    title: "Book Without Cover",
    description: "still a good book though",
    price: 6,  
    },
    {
    id: 5,
    image: "",
    title: "...",
    description: "...",
    price: 0,  
    }
];

let cart = [];
let favs = [];

document.addEventListener('DOMContentLoaded', function() {
    renderThings();
    loadCartFromStorage();
    updateCart();
});

function renderThings() {
    const thingList = document.getElementById('thing-list');
    thingList.innerHTML = '';
    
    things.forEach(thing => {
        const isFavorited = favs.some(fav => fav.id === thing.id);
        const favoriteClass = isFavorited ? 'active' : '';
        const favoriteSymbol = isFavorited ? '♥' : '♡';
        
        const thingCard = document.createElement('li');
        thingCard.className = 'thing-card';
        thingCard.innerHTML = `
            <div class="th-image" style="background-image: url('${thing.image}')"></div>
            <div class="th-info">
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
    const thing = things.find(t => t.id === thingId);
    if (!thing) return;

    const existingItem = cart.find(item => item.id === thingId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: thing.id,
            title: thing.title,
            price: thing.price,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCart();
}

function removeFromCart(thingId) {
    cart = cart.filter(item => item.id !== thingId);
    saveCartToStorage();
    updateCart();
}

function updateQuantity(thingId, change) {
    const item = cart.find(item => item.id === thingId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(thingId);
    } else {
        saveCartToStorage();
        updateCart();
    }
}

function clearCart() {
    cart = []
    updateCart();
    saveCartToStorage();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    const cartItems = document.getElementById('cart-items');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    totalPrice.textContent = calculateTotal().toFixed(2);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-state"><p>unfortunately, your cart is empty...</p></div>';
        return;
    }
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });
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

function openCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

function openFavModal() {
    const modal = document.getElementById('fav-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
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
