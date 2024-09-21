db = db.getSiblingDB("rec_system_db");

db.createCollection("user_profile");
db.createCollection("product");
db.createCollection("product_category");
db.createCollection("recommendation");
db.createCollection("interaction");

db.user_profile.insertMany([
 {
    name: "Will",
    email: "will@will.ru",
    bornDate: new Date(1999, 4, 17),
    preferences: ["horror", "top_10_books", "fiction movies", "cars", "most_selled", "computing"]
  },
  {
    name: "Naty",
    email: "naty@naty.ch"
  },
  {
    name: "Joana",
    email: "joana@joana.jp",
    bornDate: new Date(1990, 11, 1),
    preferences: ["japonese things", "top_10_novels", "computing"]
  },
  {
    name: "Marcus",
    email: "marcus@marcus.mc",
    bornDate: new Date(1998, 8, 17),
    preferences: ["cars", "top_10_novels", "horror"]
  },
  {
    name: "Mary",
    email: "mary@mary.mr",
    bornDate: new Date(2002, 11, 11),
    preferences: ["top_10_books", "top_10_novels", "horror"]
  } 
]);

db.product_category.insertMany([
  {
      name: "Books",
      tags: ["top_100"]
  },
  {
      name: "Electronics",
      tags: ["most_selled"]
  },
  {
      name: "Movies",
      tags: ["most_viewed"]
  },
  {
      name: "Beauty",
  },
  {
      name: "Clouting",
      tags: ["top_2", "most_selled"]
  }
]);

const bookCategoryId = db.product_category.findOne({name: "Books"}, {_id: 1})["_id"]
const cloutingId = db.product_category.findOne({name: "Clouting"}, {_id: 1})["_id"]
const lookingId = db.product_category.findOne({name: "Beauty"}, {_id: 1})["_id"]
const movieId = db.product_category.findOne({name: "Movies"}, {_id: 1})["_id"]
db.product.insertMany([
  {
      name: "How do friends and influent people",
      tags: ["top_100"],
      productCategoryId: bookCategoryId
  },
  {
      name: "T-shirt Malloy Brickleberry",
      tags: ["never_selled", "adult_swin"],
      productCategoryId: cloutingId
  },
  {
      name: "Police PD",
      tags: ["adult_swin"],
      productCategoryId: movieId
  },
  {
      name: "Gel acne",
      tags: ["top_10_teenager", "most_selled", "teen", "acne"],
      productCategoryId: lookingId
  },
  {
      name: "Hair Brightness",
      tags: ["women", "most_selled", "hair"],
      productCategoryId: lookingId
  },
  {
      name: "Mestrado e Doutorado em Computação",
      tags: ["top_10", "learning", "university"],
      productCategoryId: bookCategoryId
  },
  {
      name: "Clean Code",
      tags: ["top_10", "learning", "university", "coding"],
      productCategoryId: bookCategoryId
  },
  {
      name: "Introduction to Algorithms",
      tags: ["top_10", "learning", "university", "coding"],
      productCategoryId: bookCategoryId
  },
  {
      name: "Clean Arch",
      tags: ["top_10", "learning", "university", "arch"],
      productCategoryId: bookCategoryId
  }
]);

const willUserProfile = db.user_profile.findOne({name: "Will"})
const joanaUserProfile = db.user_profile.findOne({name: "Joana"})
const natyUserProfile = db.user_profile.findOne({name: "Naty"})
const acne = db.product.findOne({name: "Gel acne"})
const malloyClouting = db.product.findOne({name: "T-shirt Malloy Brickleberry"})
const computingBook = db.product.findOne({name: "Mestrado e Doutorado em Computação"})
const algorithmBook = db.product.findOne({name: "Introduction to Algorithms"})
db.interaction.insertMany([
    {
       "interactionType": "viewed",
       "interationDate": Date(),
       "userProfile": willUserProfile,
       "product": acne
    },
    {
       "interactionType": "add_to_cart",
       "interationDate": Date(),
       "userProfile": natyUserProfile,
       "product": computingBook
    },    
    {
       "interactionType": "favorited",
       "interationDate": Date(),
       "userProfile": natyUserProfile,
       "product": acne
    },
    {
       "interactionType": "viewed",
       "interationDate": Date(),
       "userProfile": natyUserProfile,
       "product": acne
    },
    {
       "interactionType": "favorited",
       "interationDate": new Date(2024, 8, 27),
       "userProfile": natyUserProfile,
       "product": algorithmBook
    },
    {
       "interactionType": "add_to_cart",
       "interationDate": Date(),
       "userProfile": willUserProfile,
       "product": malloyClouting
    },
    {
       "interactionType": "removed_from_cart",
       "interationDate": Date(),
       "userProfile": willUserProfile,
       "product": malloyClouting
    },
    {
       "interactionType": "removed_from_cart",
       "interationDate": Date(),
       "userProfile": joanaUserProfile,
       "product": malloyClouting
    },
    {
       "interactionType": "favorited",
       "interationDate": new Date(2024, 8, 25),
       "userProfile": willUserProfile,
       "product": algorithmBook
    },
    {
       "interactionType": "favorited",
       "interationDate": new Date(2024, 5, 25),
       "userProfile": joanaUserProfile,
       "product": algorithmBook
    },
    {
       "interactionType": "add_to_cart",
       "interationDate": Date(),
       "userProfile": joanaUserProfile,
       "product": algorithmBook
    },
    {
       "interactionType": "add_to_cart",
       "interationDate": Date(),
       "userProfile": joanaUserProfile,
       "product": malloyClouting
    }
]);

const cleanCodeBook = db.product.findOne({name: "Clean Arch"})
const natyRecommendations = [computingBook, cleanCodeBook, algorithmBook]
const lookingProducts = db.product.find({productCategoryId: lookingId}) || []
for(let product of lookingProducts) {
    natyRecommendations.push(product)
}
db.recommendation.insertMany([
    {
       "userProfile": willUserProfile,
       "products": [algorithmBook, acne, cleanCodeBook]
    },
    {
       "userProfile": natyUserProfile,
       "products": natyRecommendations
    }
]);

/*
//Query proposals:

//1 - Most viewed products and productCategory
db.interaction.aggregate([{ $match: { interactionType: "viewed"} }, { "$group": { _id: "$product", count: { $sum: 1 } } }]);//product
db.interaction.aggregate([{ $match: { interactionType: "viewed"} }, 
{ "$group": { _id: "$product.productCategoryId", count: { $sum: 1 } } }, 
{ "$lookup": { "from": "product_category", "localField": "_id", "foreignField": "_id", "as": "category" } }//look to "join" with productCategory 
]);//productCategory

//2 - Most added/removed to cart
db.interaction.aggregate([{ $match: { interactionType: "add_to_cart"} }, { "$group": { _id: "$product", count: { $sum: 1 } } }]);//added to cart
db.interaction.aggregate([{ $match: { interactionType: "removed_from_cart"} }, { "$group": { _id: "$product", count: { $sum: 1 } } }]);//removed from cart

//3 - Most favorited products
db.interaction.aggregate([{ $match: { interactionType: "favorited"} }, { "$group": { _id: "$product", count: { $sum: 1 } } }]);

//4 - UserProfile Most interacted Product Category
db.interaction.aggregate([{ $match: { "userProfile.name": "Will"} }, 
{ "$group": { _id: "$product.productCategoryId", count: { $sum: 1 } } },
{ "$lookup": { "from": "product_category", "localField": "_id", "foreignField": "_id", "as": "category" } }
]);

//5 - Similar User product
db.recommendation.aggregate([{ $match: { "userProfile.name": "Will"} }, 
{ "$group": { _id: "$products._id", count: { $sum: 1 } } }
]);

db.interaction.aggregate([{ $match: { "userProfile.name": "Will", interactionType: "add_to_cart"} }, 
{ "$group": { _id: "$product", count: { $sum: 1 } }},
{ "$lookup": { "from": "recommendation", "localField": "_id", "foreignField": "products", "as": "rec" } }
]);

*/
