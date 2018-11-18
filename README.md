kepa-de-mimi (可怕的秘密)
=========

Streaming file encryption and decryption command line interface that is useful for encrypting and decrypting large files very quickly.

Trying to move the documentation to a [wiki](https://github.com/ballantyne/kepa-de-mimi/wiki) so that there is less git interaction.

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

Inspiration
-------
I found [this blog post](https://lollyrock.com/articles/nodejs-encryption/) and decided to use the idea to make a useful library.  Not sure how much you need to change a piece of code until it is considered an original piece of work.  I remember in graphic design if it is 30% different then it is different enough.  Probably in code land each and every line needs to be accounted for. [This](https://gist.github.com/chris-rock/335f92742b497256982a#file-crypto-stream-js) is the source of the inspiration for parts of [this code](https://github.com/ballantyne/kepa-de-mimi/blob/master/index.js).  Not sure if this is considered a proper citation, but the code isn't exactly the same anyway.

Copyright 
-------
© 2018 Scott Ballantyne. See LICENSE for details.

