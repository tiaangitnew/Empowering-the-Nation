// Global variables
const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage
const vatRate = 0.15;

// Function to display selected courses
function displaySelectedCourses() {
    if (cart.length === 0) {
        document.getElementById('selected-courses').innerHTML = "<p>No courses selected.</p>";
        return;
    }

    let courseList = cart.map(course => `<li>${course.name} - R${course.price}</li>`).join("");
    document.getElementById('selected-courses').innerHTML = `<ul>${courseList}</ul>`;
}

// Function to calculate total price including discounts and VAT
function calculateTotal() {
    let basePrice = 0;
    let discount = 0;

    // Calculate base price
    cart.forEach(course => basePrice += course.price);

    // Apply discounts based on the number of courses
    if (cart.length === 2) discount = 0.05;
    if (cart.length === 3) discount = 0.10;
    if (cart.length > 3) discount = 0.15;

    let discountedPrice = basePrice * (1 - discount);
    let vat = discountedPrice * vatRate;
    let totalPrice = discountedPrice + vat;

    document.getElementById('total-price').innerHTML = `
        <p>Base Price: R${basePrice.toFixed(2)}</p>
        <p>Discount: ${(discount * 100).toFixed(0)}%</p>
        <p>Price after Discount: R${discountedPrice.toFixed(2)}</p>
        <p>VAT (15%): R${vat.toFixed(2)}</p>
        <p><strong>Total Price: R${totalPrice.toFixed(2)}</strong></p>
    `;
}

// Form validation for contact details
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Basic validation for empty fields
    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all the required fields.");
        return false;
    }

    // Validate phone number format (assuming 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    alert("Your selection has been confirmed!");
    localStorage.clear(); // Clear cart after finalizing selection
    return true; // Form submission allowed
}

// Display selected courses on page load
window.onload = displaySelectedCourses;
