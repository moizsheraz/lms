import mongoose, { Schema } from "mongoose";

// Define the SubSubTopic schema
const subSubTopicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

// Define the SubTopic schema, embedding SubSubTopic schema as subTopics
const subTopicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  subTopics: {
    type: [subSubTopicSchema], // Embed SubSubTopic schema here
    default: [],
  },
});

// Define the main Topic schema, embedding SubTopic schema as subTopics
const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  subTopics: {
    type: [subTopicSchema], // Embed SubTopic schema here
    default: [],
  },
});

export const Topic = mongoose.models.Topic ?? mongoose.model("Topic", topicSchema);
