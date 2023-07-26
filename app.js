const form = document.getElementById('add-product-form');
const productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];

let editProductId = null; // To store the ID of the product being edited (if any)

// Function to fetch all products and display them in the table
async function fetchProducts() {
  try {
    const response = await axios.get('https://nice-cod-gear.cyclic.app/products');
    const products = response.data.data;

    productTable.innerHTML = ''; // Clear existing table rows

    products.forEach(product => {
      addProductToTable(product);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Function to add product data to the table
function addProductToTable(product) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('td');
  nameCell.textContent = product.name;
  row.appendChild(nameCell);

  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = product.description;
  row.appendChild(descriptionCell);

  const priceCell = document.createElement('td');
  priceCell.textContent = product.price;
  row.appendChild(priceCell);

  const actionsCell = document.createElement('td');

  // Edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editProduct(product));
  actionsCell.appendChild(editButton);

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteProduct(product._id));
  actionsCell.appendChild(deleteButton);

  row.appendChild(actionsCell);

  productTable.appendChild(row);
}

// Function to add a new product
async function addProduct(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;

  try {
    if (editProductId) {
      // If editProductId is set, update the existing product
      await axios.put(`https://nice-cod-gear.cyclic.app/product/${editProductId}`, {
        name,
        description,
        price,
      });
      editProductId = null; // Reset editProductId after successful update
    } else {
      // If editProductId is not set, add a new product
      await axios.post('https://nice-cod-gear.cyclic.app/product', {
        name,
        description,
        price,
      });
    }

    fetchProducts(); // Fetch products again after adding/updating
    form.reset(); // Clear input fields after adding/updating the product
  } catch (error) {
    console.error('Error adding/updating product:', error);
  }
}

// Function to edit a product
function editProduct(product) {
  editProductId = product._id; // Set editProductId to the ID of the product being edited

  // Set product details in the form for editing
  document.getElementById('name').value = product.name;
  document.getElementById('description').value = product.description;
  document.getElementById('price').value = product.price;
}

// Function to delete a product
async function deleteProduct(productId) {
  try {
    await axios.delete(`https://nice-cod-gear.cyclic.app/product/${productId}`);
    fetchProducts(); // Fetch products again after deletion
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Event listener for form submission
form.addEventListener('submit', addProduct);


fetchProducts();
