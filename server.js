// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs")
const notesdb = require("./db/db.json")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Notes (DATA)
// =============================================================
app.get("/api/notes", function(req,res){
  return res.json(notesdb)
})

app.post("/api/notes", function(req,res){
  let newNote = req.body
  let notesList = notesdb
  let noteId = Date.now()
  newNote["id"] = noteId
  notesList.push(newNote)
  fs.writeFile("./db/db.json", JSON.stringify(notesList), function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("Note added.");
    })
  res.json(true)
})

// Routes
// =============================================================

//sends user to note page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
//sends user to homepage
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
