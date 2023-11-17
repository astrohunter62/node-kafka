const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["127.0.0.1:9092"], // Replace with your Kafka broker info
});

async function getClusterMetadata() {
  const admin = kafka.admin();
  await admin.connect();

  try {
    const metadata = await admin.describeCluster();
    console.log("Cluster ID:", metadata.clusterId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await admin.disconnect();
  }
}

getClusterMetadata();
