/*********************************************************************************
 * WEB700 – Assignment 06
 * I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Robin Joseph Student ID: 126899210  Date: 10-04-22
 * Online (Heroku) Link: https://floating-fjord-47408.herokuapp.com/
 **********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const path = require("path");
const userMod = require("./modules/collegeData.js");
var bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  let route = req.path.substring(1);
  app.locals.activeRoute =
    "/" +
    (isNaN(route.split("/")[1])
      ? route.replace(/\/(?!.*)/, "")
      : route.replace(/\/(.*)/, ""));
  next();
});

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      navLink: function (url, options) {
        return (
          "<li" +
          (url == app.locals.activeRoute
            ? ' class="nav-item active" '
            : ' class="nav-item" ') +
          '><a class="nav-link" href="' +
          url +
          '">' +
          options.fn(this) +
          "</a></li>"
        );
      },
      equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      },
    },
  })
);
app.set("view engine", ".hbs");

app.get("/students", (req, res) => {
  if (req.query.course) {
    userMod
      .getStudentsByCourse(req.query.course)
      .then((student_num) => {
        res.render("students", {
          students: student_num,
        });
      })
      .catch((err) => {
        res.render("students", {
          message: "no results",
        });
      });
  } else {
    userMod
      .getAllStudents()
      .then((data1) => {
        //  if (data1.length > 0) {
        res.render("students", {
          students: data1,
        });
        //  }
      })
      .catch((err) => {
        res.render("students", {
          message: "no results",
        });
      });
  }
});

app.get("/students/:num", (req, res) => {
  userMod
    .getStudentByNum(req.params.num)
    .then((student) => {
      res.render("students", {
        students: student,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/student/:studentNum", (req, res) => {
  let viewData = {};
  data
    .getStudentByNum(req.params.studentNum)
    .then((data) => {
      if (data) {
        viewData.student = data;
      } else {
        viewData.student = null;
      }
    })
    .catch(() => {
      viewData.student = null;
    })
    .then(data.getCourses)
    .then((data) => {
      viewData.courses = data;

      for (let i = 0; i < viewData.courses.length; i++) {
        if (viewData.courses[i].courseId == viewData.student.course) {
          viewData.courses[i].selected = true;
        }
      }
    })
    .catch(() => {
      viewData.courses = [];
    })
    .then(() => {
      if (viewData.student == null) {
        res.status(404).send("Student Not Found");
      } else {
        res.render("student", { viewData: viewData });
      }
    });
});

app.get("/stud", (req, res) => {

    res.render("addStudent");

});

app.get("/students/add", (req, res) => {
//  userMod.getCourses().then((data2) => {
   // res.render("addStudent", { courses: data2 });
 // })

//.catch((err) => {
 // res.render("addStudent", { courses: [] });
  res.render("addStudent");
//});
});


app.post("/students/add", (req, res) => {
  userMod
    .addStudent(req.body)
    .then(() => {
      res.redirect("/students");
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.post("/student/update", (req, res) => {
  userMod
    .updateStudent(req.body)
    .then(() => {
      res.redirect("/students");
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.post("/student/delete/:studentNum", (req, res) => {
  userMod
    .deleteCourseById(req.body)
    .then(() => {
      res.redirect("/students");
    })
    .catch((err) => {
      res.status(500).send("Unable to Remove Student / Student not found");
    });
});

app.get("/courses", (req, res) => {
  userMod
    .getCourses()
    .then((data2) => {
      //    if (data2.length > 0) {
      res.render("courses", {
        courses: data2,
      });
      //   }
    })
    .catch((err) => {
      res.render("courses", { message: "no results" });
    });
});

app.get("/course/:id", (req, res) => {
  userMod
    .getCourseById(req.params.id)
    .then((courses) => {
     // if ((courses = undefined)) {
     //   res.status(404).send("Course Not Found");
     // } 
    //  else {
        res.render("course", {
          course: courses,
        });
  //    }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/courses/add", (req, res) => {
  res.render("addCourse");
});

app.post("/courses/add", (req, res) => {
  userMod
    .addCourse(req.body)
    .then(() => {
      res.redirect("/courses");
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.post("/course/update", (req, res) => {
  userMod
    .updateCourse(req.body)
    .then(() => {
      res.redirect("/courses");
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "no results" });
    });
});

app.get("/course/delete/:id", (req, res) => {
  userMod
    .deleteCourseById(req.params.id)
    .then(() => 
      res.redirect("/courses"))
    .catch((err) => {
      res.status(500).send("Unable to Remove Course / Course not found");
    });
});

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "/views/home.html"));
  res.render("home");
});

app.get("/about", (req, res) => {
  // res.sendFile(path.join(__dirname, "/views/about.html"));
  res.render("about");
});
app.get("/htmlDemo", (req, res) => {
  // res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
  res.render("htmlDemo");
});

app.get("/apple.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "images/apple.jpg"));
});
app.get("/netflix.png", (req, res) => {
  res.sendFile(path.join(__dirname, "images/netflix.png"));
});
app.get("/cisco.png", (req, res) => {
  res.sendFile(path.join(__dirname, "images/cisco.png"));
});
app.get("/atrend.png", (req, res) => {
  res.sendFile(path.join(__dirname, "images/atrend.png"));
});
app.get("/ntrend.png", (req, res) => {
  res.sendFile(path.join(__dirname, "images/ntrend.png"));
});
app.get("/ctrend.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "images/ctrend.jpg"));
});
app.get("/pepper.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "images/pepper.jpg"));
});
app.get("/burger.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "images/burger.jpg"));
});
app.get("/sand.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "images/sand.jpg"));
});
app.use((req, res) => {

  res.status(404).send("Page Not Found");
  
  });

userMod
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
