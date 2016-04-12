function index(req, res) {
  res.json({
    message: "Welcome to Project1887!",
    documentation_url: "",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/colleges", description: "Shows all colleges"},
      {method: "GET", path: "/api/colleges/:collegeId", description: "Shows college by ID"},
      {method: "GET", path: "/api/colleges/:collegeId/alumni", description: "Shows college by ID plus its alum"}
    ]
  });
}

module.exports.index = index;
