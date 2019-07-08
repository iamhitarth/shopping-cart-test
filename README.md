# Shopping Cart Test

This project is a very basic shopping cart app that consists of a C# .Net Core API (that serves up the products and shipping costs) and a React frontend that allows users to add products to a basket, remove them and then place an order to view a Thank You view.

To start the API at `https://localhost:5001`, navigate to the Git repo directory and execute `cd HitarthShoppingCartAPI/HitarthShoppingCartAPI && dotnet run` .

Then, to start the frontend, from the Git repo directory, execute `cd app && yarn start` and navigate to `http://localhost:3000` to use it.

I have decided to take a very primitive approach to keep things simple while avoiding premature optimization while still leaving room to easily split things up into smaller components and testable units later on. Also, decided not to use any state management library as the state isn't complex enough to require anything like that at this stage.
