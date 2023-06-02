// Functions for curtain
function addCurtain() {
  let curtain = document.createElement("div");
  let navbar = document.getElementById("cortina-nav");
  curtain.classList.add("curtain", "z-1");
  let cortina = document.getElementById("cortina")
  cortina.appendChild(curtain);
  navbar.classList.add("hide");
  document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("curtain")) {
      removeCurtain();
    }
  });
}

function removeCurtain() {
  let curtain = document.querySelector(".curtain");
  if (previewBox) {
    curtain.parentNode.removeChild(curtain);
    previewBox.removeAttribute("id");
  }else{
    curtain.parentNode.removeChild(curtain); 
  }
  let navbar = document.getElementById("cortina-nav");
  navbar.classList.remove("hide");
  let cortina = document.getElementById("cortina");
  let shpCrt = document.getElementById("preview_shpcrt");
  cortina.removeChild(shpCrt);
}

// Function CONSTRUCTORA
function MyImage(src) {
  let img = new Image();
  img.src = src;
  return img;
}

// Function for uploading photos to the Favourites category
function loadFavImgs(carpeta,numero){

  const verticalImages = [];

    let img = new MyImage(`../resources/fotos__comprimidas/${carpeta}/${numero}.jpg`);
    img.onload = function () {

      if (img.height > img.width){
        verticalImages.push(img);
      }else{
        imageArrayFavourites.push(img);
      }

      // if(verticalImages.length + imageArrayFavourites.length === cantidad){
      //   imageArrayFavourites.push(...verticalImages);
      // }


    };

}

// Function that ITERATES through the photos in a selected folder and PUSHES them to a selected array
function loadImages(carpeta, array, cantidad) {

  const verticalImages = [];

  for (let i = 1; i <= cantidad; i++) {
    let img = new MyImage(`../resources/fotos__comprimidas/${carpeta}/${i}.jpg`);
    img.onload = function () {

      if (img.height > img.width){
        verticalImages.push(img);
      }else{
        array.push(img);
      }

      if(verticalImages.length + array.length === cantidad){
        array.push(...verticalImages);
      }
    };

  }
}

//Function to create FAV images once page loaded ARREGLAR
function createFavImages(imageSources) {
    document.addEventListener("DOMContentLoaded", function () {
    containerGaleria.innerHTML = "";
    sectionGaleria.innerHTML = "";

    createHeading(showFavouritesBtn);

    for (let i = 0; i < imageSources.length; i++) {
      let span = document.createElement("span");
      let img = document.createElement("img");

      img.src = imageSources[i].src;
      img.classList.add("imageClass");
      img.addEventListener("click", function () {
        lightbox(i, imageSources);
      });

      containerGaleria.appendChild(span);
      span.appendChild(img);
    }
  });
}


// Function to create image elements and attach click event listener
function createImageElements(imageSources, button) {
  button.addEventListener("click", function () {
    containerGaleria.innerHTML = "";
    sectionGaleria.innerHTML = "";

    createHeading(button);

    for (let i = 0; i < imageSources.length; i++) {
      let span = document.createElement("span");
      let img = document.createElement("img");

      img.src = imageSources[i].src;
      img.classList.add("imageClass");
      img.addEventListener("click", function () {
        lightbox(i, imageSources);
      });

      containerGaleria.appendChild(span);
      span.appendChild(img);
    }
  });
}

//Function for the heading
function createHeading(tituloBoton){
    const heading = document.createElement("h2");
    heading.classList.add("heading-galeria")
    heading.innerHTML = tituloBoton.innerHTML;
    sectionGaleria.appendChild(heading);
}

// Function for the lightbox
function lightbox(index, images) {
  const previewImg = previewBox.querySelector("img");
  const totalImages = images.length;
  
  function preview() {
    let selectedImgUrl = images[index].src;
    previewImg.src = selectedImgUrl;
  }

  preview();
  previewBox.setAttribute("id", "show-box");
  addCurtain();
  shpCrtBtnAdd();


  prevBtn.onclick = function () {
    index--;
    if (index < 0) {
      index = totalImages - 1;
    }
    preview();
  };

  nextBtn.onclick = function () {
    index++;
    if (index >= totalImages) {
      index = 0;
    }
    preview();
  };

    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        // Handle left arrow key
        index--;
        if (index < 0) {
          index = totalImages - 1;
        }

//toggle button cuando toco la flecha del teclado
        // document.querySelectorAll('.btn.prev').forEach(buttonElement => {
        //   const button = bootstrap.Button.getOrCreateInstance(buttonElement)
        //   button.toggle();
        //   document.addEventListener("keyup", function(event){
        //     if (event.key === "ArrowLeft") {
        //       setTimeout(() => {
        //         button.toggle();
        //       }, 25);
              
        //     }
        //   })
        // })
        
        preview();
      } else if (event.key === "ArrowRight") {
        // Handle right arrow key
        index++;
        if (index >= totalImages) {
          index = 0;
        }
        preview();
      }
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        removeCurtain();
      }
    });
  
    
//Add to cart button
    let btnAddToCart = document.querySelector(".preview_shoppingcrt");

    btnAddToCart.addEventListener("click", function addToCart() {
      let selectedImgUrl = images[index].src;
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      
      if (!cartItems.includes(selectedImgUrl)) {
        let newItemKey = "item_" + Date.now();
        localStorage.setItem(newItemKey, selectedImgUrl);
        cartItems.push(newItemKey);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));  
      }
})
}

//Shopping cart functions
let btnCartOpen = document.querySelector(".nav_cart");

//Clicks btn and opens cartBox
btnCartOpen.addEventListener("click", function(){
  let btnCartPanel = document.querySelector(".cartBox")
  btnCartPanel.setAttribute("id", "active");

  addCurtain();

//Closes cartBox
  let closeIcon = document.querySelector("#close_icon");
  closeIcon.addEventListener("click", function(e){
  btnCartPanel.removeAttribute("id" , "active");
  removeCurtain();
})
document.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("cartBox")) {
    btnCartPanel.removeAttribute("id" , "active");
    removeCurtain();
  }
});

//Creates item elements in cart


})



//Adding to local storage indian
let items = [];


//Adds shopping cart btn to curtain
function shpCrtBtnAdd () {
  let shpCrt = document.createElement("div");

  shpCrt.innerHTML = `<button type="button" class="btn btn-outline-warning z-3 preview_shoppingcrt"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg> Add to cart</button>`;

  shpCrt.setAttribute("id", "preview_shpcrt");
  cortina.appendChild(shpCrt);
}



// document.addEventListener("DOMContentLoaded", function(){
//   Swal.fire({
//     title: 'Welcome to my portfolio!',
//     html: `<br> Here you will find all my works, with the exception of some that are too much for the public eye... <br><br> My works are divided by year and subdivided into albums, you can access them from the sidebar <br><br><br> <strong>If you'd like to support me</strong> you can buy a print from me or buy me a "cafecito"<br>(link at the bottom of the page). <br><br> <strong>In case you would like to use my art</strong> for any purpose please contact me (links below) and I will give you permission <br> (I won't say no, I just want to know) `,
//     showClass: {
//       popup: 'animate__animated animate__fadeInDown'
//     },
//     hideClass: {
//       popup: 'animate__animated animate__fadeOutUp'
//     }
//   })
// })

// DOM variables
let asideContenedor = document.getElementsByTagName("aside");
let containerGaleria = document.querySelector("#galeria");
let sectionGaleria = document.querySelector("#titulo-container");
let showFavouritesBtn = document.getElementById("button_favourites");
const previewBox = document.querySelector(".preview-box");
const previewImg = previewBox.querySelector(".imageClass");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let cartNavBtn = document.querySelector(".nav_cart");
let contenedorPortfolio = document.querySelector("#contenedor_portfolio");


// Botones Aside
let show2020Btn = document.getElementById("show_button2020");
let show2021fromThatNightBtn = document.getElementById("2021_fromthatnight_btn");
let show2021firstOfTheYearBtn = document.getElementById("2021_firstoftheyear_btn");
let showDiciembreBtn = document.getElementById("^_^");
let showTigreBtn = document.getElementById("tigre");

// Array Favourites
const imageArrayFavourites = [];

// ^_^ imgs
loadFavImgs(`2022/^_^`, 1); loadFavImgs(`2022/^_^`,3 );loadFavImgs(`2022/^_^`, 2);loadFavImgs(`2022/^_^`, 4);loadFavImgs(`2022/^_^`, 5);loadFavImgs(`2022/^_^`, 8);loadFavImgs(`2022/^_^`, 11);loadFavImgs(`2022/^_^`, 13);loadFavImgs(`2022/^_^`, 41);loadFavImgs(`2022/^_^`, 26);loadFavImgs(`2022/^_^`, 31);loadFavImgs(`2022/^_^`, 40);

//Tigre imgs
loadFavImgs(`2022/tigre`,);

createFavImages(imageArrayFavourites);
createImageElements(imageArrayFavourites, showFavouritesBtn);

// Array 2020
const imageArray2020 = [];
loadImages(`2020`, imageArray2020, 37);
createImageElements(imageArray2020, show2020Btn);

// Array 2021 firstOfTheYear
const imageArray2021firstOfTheYear = [];
loadImages(`2021/firstoftheyear`, imageArray2021firstOfTheYear, 26);
createImageElements(imageArray2021firstOfTheYear, show2021firstOfTheYearBtn);

// Array 2021fromThatNight
const imageArray2021fromThatNight = [];
loadImages(`2021/fromthatnight`, imageArray2021fromThatNight, 30);
createImageElements(imageArray2021fromThatNight, show2021fromThatNightBtn);

// Array ^_^
const imageArray2022diciembre = [];
loadImages(`2022/^_^`, imageArray2022diciembre, 41);
createImageElements(imageArray2022diciembre, showDiciembreBtn);

// Array Tigre
const imageArrayTigre = [];
loadImages(`2022/tigre`, imageArrayTigre, 42);
createImageElements(imageArrayTigre, showTigreBtn);