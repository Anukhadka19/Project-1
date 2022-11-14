# The Boozy Chef
#### A mock-up of a sample food ordering service, with a randomness twist

By Anu Khadka, Tyler Reimer, Tyler Powers


## Description

This website displays an interactive and user friendly platform from which the user can browse items from a randomly rolled food and beverage menu. Their order selection is recorded into the digital cart based on which items and the amount selected. It will then tell the user the total cost of their order to allow for a simple and easy checkout experience.


## Installation

N/A


## Usage

Display the menu on Main page by category. Each time a category is selected, a menu of six items is created randomly from an API data set. Prices, within a certain range, are randomly created and assigned to each menu item.
User selects items from the menu to put into the virtual shopping cart that contains the net order. 
(Items can also be removed from the current working order)
When finished selecting items, they’ll have the option of submitting an order or canceling it.
When the user hits submit, a modal appears asking to confirm the order.
Once confirmed, a new page is displayed with the order and its total price.
From the confirmation screen they can navigate back to the main menu.


Screenshot(s):
![Pre menu load](/assets/images/pre-menu-load.png?raw=true "Main page prior to user action")
![Full loaded menu top](/assets/images/full-menu-and-order-top.png?raw=true "Main page after menu load; sticky footer")
![Full loaded menu bottom](/assets/images/full-menu-and-order-sticky.png?raw=true "Main page after menu load; sticky order")
![Confirmed page](/assets/images/confirmed-order.png?raw=true "Confirmed order page")

Link to live site: https://anukhadka19.github.io/food-drinks-ordering-service/


## Flaws/Comments
We got to MVP, however left out one intuitive piece -- that being a summed up price for the total order. It's on the confirmed order screen, but isn't anywhere prior to that. A couple other small things: the screen doesn't jump down to the food menu when it is loaded (the user will have to scroll down; a bit of a UX blunder), and there are a few classes which do not follow correct class-naming syntax.


## APIs Used

Choose meal by category:
https://www.themealdb.com/api.php

Choose drink by category:
https://www.thecocktaildb.com/api.php


## Credits

#### Bulma
#### JQuery
#### Google Fonts


## Collaborators

#### Tyler Powers -- Design, styling and responsiveness
#### Anu Khadka -- Repo manager; event listeners / DOM elements creation
#### Tyler Reimer -- Fetching / transferring / storing data and function writer


## License

