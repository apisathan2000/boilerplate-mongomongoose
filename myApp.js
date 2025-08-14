require("dotenv").config();
const PersonModel = require("./PersonSchema.js");
const mongoose = require("mongoose");

const connectDB = async function (uri) {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB !", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB(process.env.MONGO_URI);

let Person;
Person = PersonModel;

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Wick",
    age: 25,
    favoriteFoods: ["Pizza", "Burger", "Sandwich"],
  });

  person.save(function (err, data) {
    return err ? done(err) : done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    return err ? done(err) : done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  const person = Person.find({ name: personName }, function (err, data) {
    return err ? done(err) : done(null, data);
  });
};

const findOneByFood = (food, done) => {
  const person = Person.findOne({ favoriteFoods: food }, function (err, data) {
    return err ? done(err) : done(null, data);
  });
};

const findPersonById = (personId, done) => {
  const person = Person.findById(personId, function (err, data) {
    return err ? done(err) : done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  const person = Person.findById(personId, function (err, data) {
    if (err) {
      return done(err);
    } else if (data) {
      data.favoriteFoods.push(foodToAdd);
      console.log(data);

      data.save(function (err, data) {
        return err ? done(err) : done(null, data);
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  const person = Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      return err ? done(err) : done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    return err ? done(err) : done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, data) {
    return err ? done(err) : done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  const people = Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select('-age')
    .exec(function (err, data) {
      return err ? done(err) : done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
