kepa-de-mimi (可怕的秘密)
=========

Streaming file encryption and decryption command line interface that is useful for encrypting and decrypting large files very quickly.

```bash
npm install kepa-de-mimi -g

```
or on mac
```bash
sudo npm install kepa-de-mini -g
```

or if npmjs.com isn't working right
```bash
git clone https://github.com/ballantyne/kepa-de-mimi.git
cd kepa-de-mimi
npm install
cd ../
sudo npm install kepa-de-mimi/ -g
```

and then

```bash
  mimi encrypt -p password -i filename.extension 

  mimi decrypt -p password -i filename.extension.mimi

```
You can also supply an initialization vector using -v like so.  I believe that that is supposed to be more secure than without.

```bash
  mimi encrypt -p password -v vector -i filename.extension 

  mimi decrypt -p password -v vector -i filename.extension.mimi

```

I have also added the ability to pipe data to and from and also redirect from mimi like so:

```bash
  cat filename.extension | mimi encrypt -p password -O >> filename.extension.mimi

  cat filename.extension.mimi | mimi decrypt -p password -O >> filename.extension

```

Here is an example of an express router for uploading directly to a server from mimi cli using the -u or --url option.  If you think that this should be handled differently, please feel free to let me know.

```bash 
cat large_file.extension | mimi encrypt -p testtesttest -u http://localhost:3000/upload/a_really_long_api_key/large_file.extension.mimi
```

```javavscript
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.post('/upload/api_key/:filename', function(req, res, next) {
  var writeable = fs.createWriteStream(path.join(__dirname, '..', 'public', 'uploads', req.params.filename));
  req.pipe(writeable);

  req.on('end', function() {
    res.json({success: true})
  })
});

module.exports = router;
```

Right now, the code relies on you to input the correct parameters.  I hope that I will add some checks to ensure that a useful error message appears.  If you find that there is an error and you can figure out what the issue was, go ahead and try to add those validations yourself and make a pull request.  Thanks.



Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your fix/feature has a high chance of being included, please read the following guidelines:

1. Post a [pull request](https://github.com/ballantyne/kepa-de-mimi/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/kepa-de-mimi/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/kepa-de-mimi/graphs/contributors)!


Donations
------------

If you'd like to contribute with bitcoin or another cryptocurrency you can send coins to the addresses below:

* ETH: 0xc3Cc87CFD19521e55c27832EdDb2cAFE2577F28E
* BTC: 1CqyYz717jUwENBraXAVr8hZtnK8k23vPK
* BCH: 129mMPtwjKce54FGE6rsRE4Ty2wFCKeQmr
* LTC: LPvwrQjYzTfE8DJFmpdcpjNw9zeuhxhdE6

License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright 
-------
© 2018 Scott Ballantyne. See LICENSE for details.

