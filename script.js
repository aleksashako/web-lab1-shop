const things = [{
    id: 1,
    image: 'img/ugly-vase.jpg',
    title: "Ugly Vase",
    description: "just a broken vase with a history",
    price: 15,
    },
    {
    id: 2,
    image: 'img/mug-without-handle.jpg',
    title: "Mug Without Handle",
    description: "it lost it's part and feels lonely",
    price: 8,  
    },
    {
    id: 3,
    image: 'img/clock-without-arrows.jpg',
    title: "Clock (Without Arrows)",
    description: "no comments.",
    price: 19,  
    },
    {
    id: 4,
    image: 'img/book-without-cover.jpg',
    title: "Book Without Cover",
    description: "still a good book though",
    price: 6,  
    },
    {
    id: 5,
    image: 'img/ugly-lamp.jpg',
    title: "Ugly But Funny Lamp",
    description: "a lot of colours are available",
    price: 17,  
    },
    {
    id: 6,
    image: 'img/ugly-portrait.jpg',
    title: "Ugly Portrait",
    description: "can be painted based on your photo!",
    price: 9,  
    },
    {
    id: 7,
    image: 'img/ugly-chair.jpg',
    title: "Uncomfortable Chair",
    description: "try it",
    price: 7,  
    },
    {
    id: 8,
    image: 'img/ugly-monster.jpg',
    title: "Not Ugly Monster",
    description: "random monster will be sent",
    price: 13,  
    }
];

let cart = [];
let favs = [];

document.addEventListener('DOMContentLoaded', function() {
    renderThings();
    loadCartFromStorage();
    updateCart();

    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        placeOrder();
    });
});

function changeContent(page) {
    const startContent = document.getElementById('startContent');
    const contentDiv = document.getElementById('content');
    
    startContent.style.display = 'none';
    contentDiv.style.display = 'block';
    
    switch (page) {
        case 'store':
            contentDiv.innerHTML = `
                <h2>About store</h2>
                <p>welcome to the Ugly Things Store! we believe that ugly doesn't mean unwanted.</p>
            `;
            break;
        case 'new':
            contentDiv.innerHTML = `
                <h2>New Arrivals</h2>
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

function renderThings() {
    let thingList = document.getElementById('thing-list');
    thingList.innerHTML = '';
    
    things.forEach(thing => {
        let isFavorited = favs.some(fav => fav.id === thing.id);
        let favoriteClass = isFavorited ? 'active' : '';
        let favoriteSymbol = isFavorited ? '♥' : '♡';
        
        let thingCard = document.createElement('li');
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
            toggleFavorite(thingId, this);
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
    updateAddToCartButtons();
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
        updateAddToCartButtons();
    }
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

    updateAddToCartButtons();
}

function updateAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        const thingId = parseInt(button.getAttribute('data-id'));
        const cartItem = cart.find(item => item.id === thingId);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        let countSpan = button.querySelector('.item-count');
        
        if (quantity > 0) {
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'item-count';
                button.appendChild(countSpan);
            }
            countSpan.textContent = quantity;
        } else {
            if (countSpan) {
                countSpan.remove();
            }
        }
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

function openCheckoutForm() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('form-modal').style.display = 'block';
}

function closeCheckoutForm() {
    document.getElementById('form-modal').style.display = 'none';
}

function closeOrderSuccessModal() {
    document.getElementById('order-success-modal').style.display = 'none';
}

function placeOrder() {
    document.getElementById('form-modal').style.display = 'none';
    
    cart = [];
    saveCartToStorage();
    updateCart();
    
    document.getElementById('checkout-form').reset();
    
    document.getElementById('order-success-modal').style.display = 'block';
}
