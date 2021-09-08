# PHP_MVC_OO_JQuery
Web application made on 1st year of higher education training cycle of DAW (Web Application Development)

## Preview
The next images are a sample of how the application looks like.

### Home
![Preview home](https://user-images.githubusercontent.com/76181286/122332034-14423900-cf36-11eb-9d3f-a24ebdc66127.png)
![Preview home](https://user-images.githubusercontent.com/76181286/122331143-a47f7e80-cf34-11eb-89e1-5856f56b0fc8.png)
![Preview home](https://user-images.githubusercontent.com/76181286/122331291-ddb7ee80-cf34-11eb-9615-c0eb90e32ef3.png)

### Menu
![Preview menu](https://user-images.githubusercontent.com/76181286/132520497-601f5b6d-16c0-47cc-8982-3fea40c2d08f.png)

![Preview menu_logged](https://user-images.githubusercontent.com/76181286/132520491-793fdb65-b063-44e3-94e1-277c3233a671.png)

### Shop
![Preview shop](https://user-images.githubusercontent.com/76181286/132520424-7771a1c5-0071-4d00-94c6-d6edcb52a37a.png)
![Preview shop_pag](https://user-images.githubusercontent.com/76181286/132520345-093f6ab9-03cf-4354-a143-fe05d42cd054.png)

### Product Details
![Preview details1](https://user-images.githubusercontent.com/76181286/132520293-785946d1-3907-45b3-b1d6-7474273a395d.png)
![Preview details2](https://user-images.githubusercontent.com/76181286/132520233-2b46b868-39eb-497d-9be7-079a06009c45.png)

### Login
![Preview Login](https://user-images.githubusercontent.com/76181286/132520143-b2f2762e-1a6e-458a-ad94-4e02be2713c2.png)

![Preview Register](https://user-images.githubusercontent.com/76181286/132519952-ad57e6a9-6c50-4a26-b0dd-a31693ca11a3.png)

### Cart
![Preview Cart](https://user-images.githubusercontent.com/76181286/122331147-a5181500-cf34-11eb-8cc4-7cec6b3a2d15.png)

### CRUD
![CRUD](https://user-images.githubusercontent.com/76181286/132522609-90a8085c-0aaf-45c6-be4a-9bf0a1f38435.png)

## Getting Started
To run this code you need to make docker-compose of the yml provided

## Prerequisites
* [Apache2](https://httpd.apache.org/)
* [MySQL](https://www.mysql.com/)
* [PHP](https://www.php.net/)
* [Docker](https://www.docker.com/)
* [Docker-compose](https://docs.docker.com/compose/)

## Installing
* You can installed by making docker compose up -d: [Documentation of Docker Compose](https://docs.docker.com/compose/)
* If you want to try this web application you can use my [database](https://github.com/SantiSL5/ANGULARJS_FW_PHP_MVC_OO/blob/master/backend/BBDD/BBDD.sql).

## Features
This application have the following modules.

Module | Description
:--- | :---
Home | Main page of the application where you can see two carrousels with the categories and the plataforms of the products.
Shop | Show all the videogames where you can use a filtering system by price slider, age recomended and genre.
Login | It allows you to register and login in the application, it sent you an email when you register with the form of the application and you can recover your password if you want to change it or you forget your password.
Cart | You can purchase items and manage your cart. The cart is saved in a table of the database. When you make the checkout the order it save the order lines in one table and the order in other table.
Search | This module is implemented in all the app where you can search for the name of the products.
Translate | This module is implemented in the headbar, it translates using JSON files. Languages: spanish, english and valencian.
CRUD | This module allows you to modify the database.

## Technologies

### Frontend
* [JS](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [JQuery](https://jquery.com/)
### Backend
* [PHP](https://www.php.net/)
### Database
* [MySQL](https://www.mysql.com/)

## APIs
* [Google Books API](https://developers.google.com/books)
* [Google Maps API](https://developers.google.com/maps/)

## Other technologies
* [Boostrap](https://getbootstrap.com/)
* [OWL Carousel](https://owlcarousel2.github.io/OwlCarousel2/)
* gravatar: [Gravatar](https://es.gravatar.com/)

