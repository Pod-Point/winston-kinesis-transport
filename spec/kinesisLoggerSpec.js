const winston = require('winston');
const MockKinesisStreamer = require('./support/mock-kinesis-streamer');
const KinesisTransport = require('../src/index.js');

describe('kinesis logger transport', function () {
    beforeAll(function () {
        this.m = new MockKinesisStreamer('some-stream', 'testing', {});

        this.message = 'test message';

        spyOn(this.m, 'send').and.callThrough();
    });

    it('logs a message', function (done) {
        const { m, message } = this;

        m.send(message)
            .then(response => {
                expect(response).toBe(message);
                done();
            })
            .catch(done);
    });

    it('affixes to winston', function () {
        const { m, message } = this;

        m.send.calls.reset();

        const logger = winston.createLogger({
            transports: [
                new KinesisTransport({ kinesisStreamer: m }),
            ],
        });

        logger.info(message);

        expect(m.send).toHaveBeenCalled();
    });
});
