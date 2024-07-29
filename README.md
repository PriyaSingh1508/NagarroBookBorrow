# Library Management System

### Tech used for Frontend -> React with Material-UI

### Tech used for Backend -> DotNet Core & ORM Entity-Framework Core

### DataBase Used -> Microsoft SQL Server

## Steps to Run

1-> Install node modules inside React directory i.e ClientApp.

2-> Create a database as Name "BookDb" or update the connection string based upon your Database name.

3-> Run migrations in Business layer.

    Commands used

       ->add-migration migration_name

       ->update-database

## Assumptions

- Add New Book button should be shown on dashboard (Visible only to Logged in User)

- User name and Available tokens should be visible in the header

- For borrowing a book, user should have at least 1 token available

i.) Whenever a book is borrowed 1 token will be added to the user lending the

book and 1 token will be deducted from user borrowing the book

-> Only the Books that are available to Borrow are visible in the home page.

## Bonus Functionalities Added

- Return of the Borrowed Book

## Seeder

The Seedings

-> 4 Users are seeded

## Default User Credentials

-> 1 User

username: testuser@gmail.com

password: Test@123

-> 2 User

username: testuser1@gmail.com

password: Test@123

-> 3 User

username: testuser2@gmail.com

password: Test@123

-> 3 User

username: testuser3@gmail.com

password: Test@123
