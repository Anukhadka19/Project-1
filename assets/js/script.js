(function ($) {

    
    const drinkContainer = $("#drinkMenu");
    const foodContainer = $("#foodMenu");

    // const drinkTypeEl = document.querySelector('#drink-type');
    // const mealInputEl = document.querySelector('#meal-input');
    // const drinkInputEl = document.querySelector('#drink-input');
    // const mealListEl = document.querySelector('#meal-list');
    // console.log(drinkInputEl);
    // const drinkNav = $("#drinkNav");
    const orderContainer = $("#order");




    // $(".navDrinkItem").each(function (index, element) {
    //     // console.log(element.text())
    //     const drinkName = $(element).text();
    //     console.log(drinkName)

    //     $("body").on("click", $(this), function (event) {
    //         event.preventDefault() 
    //         drinkContainer.empty()

    //         grabDrinkArray(drinkName)
    //     })
    // })
    // $(".card").each(function (index, element) {
    //     // console.log(element.text())
    //     const addToOrder = $(element).attr("data-name");
    //     console.log(addToOrder);



    // $("body").on("click", $(this), function (event) {
    //     event.preventDefault()
    //     console.log($(this));
    //     const menuItemToAdd = `<li class="orderItem">${addToOrder}</li>`
    //     orderContainer.append(menuItemToAdd);
        //     grabDrinkArray(drinkName)
    // })

//Meal selection function//
function selectMeal() {

    var mealSeclected = $("input[name=selector]:checked").val();
    console.log(mealselection);
}



// Need to make sure the 'category' passed in matches exactly one/any of the potential user inputs -- meaning the 'select' options should be exactly the same
function grabDrinkArray(drink) {
    const drinkFetchUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}&api_key=1`;
    fetch(drinkFetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.drinks);
            if (data) {
                let results = randomSixArray(data.drinks);
                for (let i = 0; i < 6; i++) {
                    // const drinkObject = {
                    //     name: `${results[i].strDrink}`,
                    //     imgUrl: `${results[i].strDrinkThumb}`
                    // }
                    // drinkArray.push(drinkObject);
                    let cardContainer = $("<div>");
                    cardContainer.addClass("card");
                    cardContainer.attr("data-name", results[i].strDrink);
                    let imageContainer = $("<div>");
                    imageContainer.addClass("card-image").html(`<img src="${results[i].strDrinkThumb}" alt="${results[i].strDrink}" class="responsive">`)

                    let contentContainer = $("<div>");
                    contentContainer.addClass("card-content").html(`<p class="title is-4">${results[i].strDrink}</p>`);
                    cardContainer.append(imageContainer).append(contentContainer);


                    const priceEl = $("<p>");
                    priceEl.addClass("subtitle is-6").text(createRandomPrice(8, 20));
                    const addBtnEl = $('<button>').text('Add').addClass('subtitle is-6 has-text-white p-1 addButton');
                    contentContainer.append(priceEl,addBtnEl);

                    drinkContainer.append(cardContainer);


                }


            }
        })
        // Will want to do more (eventually) than just logging the error message
        .catch(function (error) {
            console.log(error);
        })
}
grabDrinkArray("vodka");
grabFoodArray("vegetarian");
// Need to make sure the 'category' passed in matches exactly one/any of the potential user inputs -- meaning the 'select' options should be exactly the same
function grabFoodArray(category) {
    const mealFetchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}&api_key=1`;
    fetch(mealFetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                let results = randomSixArray(data.meals);
                for (let i = 0; i < 6; i++) {
                //     const mealObject = {
                //         name: `${results[i].strMeal}`,
                //         imgUrl: `${results[i].strMealThumb}`
                //     }
                //     mealArray.push(mealObject);
                
                let cardContainer = $("<div>");
                cardContainer.addClass("card");
                cardContainer.attr("data-name", results[i].strMeal);
                let imageContainer = $("<div>");
                imageContainer.addClass("card-image").html(`<img src="${results[i].strMealThumb}" alt="${results[i].strMeal}" class="responsive">`)

                let contentContainer = $("<div>");
                contentContainer.addClass("card-content").html(`<p class="title is-4">${results[i].strMeal}</p>`);
                cardContainer.append(imageContainer).append(contentContainer);


                const priceEl = $("<p>");
                priceEl.addClass("subtitle is-6").text(createRandomPrice(10, 30));
                const addBtnEl = $('<button>').text('Add').addClass('subtitle is-6 has-text-white p-1 addButton');
                contentContainer.append(priceEl,addBtnEl);

                foodContainer.append(cardContainer);

            }

                
            }
        })
        // Will want to do more (eventually) than just logging the error message
        .catch(function (error) {
            console.log(error.message);
        });
}


// Will return a dollar amount within the two numbers given (inclusive)
function createRandomPrice(minNum, maxNum) {
    return `Price: $${Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum}`;
}

// Takes in an array and builds an new array with six of the original arrays elements, chosen at random, but without repeating any
function randomSixArray(itemArray) {
    const sixArray = [];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * itemArray.length);
        sixArray.push(itemArray[randomIndex]);
        itemArray.splice(randomIndex, 1);
    }
    return sixArray;
}

// Updates local storage, and returns an array with instructions for updating an existing 'li'
function updateStorage (menuObject) {
    let needsNewLi = true;
    let newAmount;
    let newPrice;
    const storageArray = JSON.parse(localStorage.getItem("orderList"));
    if (!storageArray) {
        // If nothing in storage, creates an array with the object in its first index (0)
        localStorage.setItem("orderList", JSON.stringify([menuObject]));
    } else {
        let match = false;
        // Check to see (by its name) if the item already exists in the order; if so, update the two values, but do not push to array
        for (itemObj of storageArray) {
            if (menuObject.name === itemObj.name) {
                match = true;
                needsNewLi = false;
                newAmount = itemObj.units += menuObject.units;
                newPrice = itemObj.price += menuObject.price;
            }
        }
        // If it wasn't in there, just add to array
        if (!match) {
            storageArray.push(menuObject);
        }
        localStorage.setItem("orderList", JSON.stringify(storageArray));
    }
    return [needsNewLi, `x${newAmount}`, `$${newPrice}`];
}



// // Event lis on card to add to menu cart
$("main").on("click", ".addButton", function(event){
    //Show buttons
    document.getElementById('clearBtn').hidden = false;
    document.getElementById('orderBtn').hidden = false;

    //Grab values from card
    const card = event.target.parentElement.parentElement;
    const itemName = card.children[1].children[0].innerText;
    const price = card.children[1].children[1].innerText;

    const priceArray = price.split(" ")
    const priceOnly = priceArray[1];

    //Build object for storage; run the function on it
    const menuObject = {name: itemName, price: parseInt(priceOnly.slice(1)), units: 1};
    const storageResult = updateStorage(menuObject);

    if (!storageResult[0]) {
        //Select all existing list items
        const allLis = $('.orderItem');
        // Match name and update that list item (amount and price)
        for (listItem of allLis) {
            if (listItem.children[0].innerText === itemName) {
                listItem.children[1].firstChild.textContent = storageResult[2];
                listItem.children[1].children[0].innerText = storageResult[1];
            }
        }
    } else {
        const item = $('<li>').addClass("orderItem");
        const orderName = $('<p>').text(itemName).addClass("orderName");
        const orderPrice = $('<p>').text(priceOnly).addClass("orderPrice");
        const amount = $('<span>').text("x1").addClass("spanAmount");
        const button = $('<button>').text("Remove").addClass("remove-item-btn");
    
        orderPrice.append(amount);
    
        item.append(orderName, orderPrice, button);
        $("#order").append(item);
    }
})

}) (jQuery);