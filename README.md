**The University of Melbourne**

# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

We have added to this repository a `README.md`, `.gitignore`, and `.gitattributes`.

* **README.md**: is the document you are currently reading. It should be replaced with information about your project, and instructions on how to use your code in someone else's local computer.

* **.gitignore**: lets you filter out files that should not be added to git. For example, Windows 10 and Mac OS create hidden system files (e.g., .DS_Store) that are local to your computer and should not be part of the repository. This files should be filtered by the `.gitignore` file. This initial `.gitignore` has  been created to filter local files when using MacOS and Node. Depending on your project make sure you update the `.gitignore` file.  More information about this can be found in this [link](https://www.atlassian.com/git/tutorials/saving-changes/gitignore).

* **.gitattributes**: configures the line ending of files, to ensure consistency across development environments. More information can be found in this [link](https://git-scm.com/docs/gitattributes).

Remember that _"this document"_ can use `different formats` to **highlight** important information. This is just an example of different formating tools available for you. For help with the format you can find a guide [here](https://docs.github.com/en/github/writing-on-github).

## Table of contents

* [Team Members](#team-members)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Current Status](#current-status)
* [Link with External & Accounts](#link-with-external--accounts)
* [API Testing](#api-testing)

## Team Members

| Name           | Student ID |             Task             | Status  |
| :------------- | :--------: | :--------------------------: | :-----: |
| Jiaqi Xu       |  1078417   |     Front End,UI Design      | Working |
| Shengzhao Yuan |   907760   |     Front End,UI Design      | Working |
| Yiwen Zhang    |  1002781   | Back End,Front End,UI Design | Working |
| Zening Zhang   |  1078374   |     Front End,UI Design      | Working |
| Haocheng Zhao  |  1029315   | Back End,Front End,UI Design | Working |

## General info

This is project is about designing and building web apps for Snacks in a Van, a new startup company operating in Melbourne. Snacks in a Van runs a fleet of food trucks that work as popup cafes.

## Technologies

Project is created with:

Sever side:

* NodeJs 14.16.X
* Express 4.17.1
* Bcryptjs  2.4.3
* Mongodb 3.6.5
* Mongoose 5.12.2
* Nodemon 2.0.7
* Cors 2.8.5
* Concurrently 6.0.2
* Jsonwebtoken 8.5.1

Client side:

* React 17.0.2
* Antd 4.15.2
* Axios 0.21.1
* Bootstrap 4.6.0
* Leaflet 1.7.1
* React-bootstrap 1.5.2
* React-dom 17.0.2
* React-leaflet 3.1.0
* React-router-dom 5.2.0
* React-scripts



# Current Status

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [x] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)





# Link with External & Accounts

**Test account for the website**

**Email**: test@qq.com

**Password**: 123456

P.S: You can create your own account

**The HerokuURL**:  https://info3005arabica.herokuapp.com/

**The MongoURL**:

"mongodb+srv://haoczhao:1234@info3005project.hnql6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

**Username**: haoczhao

**Password**: 1234

After accessing the database, there is a database called ***"myFirstDatabase"*** for storing all the collections data for this project. 

*The snacks on the menu are added manually to the database

**For extra dependency:** 
npm install bcryptjs (this is for encrypt the password for user and vendor)



# API Testing

We split the app server mockup into four parts, Snacks, Order, Vendor and User. The description on how to test is listed below. The test can be taken in the Postman.

### Snacks:

- **Get all the snacks in the menu**

  **Type**: GET

  **Heroku Address**:  https://info3005arabica.herokuapp.com/snack/menu

  **Sample output**:

  ![Heroku Getmenu](/Img/api/HerokugetMenu.png)

  

  **Address**:  http://localhost:8080/snack/menu

  **Sample output**:

  ![Getmenu](Img/api/getMenu.png)

  

- **Get the description of a particular snack in the menu**

  **Type**: GET

  **Heroku address**: https://info3005arabica.herokuapp.com/snack/menu/:snackID

  **Example**: https://info3005arabica.herokuapp.com/snack/menu/606eb430806a544760311bc2

  **Sample output**:

  ![Heroku Getdetails](Img/api/HerokugetDetails.png)

  

  **Address**: http://localhost:8080/snack/menu/:snackID

  **Example**: http://localhost:8080/snack/menu/606eb430806a544760311bc2

  **Sample output**:

  ![Getdetails](Img/api/getDetails.png)

  



### Order:

- **Create an order**

  **Type**: POST

  **Heroku address**: https://info3005arabica.herokuapp.com/order/create

  **Sample output**:

  ![Heroku CreateOrder](Img/api/HerokucreateOrder.png)

  

  **Address**: http://localhost:8080/order/create

  **Sample output**:

  ![CreateOrder](Img/api/createOrder.png)

  The id of the customer, vendor and snacks need to be written

  

  In the body part, the format is

  ```json
  {
      "user": <<UserID>>,
      "vendor": <<VendorID>>,
      "snacks": [{<<SnackName>>:Num}]
  }
  Example:
  {
      "user": "607d1e726538c330a4e68a86",
      "vendor": "607d1eb26538c330a4e68a87",
      "snacks": [{"Long Black":5},{"Big cake":2}]
  }
  ```

  

- **Get all the orders under a vendor or a customer**

  **Type**: GET

  **Heroku address**:  https://info3005arabica.herokuapp.com/order?vendor=vendorID 

  ​						or     https://info3005arabica.herokuapp.com/order?user=userID****

  **Example**: https://info3005arabica.herokuapp.com/order?vendor=60769e7636450e661844e2d5

  **Sample output**:

  ![Heroku Getorder](Img/api/HerokugetOrder.png)

  

  **Address**: http://localhost:8080/order?vendor=vendorID

  ​        or     http://localhost:8080/order?user=userID

  **Example**: http://localhost:8080/order/venodr=60769e7636450e661844e2d5

  **Sample output**:

  ![Getorder](Img/api/getOrder.png)

  

- **Update an order**

  **Type**: POST

  **Heroku address**: https://info3005arabica.herokuapp.com/order/update/:orderID

  **Example**: https://info3005arabica.herokuapp.com/order/update/607d1f436538c330a4e68a88

  **Sample output**:

  ![Heroku UpdateOrder](Img/api/HerokuupdateOrder.png)

  

  **Address**: http://localhost:8080/order/update/:orderID

  **Example**: http://localhost:8080/order/update/60783a8c01deab63a899eb38

  **Sample output**:

  ![Updateorder](Img/api/updateOrder.png)

  

  In the body part, the format is:

  ```json
  {
      "snacks":[{<<SnackName>>:Num}],
      "status": String
  }
  Example:
  {
      "snacks":[{"Long Black":2},{"Big cake":1}],
      "status":"fullfilled"
  }
  ```

  



### User

- **Register a new user**

  **Type**: POST

  **Heroku address**: https://info3005arabica.herokuapp.com/user/register

  **Sample output**:

  ![Heroku Createuser](Img/api/HerokucreateUser.png)

  

  **Address**: http://localhost:8080/user/register

  **Sample output**:

  ![Createuser](Img/api/createUser.png)

  

  In the body part, the format is:

  ```json
  {
      "givenName": String,
      "familyName": String,
      "email": String,
      "password": String
  }
  Example:
  {
      "givenName": "haocheng",
      "familyName": "zhao",
      "email":"haochengzhao@gmail.com",
      "password": "12345678910"
  }
  ```

  

### Vendor

- **Register a new vendor**

  **Type**: POST

  **Heroku address**: https://info3005arabica.herokuapp.com/vendor/register

  **Sample output**:

  ![Heroku Createvan](Img/api/HerokucreateVan.png)

  

  **Address**: http://localhost:8080/vendor/register

  **Sample Output**:

  ![Createvan](Img/api/createVan.png)

  

  In the body part, the format is:

  ```json
  {
      "name": String,
      "password": String
  }
  Example:
  {
      "name":"Peter Hall Vendor",
      "password":"135792468123"
  }
  ```

  

- **Update the status of a vendor**

  **Type**: POST

  **Heroku address**: https://info3005arabica.herokuapp.com/vendor/park/:vendorID

  **Example**: https://info3005arabica.herokuapp.com/vendor/park/607d1eb26538c330a4e68a87

  **Sample output**:

  ![Heroku Updatevan](Img/api/HerokuupdateVan.png)

  

  **Address**: http://localhost:8080/vendor/park/:vendorID

  **Example**: http://localhost:8080/vendor/park/607832319c8990096c28fd54

  **Sample output**:

  ![Updatevan](Img/api/updateVan.png)

  

  In the body part, the format is:

  ```json
  {
      "curAddress": String,
      "parked": Boolean,
      "location":[Num, Num]
  }
  Example:
  {
      "curAddress":"In Peter Hall lecture Room",
      "parked":true,
      "location":[100, 270]
  }
  ```

  

- **Get the five nearest vendor**

  **Type** : Get

  **Heroku Address**:  https://info3005arabica.herokuapp.com/vendor?lat=&lng=

  **Example**:  https://info3005arabica.herokuapp.com/vendor?lat=-37.7963&lng=144.9614

  **Sample Output**:

  ![Heroku Get Five](Img/api/HerokugetFive.png)

  

  **Address**:  http://localhost:8080/vendor?lat=&lng=

  **Example**: http://localhost:8080/vendor?lat=-37.7963&lng=144.9614

  **Sample Output**:

  ![Get five](Img/api/GetFive.png)

  