const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: false
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    completed: false
  }
];

const courseContainer = document.querySelector("#course-container");
const totalCredits = document.querySelector("#total-credits");
const filterButtons = document.querySelectorAll(".filter");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  courseList.forEach(course => {
    const courseCard = document.createElement("section");
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>${course.title}</p>
      <p>${course.credits} credits</p>
    `;

    courseContainer.appendChild(courseCard);
  });

  const credits = courseList.reduce((total, course) => total + course.credits, 0);
  totalCredits.textContent = `The total credits for course listed above is ${credits}`;
}

function setActiveButton(selectedButton) {
  filterButtons.forEach(button => button.classList.remove("active-filter"));
  selectedButton.classList.add("active-filter");
}

document.querySelector("#all").addEventListener("click", event => {
  displayCourses(courses);
  setActiveButton(event.target);
});

document.querySelector("#cse").addEventListener("click", event => {
  const cseCourses = courses.filter(course => course.subject === "CSE");
  displayCourses(cseCourses);
  setActiveButton(event.target);
});

document.querySelector("#wdd").addEventListener("click", event => {
  const wddCourses = courses.filter(course => course.subject === "WDD");
  displayCourses(wddCourses);
  setActiveButton(event.target);
});

displayCourses(courses);