const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-demo",
  brokers: ["127.0.0.1:9092"],
  ssl: false,
  // sasl: {
  //   mechanism: "plain",
  //   username: "admin",
  //   password: "admin-secret",
  // },
});

const admin = kafka.admin();

async function createTopicAndPartition() {
  try {
    await admin.connect();

    const res = await admin.createTopics({
      topics: [{ topic: "test-topic2" }],
    });

    await admin.createPartitions({
      topicPartitions: [
        {
          topic: "test-topic2",
          count: 2,
        },
      ],
    });

    const metadata = await admin.fetchTopicMetadata({
      topics: ["test-topic2"],
    });

    await admin.disconnect();
  } catch (err) {
    console.log(err);
  }
}

createTopicAndPartition();
