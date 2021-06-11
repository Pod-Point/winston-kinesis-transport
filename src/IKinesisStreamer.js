/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
module.exports = class IKinesisStreamer {
    constructor(streamName, environment, kinesisOptions) {
        // ...
    }

    /**
     * @returns Promise containing the recordId
     */
    send(message) {
        throw new Error('Not Implemented.');
    }
};
