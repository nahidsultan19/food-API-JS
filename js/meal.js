const loadMeals = () => {
    const input = document.getElementById('input');
    const inputText = input.value;
    const error = document.getElementById('error')
    if (inputText == '') {
        error.innerText = 'plase insert your food name..'
        input.value = '';
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
            .then(responce => responce.json())
            .then(data => displayMeals(data.meals))

        input.value = '';
        error.innerText = '';
        meals.innerHTML = '';
    }


}

const displayMeals = meals => {
    console.log(meals);
    const mealsDiv = document.getElementById('meals');
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100 shadow">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            </div>
        </div>
        `;
        mealsDiv.appendChild(div);
    })

}

// meal detail
const loadMealDetails = (mealId) => {
    console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    // console.log(meal)
    const mealDetail = document.getElementById('meal-details')

    mealDetail.innerHTML = `
    <div class="card h-auto w-50 mx-auto shadow">
        <img src="${meal.strMealThumb}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <small>${meal.strCategory}</small>
            <p class="text-primary">${meal.strArea}</p>
            <hr>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go YouTube</a>
        </div>
    </div>
    `;

}
