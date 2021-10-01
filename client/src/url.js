let URLs = {};

if(process.env.NODE_ENV === "production"){
    URLs = {
        baseURL: "/api",
        socketURL: "https://info3005arabica.herokuapp.com/api"
    }
}else{
    URLs = {
        baseURL: "http://localhost:8080/api",
        socketURL: "http://localhost:8080/api"
    }
}

export default URLs