const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const Apply = require("./models/apply");
const Hire = require("./models/hire");
const app = express();

require("./db/conn");

const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const templete_path = path.join(__dirname,"../templetes/views");

app.use(express.json());
app.use(urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs" );
app.set("views",templete_path);

app.get("/",(req,res) => {
    res.render("index")
});

app.get("/register", (req , res) => {
    res.render("register");
});
app.get("/login", (req , res) => {
    res.render("login");
});
app.get("/apply", (req,res) => {
    res.render("apply");
});
app.get("/hire", (req,res) => {
    res.render("hire");
});
app.get("/end",(req,res) => {
    res.render("homepage1");
});
//Create a new user in our DATABASE
app.post("/register",async (req , res) => {
    try {
       const password = req.body.password;
       const cpassword = req.body.pswrepeat;

       if (password === cpassword)
       {
           const registerEmployee = new Register ({
                   name: req.body.name,
                   email: req.body.email,
                   mobile: req.body.mobile,
                   adhaar: req.body.adhaar,
                   password: req.body.password,
                   pswrepeat: req.body.pswrepeat
                })
               const registered = await registerEmployee.save();
               res.status(201).render("homepage1");
       }
       else {
           res.send("password are not matching")
       }

    } catch(error){
        res.status(400).send(error);
    }
});
//LOGIN CHECK
app.post("/login", async (req , res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        

        const useremail = await Register.findOne({email:email});
        

        if(useremail.password === password){
            res.status(201).render("homepage1");
        }
        else {
            res.send("Wrong Credentials")
        }

    } catch {
        res.status(400).send("Invalid E-mail")
    }
});
//APPLICATION
app.post("/apply", async (req,res) => {
    try {
        const employeeApplication = new Apply ({
            name: req.body.name,
            date: req.body.date,
            mobile: req.body.mobile,
            address: req.body.address,
            adhaar: req.body.adhaar,
            jobprofile: req.body.jobprofile,
            salary: req.body.salary
        })
        const applied = await employeeApplication.save();
               res.status(201).render("endpage");

    } catch{
        res.status(400).send("Try Again Later")
    }
});

//Recruitment Form
app.post("/hire", async (req,res) => {
    try {
        const employeeRecruitment = new Hire ({
            name: req.body.name,
            jobprofile: req.body.jobprofile,
            workernumber: req.body.workernumber,
            salary: req.body.salary,
            experience: req.body.experience,
            mobile: req.body.mobile,
            address: req.body.address,
            adhaar: req.body.adhaar
        })
        const recruit = await employeeRecruitment.save();
               res.status(201).render("endpage");

    } catch{
        res.status(400).send("Try Again Later")
    }
});

app.listen(port, () => {
    console.log(`Server is running on port no ${port}`);
})

