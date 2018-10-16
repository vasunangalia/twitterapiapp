
var express =   require("express"),
    app =       express();
    
var indexroutes = require("./routes/routes");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(indexroutes);

/// ************** 
// this is local host 

      app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
})
