(function ($) {

    const drinkType = ['vodka', 'rum', 'gin', 'whiskey'];
    const mealType = ['breakfast', 'vegetarian', 'seafood', 'dessert'];
    let cardsContainer = $("#drinkMenu");

    // const drinkTypeEl = document.querySelector('#drink-type');
    // const mealInputEl = document.querySelector('#meal-input');
    // const drinkInputEl = document.querySelector('#drink-input');
    // const mealListEl = document.querySelector('#meal-list');
    // console.log(drinkInputEl);
    const drinkNav = $("#drinkNav");
    const orderContainer = $("#order");




    // This function takes in an array of objects, looping through them and rendering a menu item for each
    function renderMenu(array) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let menuItem = $("<li>");
            menuItem.html(`<a class="navDrinkItem">${element}</a>`)
            drinkNav.append(menuItem);
        }


        // for (o of menuArray) {
        //     const subContain = $('<div>').addClass('subContain');
        //     const instanceImg = $('<img>').attr('src', o.imgUrl);
        //     const instanceName = $('<p>').text(o.name);
        //     subContain.append(instanceImg, instanceName);
        //     $('Container').append(subContain);
        // }
    };
    renderMenu(drinkType)

    $(".navDrinkItem").each(function (index, element) {
        // console.log(element.text())
        const drinkName = $(element).text();
        console.log(drinkName)

        $("body").on("click", $(this), function (event) {
            event.preventDefault() 
            cardsContainer.empty()

            grabDrinkArray(drinkName)
        })
    })
    $(".card").each(function (index, element) {
        // console.log(element.text())
        const addToOrder = $(element).attr("data-name");
        console.log(addToOrder);

        

        $("body").on("click", $(this), function (event) {
            event.preventDefault()
         console.log($(this));
            const menuItemToAdd = `<li class="orderItem">${addToOrder}</li>`
            orderContainer.append(menuItemToAdd);
        //     grabDrinkArray(drinkName)
         })
    })
    //Meal selection function//
    function selectMeal() {

        var mealSeclected = $("input[name=selector]:checked").val();
        console.log(mealselection);
    }

    // Submit event on the menu
    // menuEl.on('submit',handleMenuSubmit);

    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];

    // }

    // <li class="is-active"><a>Pictures</a></li>
    // <li><a>Music</a></li>
    // <li><a>Videos</a></li>
    // <li><a>Documents</a></li>



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
                    const drinkArray = []
                    let results = randomSixArray(data.drinks);
                    for (let i = 0; i < 6; i++) {
                        // const drinkObject = {
                        //     name: `${results[i].strDrink}`,
                        //     imgUrl: `${results[i].strDrinkThumb}`
                        // }
                        // drinkArray.push(drinkObject);
                        console.log(drinkArray);
                        let cardContainer = $("<div>");
                        cardContainer.addClass("card");
                        cardContainer.attr("data-name", results[i].strDrink);
                        let imageContainer = $("<div>");
                        imageContainer.addClass("card-image").html(`<img src="${results[i].strDrinkThumb}" alt="Pasta" class="responsive">`)

                        let contentContainer = $("<div>");
                        contentContainer.addClass("card-content").html(`<p class="title is-3">${results[i].strDrink}</p>`)
                        cardContainer.append(imageContainer).append(contentContainer)
                        cardsContainer.append(cardContainer)


                    }


                }
            })
            // Will want to do more (eventually) than just logging the error message
            .catch(function (error) {
                console.log(error);
            })
    }
    grabDrinkArray();
    // Need to make sure the 'category' passed in matches exactly one/any of the potential user inputs -- meaning the 'select' options should be exactly the same
    function grabFoodArray(category) {
        const mealFetchUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}&api_key=1`;
        fetch(mealFetchUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data) {
                    const mealArray = []
                    let results = randomSixArray(data.meals);
                    for (let i = 0; i < 6; i++) {
                        const mealObject = {
                            name: `${results[i].strMeal}`,
                            imgUrl: `${results[i].strMealThumb}`
                        }
                        mealArray.push(mealObject);
                    }
                    // The function that builds the elements based on this array goes here
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

})(jQuery);