//DOM variables
let asideContenedor = document.getElementsByTagName("aside");
let containerGaleria = document.querySelector("#galeria");
let showFavouritesBtn = document.getElementById("button_favourites");
const previewBox = document.querySelector(".preview-box");
const previewImg = previewBox.querySelector(".imageClass");


//Botones Aside
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
        // img.onerror = function() {
        //     console.log(`Image ../resources/fotos__comprimidas/${carpeta}/${i}.jpg not found`);
        // };
    }
};

//Funcion SELECCIONADORA de ARRAYS y BOTONES
function createImageElements(imageSources, button) {
    
    document.addEventListener("DOMContentLoaded", function(){
        button.addEventListener("click", function(){
            
            containerGaleria.innerHTML = "";
        
            for (let i = 0; i < imageSources.length; i++) {
                let span = document.createElement("span")
                let img = document.createElement("img");
                img.src = imageSources[i].src;
                img.classList.add( "imageClass");
                containerGaleria.appendChild(span);
                span.appendChild(img);
            }
        })
    });
};

window.onload = () => {
    const containerGaleria = document.querySelector("#galeria");
    const previewBox = document.querySelector(".preview-box");
    const previewImg = previewBox.querySelector("img");
  
    containerGaleria.addEventListener("click", (event) => {
      const target = event.target;
      const imageElements = containerGaleria.querySelectorAll(".imageClass");
  
      for (let i = 0; i < imageElements.length; i++) {
        if (target === imageElements[i]) {
          console.log(i);
          // function preview(){
          //   let selectedImgUrl = [i].querySelector("img").src;
          //   previewImg.src = selectedImgUrl;
          // }
          // preview();
          previewBox.setAttribute("id", "show-box");
          addCurtain();
          break;
        }
      }
    });
  
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("curtain")) {
        removeCurtain();
      }
    });
  };
  
  function addCurtain() {
    let curtain = document.createElement("div");
    let navbar = document.getElementById("cortina-nav");
    curtain.classList.add("curtain", "z-2");
    document.getElementById("cortina").appendChild(curtain);
    navbar.classList.add("hide");
  }
  
  function removeCurtain() {
    let curtain = document.querySelector(".curtain");
    if (curtain) {
      curtain.parentNode.removeChild(curtain);
      previewBox.removeAttribute("id");
    }
    let navbar = document.getElementById("cortina-nav");
    navbar.classList.remove("hide");
  }


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
