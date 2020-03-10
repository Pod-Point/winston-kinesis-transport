const kinesis = require('../src/kinesis.js');

describe('kinesis streamer module', () => {
    pending('comment out this line if you want to really log something');
    // Replace 'some-data-stream-name' with a real stream name
    const KinesisStreamer = new kinesis.KinesisStreamer('logging', 'testing', {
        accessKeyId: 'some-key',
        secretAccessKey: 'some-secret',
        region: 'eu-west-1',
    });

    it('writes to kinesis', done => {
        const message = {
            timestamp: (new Date()).toISOString(),
            level: 'info',
            message: 'test message',
            channel: 'testing',
            project: 'winston-kinesis-transport'
        };

        KinesisStreamer.send(JSON.stringify(message)).then(m => {
            done(m);
        }, e => {
            console.error(e);
            done(new Error(`Couldn't send message to Kinesis Data Stream.`));
        });
    });
});
