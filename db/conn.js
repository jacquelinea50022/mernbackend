const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://jacqueline50022:hellobts@cluster2.jk3ijdy.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let _db;

// creatign export with function connectToDb and getDB in order to send this information to other folders
module.exports = {
    connectToDb: async (callback) => {
      
        // Connect the client to the server	(optional starting in v4.7)
        _db = await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("mernstack").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
    },

    getDB: () => {
        return _db
    }

}
// async function connectToDatabase() {
//   const client = new MongoClient(connectionString);
  
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     return client.db("sample_training");
//   } catch (error) {
//     module.exports = {
//       connectToDatabase: (remember) => {
//         client.connect((err, db);
        

//         );
//     }