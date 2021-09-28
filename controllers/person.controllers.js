const Person=require('../models/Person')

// add person
exports.addPerson=async(req,res)=>{
    try
    {const newPerson=new Person({...req.body})
    await newPerson.save()
    res.send({msg:'person added succ',newPerson})
}
    catch(err){
        res.status(400).send({msg:"could not add person",err})
    }
    
}

// get by name
exports.getByName=async(req,res)=>{
    try{
        const {name}=req.params
    const people=await Person.find({name})
    res.send({msg:`People having the name: ${name}`,people})}
    catch(err){
        res.status(400).send({msg:'person not found',err})
    }
 
 }

 // get by fav food
 exports.getByFavFood=async(req,res)=>{
    try{
        const {food}=req.params
        const person=await Person.findOne({ favouriteFood : { $in : [food ]}})
        res.send({msg:'person found succ:',person})

    }
    catch(err){
        res.status(400).send({msg:'not able to find person'})
    }
}

// get by id
exports.getById=async(req,res)=>{
    try{
        const {_id}=req.params
        const person=await Person.findById({_id})
        res.send({msg:'person found succ:',person})

    }
    catch(err){
        res.status(400).send({msg:'not able to find person'})
    }
}

// update person's fav food
exports.updateFavFood=async(req,res)=>{
    try {
        const {_id}=req.params
        const result=await Person.updateOne({_id},{$push:{favouriteFood:[...req.body.favouriteFood]}}) //it returns infos about the updated 
        res.send({ msg: "updated succ" ,result});                                                      //doc and the doc itself
    } catch (error) {
        res.status(400).send({msg:'could not update person',error})
        
    }
}

// find by name and update age
exports.findByNameAndUpdateAge=async(req,res)=>{
    try{
        const {name}=req.params
    const doc=await Person.findOneAndUpdate({name},{$set:{age:20}},{   //it returns the updated doc itself
        new: true
      })
    res.send({msg:`Updated succ`,doc})
}
    
    catch(err){
        res.status(400).send({msg:'could not update',err})
    }
 
 }

//  delete by id
exports.deleteById=async(req,res)=>{
    try{ const {_id}=req.params
     const personRemoved=await Person.findByIdAndRemove({_id})
     res.send({msg:'person removed successfully:',personRemoved})
 }
     catch(err){
         res.status(400).send({msg:'failed to delete',err})
     }
 }

//  delete by name
exports.deleteByName=async(req,res)=>{
    try{const {name}=req.params
    const peopleRemoved=await Person.deleteMany({name})
    res.send({msg:'people deleted succ:',peopleRemoved})}
    catch(err){
        res.status(400).send({msg:'failed to delete',err})
    }
 }

 // sort poeple who like "burritos" by name
 exports.sortPeople=async(req,res)=>{
    try {
        const poeple=await Person.find({ favouriteFood : { $in : ["burritos"]}}).limit(2).sort({name:1}).select("-age").exec()  
        res.send({msg:'result:',poeple})
    } catch (error) {
        res.status(400).send({msg:'result can not be found!'})
    }
}
