document.addEventListener('DOMContentLoaded', () => {
  // Define collection limits
  const collectionLimits = {
    '478029709605': 1, // Example collection ID and limit
    '478123852069': 1,
    '478354276645': 1,
    '478354964773': 1,
    '478768103717': 1
  };

  // Object to keep track of added items
  const collectionItemCounts = {};

  // Function to update the button state based on the cart contents
  const updateButtonStates = () => {
    document.querySelectorAll('[data-collection-ids]').forEach(button => {
      const collectionIds = button.getAttribute('data-collection-ids').split(',');
      let disabled = false;

      for (const id of collectionIds) {
        if (collectionItemCounts[id] >= (collectionLimits[id] || Infinity)) {
          disabled = true;
          break;
        }
      }

      button.disabled = disabled;
      if (disabled) {
        button.classList.add('disabled'); // Add a class to visually indicate the button is disabled
      } else {
        button.classList.remove('disabled');
      }
    });
  };

  // Function to fetch cart contents and update collection counts
  const fetchCart = () => {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        // Reset collection item counts
        for (const id in collectionItemCounts) {
          collectionItemCounts[id] = 0;
        }

        // Update collection counts based on cart items
        cart.items.forEach(item => {
          const productId = item.product_id;
          const variantId = item.variant_id;

          // Fetch variant details to get collection IDs
          fetch(`/variants/${variantId}.js`)
            .then(response => response.json())
            .then(variant => {
              const collectionIds = variant.collections || []; // This is a placeholder; adjust based on your setup
              collectionIds.forEach(id => {
                if (collectionLimits[id]) {
                  collectionItemCounts[id] = (collectionItemCounts[id] || 0) + item.quantity;
                }
              });

              // Update button states after processing each variant
              updateButtonStates();
            });
        });
      });
  };

  // Event listener for add-to-cart buttons
  document.querySelectorAll('[data-collection-ids]').forEach(button => {
    button.addEventListener('click', function () {
      // Fetch cart data when an item is added
      fetchCart();
    });
  });

  // Initial update to set the correct button state on page load
  fetchCart();
});
