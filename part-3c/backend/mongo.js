const mongoose = require("mongoose");

// if (procprocess.argv = [
//   '/usr/local/bin/node', // path to Node
//   '/path/to/script.js',  // path to the script
//   'myPassword'           // the argument you provided
// ];
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://pangjinheng58_db_user:${password}@cluster0.d3mehlj.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set(`strictQuery`, false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
