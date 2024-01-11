const Sequelize = require("sequelize");
var sequelize = new Sequelize(
  "d9f6a45qqnr1e4",
  "jrsnfcffcqafvu",
  "374a2bc434997804633679d449649ac3724712a844e088885621cc34be3a0c3b",
  {
    host: "ec2-52-73-155-171.compute-1.amazonaws.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

function initialize() {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

var Student = sequelize.define(
  "Student",
  {
    studentNum: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING,
    course: Sequelize.INTEGER,
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

var Course = sequelize.define(
  "Course",
  {
    courseId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING,
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

//Course.hasMany(Student, { foreignKey: "course" });

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}
var dataCollection = null;
var data1 = [];
var data2 = [];

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getAllStudents = function () {
  return new Promise((resolve, reject) => {
    Student.findAll({
      attributes: [
        "studentNum",
        "firstName",
        "lastName",
        "email",
        "addressStreet",
        "addressCity",
        "addressProvince",
        "TA",
        "status",
      ],
    })
      .then((students) => {
        resolve(students);
      })
      .catch((err) => reject("No results returned"));
  });
};

module.exports.getTAs = function () {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getStudentsByCourse = function (coursetosearch) {
  return new Promise((resolve, reject) => {
    Student.findAll({
      attributes: [
        "studentNum",
        "firstName",
        "lastName",
        "email",
        "addressStreet",
        "addressCity",
        "addressProvince",
        "status",
        "course",
      ],
      where: {
        course: coursetosearch,
      },
    })
      .then((students) => {
        resolve(students);
      })
      .catch((err) => reject("No results returned"));
  });
};

module.exports.getStudentByNum = function (numtosearch) {
  return new Promise((resolve, reject) => {
    Student.findAll({
      attributes: [
        "studentNum",
        "firstName",
        "lastName",
        "email",
        "addressStreet",
        "addressCity",
        "addressProvince",
        "TA",
        "status",
      ],
      where: {
        num: numtosearch,
      },
    })
      .then((students) => {
        resolve(students);
      })
      .catch((err) => reject("No results returned"));
  });
};

module.exports.addStudent = function (studentData) {
  return new Promise((resolve, reject) => {
    //studentData.TA = studentData.TA ? true : false;
    // for (const firstName in dataCollection.students) {
    //   if ((studentData.firstName = "")) {
    //     studentData.firstName = null;
    //   }
    // }
    // for (const lastName in dataCollection.students) {
    //   if ((studentData.lastName = "")) {
    //     studentData.lastName = null;
    //   }
    // }
    // for (const email in dataCollection.students) {
    //   if ((studentData.email = "")) {
    //     studentData.email = null;
    //   }
    // }
    // for (const addressStreet in dataCollection.students) {
    //   if ((studentData.addressStreet = "")) {
    //     studentData.addressStreet = null;
    //   }
    // }
    // for (const addressCity in dataCollection.students) {
    //   if ((studentData.addressCity = "")) {
    //     studentData.addressCity = null;
    //   }
    // }
    // for (const addressProvince in dataCollection.students) {
    //   if ((studentData.addressProvince = "")) {
    //     studentData.addressProvince = null;
    //   }
    // }
    // for (const status in dataCollection.students) {
    //   if ((studentData.status = "")) {
    //     studentData.status = null;
    //   }
    // }

    Student.create(studentData)
      .then((newStudent) => {
        resolve(newStudent);
      })
      .catch((err) => reject("Unable to create student"));
  });
};

module.exports.updateStudent = function (StudentData) {
  return new Promise((resolve, reject) => {
   
    StudentData.TA = StudentData.TA ? true : false;
    // for (const firstName in dataCollection.students) {
    //   if ((StudentData.firstName = "")) {
    //     StudentData.firstName = null;
    //   }
    // }
    // for (const lastName in dataCollection.students) {
    //   if ((StudentData.lastName = "")) {
    //     StudentData.lastName = null;
    //   }
    // }
    // for (const email in dataCollection.students) {
    //   if ((StudentData.email = "")) {
    //     StudentData.email = null;
    //   }
    // }
    // for (const addressStreet in dataCollection.students) {
    //   if ((StudentData.addressStreet = "")) {
    //     StudentData.addressStreet = null;
    //   }
    // }
    // for (const addressCity in dataCollection.students) {
    //   if ((StudentData.addressCity = "")) {
    //     StudentData.addressCity = null;
    //   }
    // }
    // for (const addressProvince in dataCollection.students) {
    //   if ((StudentData.addressProvince = "")) {
    //     StudentData.addressProvince = null;
    //   }
    // }
    // for (const status in dataCollection.students) {
    //   if ((StudentData.status = "")) {
    //     StudentData.status = null;
    //   }
    // }

    Student.update(StudentData, {
      where: {
        studentNum: StudentData.studentNum,
      },
    })
      .then(() => {
        resolve("Student" + StudentData.studentNum + "updated");
      })
      .catch((err) => reject("Unable to update student"));
  });
};

module.exports.deleteStudentByNum = function (studentNum) {
  return new Promise((resolve, reject) => {
    Student.destroy({
      where: {
        id: studentNum,
      },
    })
      .then(() => {
        resolve("Student" + id + "successfully deleted");
      })
      .catch((err) => reject("Cannot delete"));
  });
};

module.exports.getCourses = function () {
  return new Promise((resolve, reject) => {
    Course.findAll({
      attributes: ["courseId", "courseCode", "courseDescription"],
    })
      .then((courses) => {
        resolve(courses);
      })
      .catch((err) => reject("No results returned"));
  });
};

module.exports.addCourse = function (courseData) {
  return new Promise((resolve, reject) => {
    // for (const courseCode in dataCollection.courses) {
    //   if ((courseData.courseCode = "")) {
    //     courseData.courseCode = null;
    //   }
    // }
    // for (const courseDescription in dataCollection.courses) {
    //   if ((courseData.courseDescription = "")) {
    //     courseData.courseDescription = null;
    //   }
    // }

    Course.create(courseData)
      .then((newCourse) => {
        resolve(newCourse);
      })
      .catch((err) => reject("Unable to create course"));
  });
};

module.exports.getCourseById = function (id) {
  return new Promise((resolve, reject) => {
    Course.findAll({
      //attributes: ["courseId", "courseCode", "courseDescription"],
      where: {
        courseId: id,
      },
    })
      .then((courses) => {
        resolve(courses[0]);
      })
      .catch((err) => reject("No results returned"));
  });
};

module.exports.updateCourse = function (courseData) {
  return new Promise((resolve, reject) => {
    courseData.TA = courseData.TA ? true : false;
    // for (const courseId in dataCollection.courses) {
    //   if ((courseData.courseId = "")) {
    //     courseData.courseId = null;
    //   }
    // }
    // for (const courseCode in dataCollection.courses) {
    //   if ((courseData.courseCode = "")) {
    //     courseData.courseCode = null;
    //   }
    // }
    // for (const courseDescription in dataCollection.courses) {
    //   if ((courseData.courseDescription = "")) {
    //     courseData.courseDescription = null;
    //   }
    // }


    Course.update(courseData, {
      where: {
        courseId: courseData.courseId,
      },
    })
      .then(() => {
        resolve("Course" + courseData.courseId + "updated");
      })
      .catch((err) => reject("unable to update course"));
  });
};

module.exports.deleteCourseById = function (courseId) {
  return new Promise((resolve, reject) => {
    Course.destroy({
      where: {
       courseId,
      },
    })
      .then((course) => {
        resolve("Course" + courseId + "successfully deleted");
      })
      .catch((err) => reject("Cannot delete"));
  });
};
