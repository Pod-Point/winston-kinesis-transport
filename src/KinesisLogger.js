const AWS = require('aws-sdk');
const Transport = require('winston-transport');
const KinesisStreamer = require('./KinesisStreamer');

module.exports = class KinesisLogger extends Transport {
    constructor(options) {
        super(options);

        this.name = 'KinesisLogger';

        const {
            environment,
            formatter,
            level,
            streamName,
        } = options;

        this.level = level || 'info';
        this.formatter = formatter || JSON.stringify;

        const kinesisOptions = options.kinesisOptions || {};

        AWS.config.setPromisesDependency(Promise);

        if (kinesisOptions.region) {
            AWS.config.update({ region: kinesisOptions.region });
        }

        const defaultStreamer = new KinesisStreamer(streamName, environment, kinesisOptions);

        this.kinesisStreamer = options.kinesisStreamer || defaultStreamer;
    }

    log(info, callback) {
        if (callback) {
            setImmediate(callback);
        }

        const message = {
            timestamp: (new Date()).toISOString(),
            ...info,
        };

        return this.kinesisStreamer.send(this.formatter(message));
    }
};
