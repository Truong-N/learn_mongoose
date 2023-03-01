const mongoose = require('mongoose');
const { where } = require('./User');
const User = require('./User');

mongoose.connect('mongodb://localhost/testdb');

findOne_2('Sally');

async function findOne_2(userName) {
  try {
    const user = await User.findOne({ name: userName }).populate('bestFriend');

    console.log(user);
    await user.save();
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}
//
async function findOne_1(userName) {
  try {
    const user = await User.findOne({ name: userName }).populate('bestFriend');

    console.log(user);
    user.sayHi();
    console.log(user.namedEmail);
  } catch (e) {
    console.log(e.message);
  }
}

async function find_byName(userName) {
  try {
    const user = await User.find().byName(userName).populate('bestFriend');

    console.log(user);
    user[0].sayHi();
  } catch (e) {
    console.log(e.message);
  }
}

async function findByName(userName) {
  try {
    const user = await User.findByName(userName).populate('bestFriend');

    console.log(user);
    user[0].sayHi();
  } catch (e) {
    console.log(e.message);
  }
}
//
async function whereGt(userName) {
  try {
    const user = await User.where('age')
      .gt(12)
      .where('name')
      .equals(userName)
      .populate('bestFriend')
      .limit(1);

    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}
// part 7
async function whereName(userName) {
  try {
    const user = await User.where('name').equals(userName);

    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

// Part 6
async function deleteOne() {
  try {
    const user = await User.deleteOne({ name: 'Sally' });
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

// Part 5
async function count(userName) {
  try {
    const user = await User.count({ name: userName });
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

// Part 4
async function findOne(userName) {
  try {
    const user = await User.findOne({ name: userName });
    console.log(user);
    const user2 = await User.exists({ name: userName });
    console.log('user: ', user);
    user.sayHi();
  } catch (e) {
    console.log(e.message);
  }
}

// Part 3
async function find(userName) {
  try {
    const user = await User.find({ name: userName });
    console.log(user);
    user[0].sayHi();
  } catch (e) {
    console.log(e.message);
  }
}

// Part 2

async function run2() {
  try {
    const user = await User.create({
      name: 'Kyle',
      age: 26,
      email: 'test@example.com',
      hobbies: ['Weight Lifting', 'Bowling'],
      address: {
        street: 'Main St.',
      },
    });
    user.name = 'Sally';
    await user.save();
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

// part 1
async function run1() {
  const user = new User({
    name: 'Kyle',
    age: 26,
    hobbies: ['Weight Lifting', 'Bowling'],
    address: {
      street: 'Maint St.',
    },
  });
  user.save();
  console.log(user);
}
