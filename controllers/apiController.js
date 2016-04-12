function index(req, res) {
  res.json({
    message: "Welcome to Project1887!",
    documentation_url: "",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/colleges", description: "Shows all colleges"},
      {method: "GET", path: "/api/colleges/:collegeId", description: "Shows college by ID"},
      {method: "POST", path: "/api/colleges/:collegeId/alumni", description: "Creates college alumni by based on college ID"},
      {method: "PUT", path: "/api/colleges/:collegeId/alumni/:alumniId", description: "Updtes college alumni by colege ID"},
      {method: "DELETE", path: "/api/colleges/:collegeId/alumni/:alumniId", description: "Deletes college alumni by colege ID"}
    ]
  });
}

module.exports.index = index;
