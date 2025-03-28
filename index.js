const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .Meme-Tittle");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const uploadImageInput = document.querySelector("#uploadImage"); 
const memeTitleInput = document.querySelector("#memeTitle"); 
const memeAuthorInput = document.querySelector("#memeAuthor");

const aboutLink = document.querySelector("#aboutLink");
const aboutContent = document.querySelector("#aboutContent");

aboutLink.addEventListener("click", (event) => {
    event.preventDefault(); 
    aboutContent.classList.toggle("active"); 
});

contactLink.addEventListener("click",(event) => {
        event.preventDefault();
        contactContent.classList.toggle("active");
});



const updateDetails = (url, title, author) => {
    memeImage.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = `Meme by: ${author}`;
};


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


generateMemeBtn.addEventListener("click", generateMeme);


generateMeme();

aboutBtn.addEventListener("click", () => {
    aboutContent.classList.toggle("active"); 
});


closeAboutBtn.addEventListener("click", () => {
    aboutContent.classList.remove("active"); 
});
