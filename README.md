# Apache Kafka Connector for Node Application Metrics

A connector that collects data using 'appmetrics' and sends it to a configured Kafka server using 'kafka-node'.

## Getting Started

### Installation
The Kafka Connector for Node Application Metrics can be installed via `npm`:
```sh
$ npm install appmetrics-kafka
```

### Configuring the Kafka Connector for Node Application Metrics 

The connector can be used in your application by requiring it as the first line of your application:
```sh
var appkafka = require('appmetrics-kafka').Kafka();
```
Configuration of the connection to the Kafka server is possible by passing parameters to the `Kafka()` function. These are passed directly though to the `Client` constructor in the `kafka-node` module. Information for that module is available here:
https://www.npmjs.com/package/kafka-node

Additional data may also be sent to Kafka using the standard `kafka-node` module APIs, eg.

```sh
var appkafka = require('appmetrics-kafka').Kafka();

var Producer = appkafka.Producer,
    KeyedMessage = appkafka.KeyedMessage,
    client = new appkafka.Client(),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
        { topic: 'topic1', messages: 'hi', partition: 0 },
        { topic: 'topic2', messages: ['hello', 'world', km] }
    ];
	producer.on('ready', function () {
	    producer.send(payloads, function (err, data) {
	    	console.log(err);
	        console.log(data);
	    });
	});
	 
	producer.on('error', function (err) {})
```

### Data Provided

The connector sends the following topics to Kafka from Node Application Metrics:


#### CPU

* `cpu.process` the CPU usage of the application as a percentage of total machine CPU
* `cpu.system` the CPU usage of the system as a percentage of total machine CPU

#### System Memory

* `memory.process.private` the amount of memory used by the Node.js application that cannot be shared with other processes, in bytes.
* `memory.process.physical` the amount of RAM used by the Node.js application in bytes.
* `memory.process.virtual` the memory address space used by Node.js application in bytes.
* `memory.system.used` the total amount of RAM in use on the system in bytes.
* `memory.system.total` the total amount of RAM available on the system in bytes.

#### Event Loop

* `eventloop.latency.min` the shortest sampled latency for processing an event
* `eventloop.latency.max` the longest sampled latency for processing an event
* `eventloop.latency.avg` the mean sampled latency for processing an event

#### Garbage Collection

* `gc.size` the size of the JavaScript heap in bytes.
* `gc.used` the amount of memory used on the JavaScript heap in bytes.
* `gc.duration` the duration of the GC cycle in milliseconds.

#### HTTP Requests
* `http.method` the HTTP method used for the request
* `http.url` the URL on which the request was made.
* `http.duration` the time taken for the HTTP request to be responded to in ms.

#### Socket.io

* `socketio.method` whether the event is a 'broadcast' or 'emit' from the application, or a 'receive' from a client .
* `socketio.event` the name used for the event.
* `socketio.duration` the time taken for a received named socketio event to be handled.

#### MySQL Queries

* `mysql.query` the query made of the MySQL database.
* `mysql.duration` the time taken for the given MySQL query to be responded to in ms.

#### MongoDB Queries

* `mongo.query`  the query made of the MongoDB database.
* `mongo.duration` the time taken for the given MongoDB query to be responded to in ms.

#### MQTT Messaging

* `mqtt.method` the name of the call or event (will be one of 'publish' or 'message').
* `mqtt.topic`  the topic on which a message is sent/received.
* `mqtt.qos` the QoS level for a 'send' call, undefined if not set.
* `mqtt.duration`  the time taken in milliseconds.

#### Leveldown Queries

* `levedown.method` the leveldown method being used.
* `leveldown.key` the key being used for a call to get, put or del (Undefined for other methods).
* `leveldown.value` the value being added to the LevelDB database using the put method (Undefined for other methods).
* `leveldown.opCount` the number of operations carried out by a batch method (Undefined for other methods).
* `leveldown.duration` the time taken for the LevelDB query to be responded to in ms.

#### Redis Queries


* `redis.cmd` the Redis command sent to the server or 'batch.exec'/'multi.exec' for groups of command sent using batch/multi calls.
* `redis.duration` the time taken for the given Redis command to be responded to in ms.

#### Memcached Operations

* `memcached.method`  the method used in the memcached client, eg set, get, append, delete, etc.
* `memcached.key` the key associated with the data.
* `memcached.duration` the time taken for the given Memcached method to be responded to in ms.

#### OracleDB Queries
* `oracledb.query`  the query made of the OracleDB database.
* `oracledb.duration` the time taken for the OracleDB query to be responded to in ms.

#### Oracle Queries
* `oracle.query`  the query made of the Oracle database.
* `oracle.duration` the time taken for the Oracle query to be responded to in ms.
* 
#### Strong Oracle Queries
* `strongoracle.query`  the query made of the Oracle database.
* `strongoracle.duration` the time taken for the Strong Oracle query to be responded to in ms.

#### PostgreSQL Queries
* `postgres.query` the query made of the PostgreSQL database.
* `postgres.duration` the time taken for the given PostgresSQL query to be responded to in ms.

#### MQLight Messaging

* `mqlight.clientid` the id of the client.
* `mqlight.data` the data sent if a 'send' or 'message', undefined for other calls. Truncated if longer than 25 characters.
* `mqlight.method` the name of the call or event (will be one of 'send' or 'message').
* `mqlight.topic` the topic on which a message is sent/received.
* `mqlight.qos` the QoS level for a 'send' call, undefined if not set.
* `mqlight.duration`  the time taken for a MQLight message to handled on a given topic in ms.

### License
The Node Application Metrics to Kafka Connector is licensed using an Apache v2.0 License.

### Version
2.0.0

#### Version History
2.0.0 update appmetrics version

1.0.0 Initial release  
