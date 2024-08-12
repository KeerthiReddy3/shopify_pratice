document.addEventListener('DOMContentLoaded', function() {
  const collectionLimitWarning = document.querySelector('.collection-limit-warning');
  const checkoutButton = document.getElementById('checkout');

  function checkCollectionLimits() {
    const cartItems = window.cart.items;
    const collectionProductCounts = {};
    const collectionNames = {}; // To store collection names

    cartItems.forEach(item => {
      item.product.collections.forEach(collection => {
        if (!collectionProductCounts[collection.id]) {
          collectionProductCounts[collection.id] = new Set();
          collectionNames[collection.id] = collection.name; // Store collection name
        }
        collectionProductCounts[collection.id].add(item.id);
      });
    });

    // Find collections where the count of different products exceeds 2
    const collectionsWithLimits = Object.keys(collectionProductCounts).filter(id => collectionProductCounts[id].size > 2);

    if (collectionsWithLimits.length > 0) {
      const collectionNamesList = collectionsWithLimits.map(id => collectionNames[id]).join(', ');
      collectionLimitWarning.textContent = `You can't purchase more than 2 different products from ${collectionNamesList}.`;
      collectionLimitWarning.style.display = 'block';
      // Disable the checkout button
      if (checkoutButton) {
        checkoutButton.disabled = true;
      }
    } else {
      collectionLimitWarning.style.display = 'none';
      // Enable the checkout button
      if (checkoutButton) {
        checkoutButton.disabled = false;
      }
    }
  }

  checkCollectionLimits();

  // Optionally add an event listener to update the cart dynamically
  document.addEventListener('cart:updated', checkCollectionLimits);
});
