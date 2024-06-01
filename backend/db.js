


const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/gofood";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true
    });
    
    console.log("Connected to MongoDB successfully");
    
   
    
    const collection = mongoose.connection.db.collection("food_items");
    const data = await collection.find({}).toArray();
    const foodCategory=mongoose.connection.db.collection("foodCategory");
    global.food_items=data;
    // console.log(global.food_items)
    


  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = connectToMongo;




