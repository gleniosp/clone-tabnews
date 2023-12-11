function status(request, response) {
  response
    .status(200)
    .json({ key: "students from the course.dev are above average" });
}

export default status;
