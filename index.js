const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

const User = require('./models/users');

mongoose.connect('mongodb://127.0.0.1:27017/wilinetask');
main().catch(err => console.log('We have An Error Sir', err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wilinetask');
  console.log('MongoDB OPEN');
}



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cors());



app.get('/', async(req, res) => {
    res.render('users/home')
})


app.get('/home', async(req, res) => {
    res.render('users/home')
})


app.get('/users', async (req, res) => {
   const users = await User.find({})
   res.render('users/index', {users})
})

app.get('/users/new', async(req, res) => {
    res.render('users/new')
})


app.post('/users', async(req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect(`/users/${newUser._id}`)
})


app.get('/users/:id', async(req, res) => {
    const {id} = req.params;
    const user = await User.findById(id); 
    res.render('users/details', {user})
})


app.get('/users/:id/edit', async(req, res) => {
    const {id} = req.params;
    const user = await User.findById(id); 
    res.render('users/edit', {user});
})

app.put('/users/:id', async(req, res) => {
   const {id} = req.params;
   const user = await User.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
   res.redirect(`/users/${user._id}`);
})


app.delete('/users/:id', async(req, res) => {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.redirect('/users')
})


app.listen(3000, () => {
    console.log("Welcome to the port 3000 sir");
})