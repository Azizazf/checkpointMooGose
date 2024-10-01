const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const cors = require('cors'); // import cors
require('dotenv').config(); // import dotenv

mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('db success');
    })
    .catch((err) => {
        console.error('error db', err);
    });

const app = express();

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    favoriteFoods: [String]
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

// Async function to save a person
const savePerson = async () => {
    const person = new Person({
        name: "John",
        age: 30,
        favoriteFoods: ["Pizza", "Burger"]
    });

    try {
        const data = await person.save();
        console.log("Person saved!", data);
    } catch (err) {
        console.error(err);
    }
};

// Call savePerson function
savePerson();

// Async function to create multiple people
const createPeople = async () => {
    const arrayOfPeople = [
        { name: 'Mary', age: 25, favoriteFoods: ['Salad', 'Pizza'] },
        { name: 'Tom', age: 32, favoriteFoods: ['Pasta', 'Steak'] },
        { name: 'Sarah', age: 28, favoriteFoods: ['Ice Cream', 'Tacos'] },
    ];

    try {
        const people = await Person.create(arrayOfPeople);
        console.log("People created!", people);
    } catch (err) {
        console.error(err);
    }
};

// Call createPeople function
createPeople();

// Async function to find people by name
const findPersonByName = async (name) => {
    try {
        const people = await Person.find({ name });
        console.log("Person found", people);
    } catch (err) {
        console.error(err);
    }
};

// Find people with name 'Mary'
findPersonByName('Mary');

// Async function to find one person by favorite food
const findOneByFavoriteFood = async (food) => {
    try {
        const person = await Person.findOne({ favoriteFoods: food });
        console.log("Person found", person);
    } catch (err) {
        console.error(err);
    }
};

// Find person who likes Pizza
findOneByFavoriteFood('Pizza');

// Async function to find person by ID
const findPersonById = async (id) => {
    try {
        const person = await Person.findById(id);
        console.log("Person found by Id:", person);
    } catch (err) {
        console.error(err);
    }
};

// Replace 'your_person_id_here' with the actual ID
const personId = '66faafe91f18c7c352d7e4ba';
findPersonById(personId);

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
