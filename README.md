[![Build Status](https://travis-ci.com/Pod-Point/winston-kinesis-transport.svg?branch=master)](https://travis-ci.com/Pod-Point/winston-kinesis-transport)
[![NPM version](https://img.shields.io/npm/v/@pod-point/winston-kinesis.svg)](https://npmjs.org/package/@pod-point/winston-kinesis)
[![NPM downloads](https://img.shields.io/npm/dm/@pod-point/winston-kinesis.svg)](https://npmjs.org/package/@pod-point/winston-kinesis)

# Winston AWS Kinesis Transport

NodeJS module, winston logging transport which writes to AWS Kinesis Data Stream.

## Installation

```bash
npm install @pod-point/winston-kinesis
```

## Usage

You can add this logger transport with the following code:

```javascript
var winston = require('winston');
var KinesisTransport = require('@pod-point/winston-kinesis');

// register the transport
var logger = winston.createLogger({
    transports: [
      new KinesisTransport({
        'streamName': 'kinesis_data_stream_name',
        'environment': 'production',
        'kinesisOptions': {
          'region': 'us-east-1'
        }
      })
    ]
  });

// log away!!
// with just a string
logger.info('This is the log message!');

// or with meta info
logger.info('This is the log message!', { snakes: 'delicious' });
```

This will write messages as strings (using JSON.stringify) into Kinesis in the following format:
```
{
  timestamp: 2016-05-20T22:48:01.106Z,
  level: "info",
  message: "This is the log message!",
  meta: { snakes: "delicious" }
};
```

### Options

`streamName (string) - required` The name of the Kinesis data stream to write to.

`kinesisOptions (object) - optional/suggested` The Kinesis options that are passed directly to the constructor,
 [documented by AWS here](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Kinesis.html#constructor-property)

### Details

At the moment this logger sends (unacknowledged!) log messages into firehose. Right now the behavior if the log
message fails to write to Kinesis is simply to do absolutely nothing and fail silently.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Credits

- Originally forked from [`winston-firehose`](https://github.com/pkallos/winston-firehose)
- [Pod Point](https://github.com/pod-point)

## License

The MIT License (MIT). Please see [License File](LICENCE.md) for more information.

---

<img src="https://d3h256n3bzippp.cloudfront.net/pod-point-logo.svg" align="right" />

Travel shouldn't damage the earth 🌍

Made with ❤️ at [Pod Point](https://pod-point.com)
