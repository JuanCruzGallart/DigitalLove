//DOM variables
let asideContenedor = document.getElementsByTagName("aside");
let containerGaleria = document.querySelector("#galeria");
let showFavouritesBtn = document.getElementById("button_favourites");
let show2020Btn = document.getElementById("show_button2020")
let show2021fromThatNightBtn = document.getElementById("2021_fromthatnight_btn");
let show2021firstOfTheYearBtn = document.getElementById("2021_firstoftheyear_btn");
let showDiciembreBtn = document.getElementById("^_^");
let showTigreBtn = document.getElementById("tigre");


//Funcion CONSTRUCTORA
function MyImage(src){
    let img = new Image();
    img.src = src;
    return img;
};

//Funcion que ITERA las FOTOS de una carpeta que selecciono y las PUSHEA a un array que selecciono
function loadImages(carpeta, array, cantidad){
    for (let i = 1; i <= cantidad; i++) {
        let img = new Image();
        img.src = `../resources/fotos__comprimidas/${carpeta}/${i}.jpg`;
        img.onload = function() {
            array.push(img);
        };
        img.onerror = function() {
            console.log(`Image ../resources/fotos__comprimidas/${carpeta}/${i}.jpg not found`);
        };
      }
};


//Funcion SELECCIONADORA de ARRAYS y BOTONES
function createImageElements(imageSources, button) {
    
    document.addEventListener("DOMContentLoaded", function(){
        button.addEventListener("click", function(){
            
            containerGaleria.innerHTML = "";
        
            for (let i = 0; i < imageSources.length; i++) {
                let img = document.createElement("img");
                img.src = imageSources[i].src;
                img.classList.add( "imageClass");
                img.addEventListener("click", function(){
                    openModal(i, imageSources);
                })
                containerGaleria.appendChild(img);
            }
        })
    });
};


//Array Favourites
const imageArrayFavourites = [] ;

//Array 2020
const imageArray2020 = [];
loadImages(`2020`,imageArray2020, 40);
createImageElements(imageArray2020, show2020Btn) ;

//Array 2021 firstOfTheYear
const imageArray2021firstOfTheYear = [];
loadImages(`2021/firstoftheyear`, imageArray2021firstOfTheYear,30 );
createImageElements(imageArray2021firstOfTheYear, show2021firstOfTheYearBtn);

//Array 2021fromThatNight FALTA COMPRIMIR
const imageArray2021fromThatNight = [];
loadImages(`2021/fromthatnight`, imageArray2021fromThatNight,30 );
createImageElements(imageArray2021fromThatNight, show2021fromThatNightBtn);

//Array ^_^
const imageArray2022diciembre = [];

loadImages(`2022/^_^`, imageArray2022diciembre, 52);
createImageElements(imageArray2022diciembre, showDiciembreBtn);

//Array Tigre
const imageArrayTigre = [];

loadImages(`2022/tigre`, imageArrayTigre, 42);
createImageElements(imageArrayTigre, showTigreBtn);




//Funcion que CREA un MODAL en el DOM cuando una imagen es clickeada
// function openModal(index, images){
//     let modal = document.createElement("div");
//     modal.classList.add("modal");

//     let modalContent = document.createElement("div");
//     modalContent.classList.add("modal-content");
//     modal.appendChild(modalContent);

//     let modalImage = document.createElement("img");
//     modalImage.src = images.src;
//     modalImage.classList.add("modal-image");
//     modalContent.appendChild(modalImage);

//     //Navigation buttons
// let prevButton = document.createElement("button");
// prevButton.classList.add("modal-nav");
// prevButton.classList.add("modal-nav-prev");
// prevButton.innerText = "<";
// prevButton.addEventListener("click" , function(){
//     index = (index - 1 + images.length) % images.length;
//     modalImage.src = images.src
// });
// modalContent.appendChild(prevButton);

// let nextButton = document.createElement("button");
// nextButton.classList.add("modal-nav");
// nextButton.classList.add("modal-nav-next");
// nextButton.innerText = ">";
// nextButton.addEventListener("click", function() {
//     index = (index + 1) % images.length;
//     modalImage.src = images[index].src;
// });
// modalContent.appendChild(nextButton);

// // Add close button
// let closeButton = document.createElement("button");
// closeButton.classList.add("modal-close");
// closeButton.innerText = "X";
// closeButton.addEventListener("click", function() {
//     closeModal(modal);
// });
// modalContent.appendChild(closeButton);

// // Add modal to the DOM
// document.body.appendChild(modal);
// }

// function closeModal(modal) {
//     modal.remove();
// }