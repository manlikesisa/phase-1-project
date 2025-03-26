const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme.title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");
const uploadImageInput = document.querySelector("#uploadImage"); 
const memeTitleInput = document.querySelector("#memeTitle"); 
const memeAuthorInput = document.querySelector("#memeAuthor")



const updateDetails = (url,title,author) =>{
    memeImage.setAttribute("src",url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = 'Meme by: ${author}';
}


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
        updateDetails(imageUrl, title, author); // Display the meme with the title and author
    } else {
        alert("Please upload an image and provide a title and author.");
    }
})




const generateMeme = ()=>{
    fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => response.json())
    .then((data) =>{
        updateDetails(data.url,data.title,data.author);
    })
    
};

generateMemeBtn.addEventListener("click",generateMeme);

generateMeme();

