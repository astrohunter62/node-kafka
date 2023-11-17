const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-demo",
  brokers: ["127.0.0.1:9092"],
  ssl: false,
  // sasl: {
  //   mechanism: "plain",
  //   username: "test",
  //   password: "test-secret",
  // },
});

const consumer = kafka.consumer({ groupId: "kafka-group-2" });

async function subscribeAndRead() {
  await consumer.connect();
  await consumer.subscribe({ topics: ["test-topic2"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        // topic: topic,
        partition: partition,
        // heartbeat: heartbeat,
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      });
    },
  });
}

subscribeAndRead();
