const getBrokers = async () => {
  const clusterResponse = await fetch("http://127.0.0.1:9092/v3/clusters", {
    headers: {
      "content-type": "application/vnd.api+json",
    },
  }).then((res) => res.json());

  const clusterUrl = clusterResponse.data[0].links.self;
  console.log(clusterUrl);

  const brokersResponse = await fetch(`${clusterUrl}/brokers`, {
    headers: "application/vnd.api+json",
  }).then((res) => res.json());
  console.log(brokersResponse);

  const brokers = brokersResponse.data.map((broker) => {
    const { host, port } = broker.attributes;
    return `${host}:${port}`;
  });
  console.log(brokers);
  return brokers;
};

getBrokers();
