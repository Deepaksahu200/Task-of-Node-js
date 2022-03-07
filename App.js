const express = require("express");
const port = 3004;
const mysql = require("./connection").con

const app = express();
//configuration
app.set("view engine" , "hbs");
app.set("views" , "./view" );
app.use(express.static(__dirname + "/public"))

// app.use(express.urlencoded())
// app.use(express.json())

//routing
app.get("/" , (req , res)=>{
    res.render("index")
});

app.get("/add" , (req , res)=>{
    res.render("add")
});

app.get("/search" , (req , res)=>{
    res.render("search")
});

app.get("/update" , (req , res)=>{
    res.render("update")
});

app.get("/delete" , (req , res)=>{
    res.render("delete")
});


app.get("/view" , (req , res)=>{
    let qry="select * from data";
    mysql.query(qry, (err , results)=>{
        if(err) throw err;
        else{
            res.render("view" , {data : results});
        }
    })
});


app.get("/addstudent" , (req , res)=>{
    //fetching data from form
    const {Name, Phone, Email , Gender} = req.query

    let qry="select * from data where email=? or phone_no=?";
    mysql.query(qry,[Email , Phone] , (err,results)=>{
        if(err){
            throw err;
        }
        else{
            
            if(results.length > 0){
                res.render("add", {checkmesg : true})
            }else{
                let qry2="insert into data values(?,?,?,?)";
                mysql.query(qry2, [Name,Phone,Email,Gender], (err,results)=>{
                    if(results.affectedRows>0){
                        res.render("add",{mesg : true})
                    }
                })
            }

        }
        })

})

app.get("/searchstudent", (req , res)=>{
    const {Phone} = req.query;

    let qry="select * from data where phone_no=?";
    mysql.query(qry, [Phone] , (err,results)=>{
        if(err) throw err;

        else{
            if(results.length> 0){
                res.render("search" , {mesg1 : true , mesg2 : false})
             }
             else{
                 res.render("search" , {mesg1 : false , mesg2 : true})
             }
        }
    })
})

app.get("/findtoupdate" , (req , res)=>{
    const {Phone} = req.query;

    let qry="select * from data where phone_no=?";
    mysql.query(qry, [Phone] , (err,results)=>{
        if(err) throw err;

        else{
            if(results.length> 0){
                res.render("update" , {mesg1 : true , mesg2 : false ,data : results})
             }
             else{
                 res.render("update" , {mesg1 : false , mesg2 : true})
             }
        }
    })
})

app.get("/updatestudent" , (req , res)=>{
    const {Name , Phone , Gender } = req.query;
    let qry="update data set name=? , gender=?  where phone_no=?";

    mysql.query(qry, [Name , Phone , Gender], (err,results)=>{
        if(err) throw err
        else{
        if(results.affectedRows>0){
            res.render("update" ,{umesg : true})
        }
        }
    })
})

app.get("/removestudent" ,(req, res)=>{
    const {Phone} = req.query;

    let qry="delete from data where phone_no=?";
    mysql.query(qry, [Phone] , (err,results)=>{
        if(err) throw err

        else{
            if(results.affectedRows > 0){
                res.render("delete" , {mesg1 : true , mesg2 : false})
             }
             else{
                 res.render("delete" , {mesg1 : false , mesg2 : true})
             }
        }
    })
})
//create Server
app.listen(port , (err)=>{
    if(err){
        throw err;
    }
    else
    console.log("server is running at port %d:",port);
});