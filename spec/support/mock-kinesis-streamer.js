const kinesis = require('../../src/kinesis');

class MockKinesisStreamer extends kinesis.IKinesisStreamer {
    constructor(streamName, environment, kinesisOptions) {
        super(streamName, environment, kinesisOptions);

        this.streamName = streamName;
        this.environment = environment;
    }

    // eslint-disable-next-line class-methods-use-this
    send(message) {
        return Promise.resolve(message);
    }
}

module.exports = MockKinesisStreamer;
