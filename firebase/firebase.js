  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCsnP_IoAoOInL6YOgCqyH4rlbgtw7kEZ0",
    authDomain: "restaurant-web-admin-b0fb8.firebaseapp.com",
    projectId: "restaurant-web-admin-b0fb8",
    storageBucket: "restaurant-web-admin-b0fb8.appspot.com",
    messagingSenderId: "766755536649",
    appId: "1:766755536649:web:22b86fcf72be1076691dd8"
    };

    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Retrieve and display data from Firestore
    const imagesRef = collection(db, "images");

    async function fetchAndDisplayData() {
      const querySnapshot = await getDocs(imagesRef);
      const foodItemsContainer = document.getElementById("food-container");

      
    
      querySnapshot.forEach((doc) => {
        const data = doc.data();
    
        const foodItem = document.createElement("div");
        foodItem.className = `food-item ${data.category.replace(" ", "")}`;
        console.log(data.category);
    
        const foodImg = document.createElement("div");
        foodImg.className = "food-img";
    
        const imgElement = document.createElement("img");
        imgElement.src = data.imageUrl;
        imgElement.alt = "food image";
    
        imgElement.addEventListener("click", () => {
          showEnlargedImage(data.imageUrl, data.title, data.description, data.price);
        });
    
        foodImg.appendChild(imgElement);
    
        const foodContent = document.createElement("div");
        foodContent.className = "food-content";
    
        const foodName = document.createElement("h2");
        foodName.className = "food-name";
        foodName.textContent = data.title;
    
        const line = document.createElement("div");
        line.className = "line";
    
        const foodPrice = document.createElement("h3");
        foodPrice.className = "food-price";
        foodPrice.textContent = `$ ${data.price}`;
    
        const description = document.createElement("div");
        description.textContent = `Ingredients ${data.description}`;
        description.style.fontWeight = "bold";
        description.style.fontSize = "10px";
        description.style.color = "#333";
    
        const category = document.createElement("p");
        category.className = "category";
        category.innerHTML = `Category: <span>${data.category}</span>`;
    
        foodContent.appendChild(foodName);
        foodContent.appendChild(line);
        foodContent.appendChild(foodPrice);
        foodContent.appendChild(description);
        foodContent.appendChild(category);
        foodItem.appendChild(foodImg);
        foodItem.appendChild(foodContent);
        foodItemsContainer.appendChild(foodItem);


      });
    
      const menuBtns = document.querySelectorAll(".menu-btn");
      const foodItems = document.querySelectorAll(".food-item");
      let activeBtn = "allItems";
    
      showFoodMenu(activeBtn);
    
      menuBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          resetActiveBtn();
          showFoodMenu(btn.id);
          btn.classList.add("active-btn");
        });
      });
    
      function resetActiveBtn() {
        menuBtns.forEach((btn) => {
          btn.classList.remove("active-btn");
        });
      }
    
      function showFoodMenu(newMenuBtn) {
        activeBtn = newMenuBtn;
        foodItems.forEach((item) => {
          if (activeBtn === "allItems") {
            item.style.display = "grid";
          } else if (item.classList.contains(activeBtn)) {
            item.style.display = "grid";
          } else {
            item.style.display = "none";
          }
        });
      }
    }
    
    fetchAndDisplayData();


    // Pass the additional arguments 'foodName', 'description', and 'price' to the showEnlargedImage function
function showEnlargedImage(imageUrl, foodName, description, price) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.className = "close-btn";

  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  const enlargedImg = document.createElement("img");
  enlargedImg.src = imageUrl;

  // Create elements to display foodName, description, and price
  const foodNameElement = document.createElement("h2");
  foodNameElement.textContent = foodName;
  foodNameElement.style.color = " #ff9505";

  const descriptionElement = document.createElement("div");
  descriptionElement.textContent = `Ingredients: ${description}`;

  const priceElement = document.createElement("h3");
  priceElement.textContent = `$ ${price}`;

  // Add the elements to the imageContainer
  imageContainer.appendChild(closeBtn); 
  imageContainer.appendChild(enlargedImg);
  imageContainer.appendChild(foodNameElement);
  imageContainer.appendChild(descriptionElement);
  imageContainer.appendChild(priceElement);
// Move the close button inside the image container

  overlay.appendChild(imageContainer);
  document.body.appendChild(overlay);

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
}


    //the below function is to trigger the animation on scoll
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Function to handle the scroll event and apply the fade-in effect
    function handleScroll() {
      const foodImages = document.querySelectorAll(".food-img img");
      foodImages.forEach((image) => {
        if (isInViewport(image)) {
          image.classList.add("fade-in");
        }
      });
    }
    
    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);








