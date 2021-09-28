const express=require('express')
const { findByIdAndRemove } = require('../models/Person')
const router=express.Router()
const {addPerson,getByName,
    getByFavFood,getById,updateFavFood,
    findByNameAndUpdateAge,deleteById,
    deleteByName,sortPeople}=require('../controllers/person.controllers')

// test
router.get('/test',(req,res)=>{
    res.send('hii')
})

//add person
router.post('/',addPerson)

// get by name
router.get('/personName/:name',getByName)

// get by fav food
router.get('/food/:food',getByFavFood)

// get by id
router.get('/personId/:_id',getById)

// Update person's fav food
router.put('/personId/:_id',updateFavFood)

// find by name and update age
router.put('/personName/:name',findByNameAndUpdateAge)

//  delete person by ID
router.delete('/personId/:_id',deleteById)

// delete the poeple with the name Mary
router.delete('/personName/:name',deleteByName)

// sort poeple who like "burritos" by name
router.get('/sort',sortPeople)

module.exports=router