function index(req, res) {
  res.json({
    message: "Welcome to Project1887!",
    documentation_url: "",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/colleges", description: "Shows all collges"},
      {method: "GET", path: "/api/colleges/:collegeId", description: "Shows college by ID"}
    ]
  });
}

module.exports.index = index;
