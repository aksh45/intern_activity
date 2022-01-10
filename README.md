# URL SHORTNER

It is a simple url shortner API which allows you to create short urls both with custom short code and random short code, It also allows the user to get info about the short url like "created at date" , "actual url", "clicks" before simply redirecting to the actual url. 
## Steps To Run this API
1. clone this github repo

``` git clone https://github.com/aksh45/intern_activity```

2. if you want to use docker compose then use the below command

```cd intern_activity ```

``` docker-compose build```

``` docker-compose up ```

If you don't want to use dockerise version then simply modify the app.js and add your mongodb connection url and run below commands

``` cd intern_activity ```

``` npm i```

``` node app.js ```

3. After running the project you can open the postman collection available in intern_activity directory and test the API functionality.