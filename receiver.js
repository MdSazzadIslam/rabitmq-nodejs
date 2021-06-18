const amqp = require("amqplib/callback_api");

//connecting with rabitMQ
amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  //creating a channel
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    const queueName = "Sazzad";

    //assert queue
    channel.assertQueue(queueName, {
      durable: false, // it means if there's no subscriber this queue will be avaiable
    });

    channel.consume(
      queueName,
      (msg) => {
        console.log("Received : ", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
