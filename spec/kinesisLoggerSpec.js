const winston = require('winston');
const KinesisTransport = require('../src/index');
const MockKinesisStreamer = require('./support/mock-kinesis-streamer');

describe('kinesis logger transport', () => {
    beforeAll(() => {
        this.m = new MockKinesisStreamer('some-stream', 'testing', {});

        this.message = 'test message';

        spyOn(this.m, 'send').and.callThrough();
    });

    it('logs a message', (done) => {
        const { m, message } = this;

        m.send(message)
            .then((response) => {
                expect(response).toBe(message);
                done();
            }).catch(done);
    });

    it('affixes to winston', () => {
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
