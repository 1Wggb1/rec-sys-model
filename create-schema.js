db = db.getSiblingDB('rec_system_db');

db.createCollection('user_profile');
db.createCollection('product');
db.createCollection('product_category');
db.createCollection('recommendation');
db.createCollection('interaction');

db.user_profile.insertMany([
 {
    name: 'Will',
    email: 'will@will.ru',
    preferences: ["horror", "top_10_books", "fiction movies", "cars"]
  },
  {
    name: 'Naty',
    email: 'naty@naty.ch'
  },
  {
    name: 'Joana',
    email: 'joana@joana.jp',
    bornDate: Date(),
    preferences: ["japonese things", "top_10_novels"]
  } 
]);

db.createCollection("interaction", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "type", "userId", "product" ],
         properties: {
            type: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            userId: {
               bsonType: "int",
               description: "must be an integer in [ 2017, 3017 ] and is required"
            },
            product: {
               bsonType: "object",
               required: [ "name" ],
               properties: {
                  name: {
                     bsonType: "string",
                     description: "must be a string if the field exists"
                  },
                  product_category: {
                     bsonType: "object",
                     properties: {
                        name: {
                     bsonType: "string",
                     description: "must be a string if the field exists"
                        },
                     }
                  }
               }
            }
         }
      }
   }
})
