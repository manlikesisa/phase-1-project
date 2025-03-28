const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .Meme-Tittle");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const uploadImageInput = document.querySelector("#uploadImage"); 
const memeTitleInput = document.querySelector("#memeTitle"); 
const memeAuthorInput = document.querySelector("#memeAuthor");

// Select the elements for the About functionality
const aboutBtn = document.querySelector("#about");
const aboutContent = document.querySelector(".about-content");
const closeAboutBtn = document.querySelector(".close-about-btn");

// Function to update the meme details
const updateDetails = (url, title, author) => {
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = `Meme by: ${author}`;
};

// Event listener for the "Upload Image" input
uploadImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = () => {
            const imageUrl = reader.result;
            updateDetails(imageUrl, memeTitleInput.value, memeAuthorInput.value);
        };
        
        reader.readAsDataURL(file); 
    }
});

// Event listener for the "Generate Meme" button
generateMemeBtn.addEventListener("click", () => {
    const imageUrl = memeImage.src;
    const title = memeTitleInput.value;
    const author = memeAuthorInput.value;
    
    if (imageUrl && imageUrl !== "" && title && author) {
        updateDetails(imageUrl, title, author); 
    } else {
        alert("Please upload an image and provide a title and author.");
    }
});

// Function to fetch a random wholesome meme from the API
const generateMeme = () => {
    fetch("https://meme-api.com/gimme/wholesomememes")
        .then((response) => response.json())
        .then((data) => {
            updateDetails(data.url, data.title, data.author);
        })
        .catch((error) => {
            console.error("Error fetching meme:", error);
        });
};

// Event listener for the "Generate Meme" button to fetch meme from the API
generateMemeBtn.addEventListener("click", generateMeme);

// Generate an initial meme when the page loads
generateMeme();

// Event listener for the "About" button to show the About section
aboutBtn.addEventListener("click", () => {
    aboutContent.classList.toggle("active"); // Toggle the visibility of the About section
});

// Event listener for the "Close" button inside the About section to hide it
closeAboutBtn.addEventListener("click", () => {
    aboutContent.classList.remove("active"); // Remove the active class to hide the About section
});
