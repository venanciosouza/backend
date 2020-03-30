var mongoose = require("mongoose");

mongoose.connect("mongodb://music:asdf1234@ds019980.mlab.com:19980/music", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
