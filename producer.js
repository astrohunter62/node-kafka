const { Kafka, Partitioners } = require("kafkajs");

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

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

async function sendMessage() {
  await producer.connect();
  const res = await producer.send({
    topic: "test-topic2",
    messages: [
      { key: "key1", value: "hello world", partition: 0 },
      { key: "key2", value: "hey hey", partition: 1 },
    ],
    timeout: 1000,
  });
}

sendMessage();
