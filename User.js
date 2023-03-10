const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  cit: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  createdAt: Date,
  updatedAt: { type: Date, default: new Date() },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`Hi, My name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};

userSchema.virtual('namedEmail').get(function () {
  return `${this.name} <${this.email}>`;
});

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  throw new Error('Fail Save');
});

userSchema.post('save', function (doc, next) {
  document.sayHi();
  next();
});
module.exports = mongoose.model('User', userSchema);

// Part 1
const userSchema1 = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: { type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: new Date(),
  }, // default: () => Date.now(),
  updatedAt: { type: Date, default: new Date() },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
});
