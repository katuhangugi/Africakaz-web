// Get references to the DOM elements we need
const conversionPage = document.querySelector('#conversion-page');
const aboutPage = document.querySelector('#about-page');
const helpPage = document.querySelector('#help-page');
const imageFileInput = document.querySelector('#image-file');
const formatRadios = document.querySelectorAll('input[name="format"]');
const convertBtn = document.querySelector('#convert-btn');

// Add click event listeners to the navigation buttons
document.querySelector('#nav-conversion').addEventListener('click', showConversionPage);
document.querySelector('#nav-about').addEventListener('click', showAboutPage);
document.querySelector('#nav-help').addEventListener('click', showHelpPage);

// Show the conversion page by default
showConversionPage();

// Function to show the conversion page and hide the others
function showConversionPage() {
    conversionPage.style.display = 'block';
    aboutPage.style.display = 'none';
    helpPage.style.display = 'none';
}

// Function to show the about page and hide the others
function showAboutPage() {
    conversionPage.style.display = 'none';
    aboutPage.style.display = 'block';
    helpPage.style.display = 'none';
}

// Function to show the help page and hide the others
function showHelpPage() {
    conversionPage.style.display = 'none';
    aboutPage.style.display = 'none';
    helpPage.style.display = 'block';
}

// Function to convert the selected image to the chosen format
function convertImage() {
    const file = imageFileInput.files[0];
    const format = document.querySelector('input[name="format"]:checked').value;

    // Use the FileReader API to read the image file as a data URL
    const reader = new FileReader();
    reader.onload = () => {
        const dataUrl = reader.result;

        // Create a new Image object and set its source to the data URL
        const img = new Image();
        img.src = dataUrl;

        // When the image has loaded, create a canvas element and draw the image on it
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Use the canvas API to convert the image to the chosen format
            const dataUri = canvas.toDataURL(`image/${format}`);

            // Create a new link element and set its href to the data URL
            const link = document.createElement('a');
            link.href = dataUri;

            // Set the download attribute to the original file name with the new extension
            const parts = file.name.split('.');
            parts.pop();
            link.download = `${parts.join('.')}.${format}`;

            // Programmatically click the link to trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };
    reader.readAsDataURL(file);
}

// Add click event listener to the convert button
convertBtn.addEventListener('click', convertImage);