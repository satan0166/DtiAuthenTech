// Get references to input elements
const originalProductInput = document.getElementById('original-product-input');
const receivedProductInput = document.getElementById('received-product-input');

// Listen for changes in the file inputs
originalProductInput.addEventListener('change', handleOriginalProductChange);
receivedProductInput.addEventListener('change', handleReceivedProductChange);

// Function to handle changes in the original product input
function handleOriginalProductChange(event) {
    const file = event.target.files[0];
    displayImage(file, 'original-product-image');
}

// Function to handle changes in the received product input
function handleReceivedProductChange(event) {
    const file = event.target.files[0];
    displayImage(file, 'received-product-image');
}

// Function to display the selected image
function displayImage(file, imageId) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = document.getElementById(imageId);
            imgElement.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Function to analyze images and update verification result
function analyzeImages() {
    const originalImage = document.getElementById('original-product-image').src;
    const receivedImage = document.getElementById('received-product-image').src;
    
    console.log('Original Image:', originalImage);
    console.log('Received Image:', receivedImage);
    if (originalImage && receivedImage) {
        // Perform image analysis here
        const result = compareImages(originalImage, receivedImage);
        updateVerificationResult(result, receivedImage);
    } else {
        updateVerificationResult("Please upload both images", null);
    }
}

// Function to compare images and determine verification result
function compareImages(originalImage, receivedImage) {
    if (originalImage === receivedImage) {
        return "Original Product";
    } else {
        return "Counterfeit Product";
    }
}

// Function to update verification result
function updateVerificationResult(result, imageUrl) {
    const verificationResultElement = document.getElementById('verification-result');
    verificationResultElement.textContent = result;

    const verificationImageElement = document.getElementById('verification-image');
    if (imageUrl) {
        verificationImageElement.src = imageUrl;
        verificationImageElement.style.display = 'block'; // Show verification image
    } else {
        verificationImageElement.style.display = 'none'; // Hide verification image if no URL provided
    }
}

// Get reference to compare images button
const compareImagesBtn = document.getElementById('compare-images-btn');

// Listen for click event on the compare images button
compareImagesBtn.addEventListener('click', function() {
    analyzeImages();
}
originalProductInput.addEventListener('change', function(event) {
    console.log('Original product input changed');
    handleOriginalProductChange(event);
});
