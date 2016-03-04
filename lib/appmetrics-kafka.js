/*******************************************************************************
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
var monitor = function(connectionString, clientId, zkOptions, noAckBatchOptions ) {
    var appmetrics = require('appmetrics').monitor();
    var kafka = require('kafka-node'),
        Producer = kafka.Producer,
        KeyedMessage = kafka.KeyedMessage,
        client = new (Function.prototype.bind.apply(kafka.Client, arguments)),
        producer = new Producer(client),
        km = new KeyedMessage('key', 'message');
    
    producer.on('ready', function () {

        appmetrics.on('cpu',function(cpu) {
            payloads = [
                {topic: 'cpu.process', messages: cpu.process},
                {topic: 'cpu.system', messages: cpu.system}
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('memory',function(memory) {
            payloads = [
                {topic: 'memory.private', messages: memory.private},
                {topic: 'memory.physical', messages: memory.physical},
                {topic: 'memory.virtual', messages: memory.virtual},
                {topic: 'memory.physical_free', messages: memory.physical_free},
                {topic: 'memory.physical_used', messages: memory.physical_used},
                {topic: 'memory.physical_total', messages: memory.physical_total}
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('eventloop', function(eventloop) {
            payloads = [
                {topic: 'eventloop.latency.min', messages: eventloop.latency.min},
                {topic: 'eventloop.latency.max', messages: eventloop.latency.max},
                {topic: 'eventloop.latency.avg', messages: eventloop.latency.avg}   
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('gc', function(gc) {
            payloads = [
                {topic: 'gc.size', messages: gc.size},
                {topic: 'gc.used', messages: gc.used},
                {topic: 'gc.type', messages: gc.type},
                {topic: 'gc.duration', messages: gc.duration}                
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('http', function(http) {
            payloads = [
                {topic: 'http.duration', messages: http.duration},        
                {topic: 'http.method', messages: http.method},        
                {topic: 'http.url', messages: http.url},        
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('socketio', function(socketio) {
            payloads = [
                {topic: 'socketio.method', messages: socketio.method},             
                {topic: 'socketio.event', messages: socketio.event},             
                {topic: 'socketio.duration', messages: socketio.duration}       
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('mysql', function(mysql) {
            payloads = [
                {topic: 'mysql.query', messages: mysql.query},                         
                {topic: 'mysql.duration', messages: mysql.duration}       
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('mongo', function(mongo) {
            payloads = [
                {topic: 'mongo.query', messages: mongo.query},                         
                {topic: 'mongo.duration', messages: mongo.duration}       
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('mqtt', function(mqtt) {
            payloads = [
                {topic: 'mqtt.method', messages: mqtt.method},                         
                {topic: 'mqtt.topic', messages: mqtt.topic},                         
                {topic: 'mqtt.qos', messages: mqtt.qos},                         
                {topic: 'mqtt.duration', messages: mqtt.duration}                         
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('mqlight', function(mqlight) {
            payloads = [
                {topic: 'mqlight.clientid', messages: mqlight.clientid},                         
                {topic: 'mqlight.method', messages: mqlight.method},                         
                {topic: 'mqlight.data', messages: mqlight.data},                         
                {topic: 'mqlight.topic', messages: mqlight.topic},                         
                {topic: 'mqlight.qos', messages: mqlight.qos},                    
                {topic: 'mqlight.duration', messages: mqlight.duration}                         
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('leveldown', function(leveldown) {
            payloads = [
                {topic: 'leveldown.method', messages: leveldown.method},                         
                {topic: 'leveldown.key', messages: leveldown.key},                         
                {topic: 'leveldown.value', messages: leveldown.value},                         
                {topic: 'leveldown.opCount', messages: leveldown.opCount},                         
                {topic: 'leveldown.duration', messages: leveldown.duration}                         
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('redis', function(redis) {
            payloads = [                        
                {topic: 'redis.cmd', messages: redis.cmd},                         
                {topic: 'redis.duration', messages: redis.duration}                         
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('memcached', function(memcached) {
            payloads = [
                {topic: 'memcached.method', messages: memcached.method},                         
                {topic: 'memcached.key', messages: memcached.key},                                                
                {topic: 'memcached.duration', messages: memcached.duration}                         
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('oracledb', function(oracledb) {
            payloads = [                     
                {topic: 'oracledb.query', messages: oracledb.query},                                                
                {topic: 'oracledb.duration', messages: oracledb.duration}                         
            ];
            sendToKafka(payloads);
        });
        
        appmetrics.on('oracle', function(oracle) {
            payloads = [                         
                {topic: 'oracle.query', messages: oracle.query},                                                
                {topic: 'oracle.duration', messages: oracle.duration}                         
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('strong-oracle', function(strongOracle) {
            payloads = [                        
                {topic: 'strongoracle.query', messages: strongOracle.query},                                                
                {topic: 'strongoracle.duration', messages: strongOracle.duration}                         
            ];
            sendToKafka(payloads);
        });

        appmetrics.on('postgres', function(postgrespostgres) {
            payloads = [                       
                {topic: 'postgres.query', messages: postgres.query},                                                
                {topic: 'postgres.duration', messages: postgres.duration}                         
            ];
            sendToKafka(payloads);
        });
    });
     
    producer.on('error', function (err) {
        throw(err);
    });

    function sendToKafka(payloads) {
        producer.send(payloads, function (err, data) {});
    }

    return kafka;
}
exports.Kafka = monitor;