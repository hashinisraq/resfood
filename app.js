const searchFood = () => {
  const searchField = document.getElementById("foodInput");
  if (searchField.value === "") {
    const element = document.getElementById("notFoundText");
    element.innerText = `Please enter a valid keyword\nTry Again!`;
    document.getElementById("foodItems").innerHTML = "";
    document.getElementById("foodDetails").innerHTML = "";
  } else {
    document.getElementById("notFoundText").innerText = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayFood(data.meals));
  }
};

const displayFood = (foods) => {
  if (foods === null) {
    const element = document.getElementById("notFoundText");
    element.innerText = `No Food Found\nTry Again!`;
    document.getElementById("foodItems").innerHTML = "";
    document.getElementById("foodDetails").innerHTML = "";
  } else {
    const foodContainer = document.getElementById("foodItems");
    foodContainer.innerHTML = "";
    foods.forEach((food) => {
      const foodDiv = document.createElement("div");
      foodDiv.className = "col-sm-12 col-md-4 col-lg-3";
      const foodInfo = `
            <div class="card my-2" style="width: 18rem;" onclick="showDetails('${food.idMeal}')">  
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body text-center">
                    <h5>${food.strMeal}</h5>
                </div>
            </div>
            `;
      foodDiv.innerHTML = foodInfo;
      foodContainer.appendChild(foodDiv);
    });
  }
  document.getElementById("foodInput").value = "";
};


const showDetails = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayDetails(data.meals[0]));
}

const displayDetails = (food) => {
    console.log(food);
    const foodDetails = document.getElementById("foodDetails");
    foodDetails.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold">${food.strMeal}</h5>
                <div class="text-start">
                    <h6 class="card-text fw-bold">Ingredients</h6>
                    <ul>
                        <li>${food.strIngredient1}</li>
                        <li>${food.strIngredient2}</li>
                        <li>${food.strIngredient3}</li>
                        <li>${food.strIngredient4}</li>
                        <li>${food.strIngredient5}</li>
                    </ul>
                </div>
                <a href="${food.strYoutube}" class="btn btn-danger">Watch Video</a>
            </div>
        </div>
    `;
}