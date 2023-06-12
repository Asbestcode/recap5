npm install mongoose

create .env.local file
MONGODB_URI=mongodb+srv://lilschweiger:WaKanDePap84s@cluster0.flkojmw.mongodb.net/NAME-OF-DATABASE



# model Schema

// db/models/Product.js
import mongoose from "mongoose";
import "./Review";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  reviews: { type: [Schema.Types.ObjectId], ref: "Review" },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

--------------------------------------------------------------------

// db/models/Joke.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const jokeSchema = new Schema({
  joke: { type: String, required: true },
});

const Joke = mongoose.models.Joke || mongoose.model("Joke", jokeSchema);

export default Joke;

# GET -- db read

// api/jokes/index.js
import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

--------------------------------------------------------------------

// api/jokes/[id].js
import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const joke = await Joke.findById(id);

    if (!joke) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(joke);
  }
}


Note that MongoDB returns an _id instead of id, so you might need to adapt your frontend to get the correct information.

--------------------------------------------------------------------
Imagine your MongoDB has two collections: jokes and comments on these jokes. They are linked by the commentIds.

When reading the jokes, you want to get the comments as well. You can easily achieve this by linking both schemas and when you query the database, you simply add .populate() with method chaining. First, link the schemas for Joke and Comment:

// link the schemas
const jokeSchema = new Schema({
  joke: { type: String, required: true },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  comment: { type: String, required: true },
  author: { type: String, required: true },
});

const Joke = mongoose.models.Joke || mongoose.model("Joke", jokeSchema);
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
Second, when reading from the database, populate the comments:

const joke = await Joke.findById(id).populate("comments");

--------------------------------------------------------------------
# POST - create db

  if (request.method === "POST") {
    try {
      const productData = request.body;
      const product = new Product(productData);
      await product.save();
      return response.status(201).json({ status: "Product created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

--------------------------------------------------------------------

if (request.method === "POST") {
  try {
    const jokeData = request.body;
    // We're declaring jokeData to contain the body of our request sent by our form that we haven't created yet.
    // The body of our request might contain data in a variety of formats, but is typically an object.
    const joke = new Joke(jokeData);
    // Utilizing our Joke scheme, we're creating a new joke.
    // At this point we're sanitizing our data according to the schema of our Joke model.
    await joke.save();
    // We've created a new joke, now we're calling save() to have mongoose insert a new document into our database.

    // The three lines above are functionally the same as:
    // Joke.create(request.body)
    // It's just a somewhat less opaque way.

    response.status(201).json({ status: "Joke created" });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
}

--------------------------------------------------------------------

POST using fetch
To connect the form submit handler with your POST API route, you need to call fetch() with two arguments: the POST API route and an options object.

In this object, you set the HTTP method to POST (instead of the default GET) and specify the value for the body key (= the data you want to send).

💡 The body key represent the request.body in the API route above: this is where the actual data is passed from frontend to the API (and then to the backend aka database).

import useSWR from "swr";

export default function JokeForm() {
  const jokes = useSWR("/api/jokes");
  // We're declaring jokes here because we call the .mutate() method below.

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);
    // We're declaring jokeData and filling it with the values we've extracted from our form via Object.fromEntries().

    const response = await fetch("/api/jokes", {
      method: "POST",
      body: JSON.stringify(jokeData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Here we're using the API route we've built earlier.
    // We're declaring a response returning a promise while we're posting to our database.

    // Here we're using fetch and not swr, because swr is for data fetching, and not data mutation.
    // ... but we can notify swr about data changes using the mutate function! (See below.)

    // Our method is post, the body contains our jokeData JSON, and our header provides additional information about the data we're sending.

    // Our joke is on its way!

    if (response.ok) {
      // If our attempt at posting our joke is a success, we proceed here.
      await response.json();
      // At this point, the promise of response has resolved.
      jokes.mutate();
      // Now we're notifying swr that our data has been mutated, which will trigger a rerender.
      // If we don't include this line, the page won't automatically refresh and our submitted joke won't be immediately visible.
      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
}
Revalidation with swr's mutate() function
In the example above, you've already seen how to use jokes.mutate().

This is why we use it:

it marks the data as expired and triggers a refetch (in the above example, api/jokes is fetched again)
swr updates the cache automatically (i.e. faster page reloads and the correct data is displayed)

--------------------------------------------------------------------
# PATCH - update


--------------------------------------------------------------------

--------------------------------------------------------------------

--------------------------------------------------------------------

--------------------------------------------------------------------

--------------------------------------------------------------------