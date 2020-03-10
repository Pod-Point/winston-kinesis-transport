const kinesis = require('../../src/kinesis');

class MockKinesisStreamer extends kinesis.IKinesisStreamer {
    constructor(streamName, environment, kinesisOptions) {

        super(streamName, environment, kinesisOptions);

        this.streamName = streamName;
        this.environment = environment;
    }

    send(message) {
        return Promise.resolve(message);
    }
}

module.exports = MockKinesisStreamer;
