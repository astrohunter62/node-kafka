const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-kafka-app",
  brokers: ["127.0.0.1:9092"], // Replace with your Kafka broker address and port
});

const admin = kafka.admin();

const getTopicList = async () => {
  try {
    await admin.connect();
    const topics = await admin.listTopics();
    console.log("Kafka Service is running. Topics:", topics);
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
  } finally {
    await admin.disconnect();
  }
};

/**
 *  @param {String[]} topics : ["topic_name1", "topic_name2"]
 *  @param {Number} timeout: 5000
 */
const deleteTopics = async (topics, timeout) => {
  await admin.deleteTopics({
    topics,
    timeout,
  });
};

getTopicList();
