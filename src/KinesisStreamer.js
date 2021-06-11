const AWS = require('aws-sdk');
const IKinesisStreamer = require('./IKinesisStreamer');

module.exports = class KinesisStreamer extends IKinesisStreamer {
    constructor(streamName, environment, kinesisOptions) {
        super(streamName, kinesisOptions);

        this.streamName = streamName;
        this.environment = environment;

        AWS.config.setPromisesDependency(Promise);

        this.kinesis = new AWS.Kinesis(kinesisOptions || {});
    }

    /**
     * @returns Promise
     */
    send(message) {
        return this.kinesis.putRecord({
            StreamName: this.streamName,
            PartitionKey: this.environment,
            Data: message,
        }).promise();
    }
};
