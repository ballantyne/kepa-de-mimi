kepa-de-mimi
=========


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

  mimi decrypt -p password -i filename.extension.encrypted
```

I haven't figured out how to get a valid initialization vector and key working yet, so if you also don't know how to supply those variables, the cli interface will give you a warning.  If you know how to make the initialization vector work well, please issue a pull request and I will try to add your contributions as soon as possible.

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

