const Transport = require('winston-transport');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Promise);

const IKinesisStreamer = class IKinesisStreamer {
    // eslint-disable-next-line no-useless-constructor, no-unused-vars
    constructor(streamName, environment, kinesisOptions) {
        // ...
    }

    /**
     * @returns Promise containing the recordId
     */
    send(message) { // eslint-disable-line no-unused-vars
        throw new Error('Not Implemented.');
    }
};

const KinesisStreamer = class KinesisStreamer extends IKinesisStreamer {
    constructor(streamName, environment, kinesisOptions) {
        super(streamName, kinesisOptions);

        this.streamName = streamName;
        this.environment = environment;

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

const KinesisLogger = class KinesisLogger extends Transport {
    constructor(options) {
        super(options);

        this.name = 'KinesisLogger';
        this.level = options.level || 'info';
        this.formatter = options.formatter || JSON.stringify;

        const streamName = options.streamName;
        const environment = options.environment;
        const kinesisOptions = options.kinesisOptions || {};

        if (kinesisOptions.region) {
            AWS.config.update({ region: kinesisOptions.region });
        }

        this.kinesisStreamer = options.kinesisStreamer || new KinesisStreamer(streamName, environment, kinesisOptions);
    }

    log(info, callback) {
        if (callback) {
            setImmediate(callback);
        }

        const message = Object.assign({ timestamp: (new Date()).toISOString() }, info);

        return this.kinesisStreamer.send(this.formatter(message));
    }
};

module.exports = { IKinesisStreamer, KinesisStreamer, KinesisLogger };
