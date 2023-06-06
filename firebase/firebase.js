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
        foodItem.className = `food-item ${data.category}`;
      
        const foodImg = document.createElement("div");
        foodImg.className = "food-img";
      
        const imgElement = document.createElement("img");
        imgElement.src = data.imageUrl;
        imgElement.alt = "food image";
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
        description.style.fontSize = "12px";
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
      
        // Find the container to append the food item
        const foodItemsContainer = document.querySelector(".food-items");
        foodItemsContainer.appendChild(foodItem);
      });
    
      // Menu sorting code
      const menuBtns = document.querySelectorAll('.menu-btn');
      const foodItems = document.querySelectorAll('.food-item');
      let activeBtn = "allItems";
    
      showFoodMenu(activeBtn);
    
      menuBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          resetActiveBtn();
          showFoodMenu(btn.id);
          btn.classList.add('active-btn');
        });
      });
    
      function resetActiveBtn() {
        menuBtns.forEach((btn) => {
          btn.classList.remove('active-btn');
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










