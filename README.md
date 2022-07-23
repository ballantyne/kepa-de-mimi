kepa-de-mimi (可怕的秘密)
=========

This is a new version.  I haven't finished writing the tests yet but it has many more tests than it used to have.  I would also like to more carefully handle various ciphers and give better error/usage information so that I don't have to hash the inputs to make them the correct length.

Streaming file encryption and decryption command line interface that is useful for encrypting and decrypting large files very quickly.

Trying to move the documentation to a [wiki](https://github.com/ballantyne/kepa-de-mimi/tree/main/docs) so that there is less git interaction.

```bash
npm install kepa-de-mimi -g
```
or on mac
```bash
sudo npm install kepa-de-mimi -g
```

or if npmjs.com isn't working right
```bash
git clone https://github.com/ballantyne/kepa-de-mimi.git
cd kepa-de-mimi
npm install
cd ../
sudo npm install kepa-de-mimi/ -g
```

or click [here](https://github.com/ballantyne/kepa-de-mimi/archive/refs/heads/master.zip) to download a zip.

and then

```bash
  mimi encrypt -p password -v vector -i filename.extension 
  mimi decrypt -p password -v vector -i filename.extension.mimi

```

Just using a password is becoming deprecated in the crypto standard library so I am going to make it a requirement to use a vector.  To use the old method of encryption use the --backwards flag.  The new method might be very different and so it might not work to decrypt old files.

```bash
  mimi encrypt -p password -i filename.extension --backwards 
  mimi decrypt -p password -i filename.extension.mimi --backwards

```

I have also added the ability to pipe data to and from and also redirect from mimi like so:

```bash
  cat filename.extension | mimi encrypt -p password --backwards -O >> filename.extension.mimi
  cat filename.extension.mimi | mimi decrypt -p password --backwards -O >> filename.extension

  # or

  cat filename.extension | mimi encrypt -p password -v vector -O >> filename.extension.mimi
  cat filename.extension.mimi | mimi decrypt -p password -v vector -O >> filename.extension
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

License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Inspiration
-------
I saw [this blog post](https://lollyrock.com/articles/nodejs-encryption/) and decided to use the idea to make a useful library.  Nice blog post Chris.

Years Later
-------
Without someone saying something, how would I ever know that someone was upset about this?  I think I have been systematically targeted for abusive harassment related to this project and I think that I was more than clear about what had happened and how to contact me.

I don't think i 'changed' his code.  My code is different.  The blog post's code was never the code that I was trying to end up with, it was just one of many different examples that I looked at while I was researching an idea.  I also don't think that the code that was the basis for the inspiration was different than the api docs which are also copywrited.


No offense to this dude, but I seem to be getting a fair about of trolling and criticism about making this module.  I don't think that the code I wrote is the same as this guy's code and I don't think that the code he wrote is very different from the api documentation.  I made a useful tool which is structured in a way that I could use it as a command line utility I think that that is a value add.  If you don't like what I made, you can make another module that better suits your needs and call it something else.  I don't think that I stole from this guy and I think that I mentioned him in the readme.  Is there some other way that I am supposed to honor his contribution?  Have I hurt his feelings or something?  I think that the criticism is a little much.  Just people constantly trolling people that are doing things that are useful.  I don't know why.  There see, I even asked if I had properly referenced his code.  It is too bad people are so mean on the internet these days.

Here is an example of the dude's code:
- https://github.com/chris-rock/node-crypto-examples/blob/master/crypto-ctr.js

Here is the api documentation:
- https://nodejs.org/api/crypto.html
- https://nodejs.org/api/crypto.html#class-cipher
- https://nodejs.org/api/crypto.html#class-decipher
- https://nodejs.org/api/zlib.html#zlib

Did people freak out at him for making a blog post about the api documentation?  The node.js website says that that information is copywrited.  I also looked at the node.js api documentation while I was making the module as I was in the process of trying to make a module like this.  So I looked at several different sources and I made something that used the same standard library method once or twice?  I don't think I was recreating their work.  Is it that I should do no research at all when I am writing software?  Is that the paradigm that is trying to be enforced?  Is Chris really trying to say I was violating his copyright?

Is the argument that the first person that uses the methods from a programming language's standard libary in a blog post is the only person that can use those methods?  Does this mean no one can use a programming language if it has api documentation?  Did the guy that wrote the blog post ask for permission to use the examples from the api documentation?  Should I ask the node.js foundation for permission to use their programming language as documented?

I never encrypt and decrypt all in one pipe sequence, so that part is definitely different.  I'm not suppose to read blog posts?

Are there a lot of ways to write this code?  I don't think so.  It looks like at least one of his examples is very similar to the api docs and the other example uses a pipeline which is also similar.  I think I didn't steal any code.  I probably shouldn't explain my rationale about if I was borrowing too much.  I have learned that many of you are not people I would like to know in real life.

Is this the Chris that is being terrible?  Is he the person people keep saying 'chef's kiss' about?  I thought they were talking about my ex-girlfriend who was an actual chef.  I had no idea that this could be part of the reason anyone would be angry with me.  I think I was very clear that if there was an issue I would try to handle any relevant complaint.

People are saying that because I used the same standard library functions and I used pipe the code is the same?  Nonsense.

I thought I was being nice giving him a shoutout.  I guess I was wrong about that.  Next time I won't give blog post dude a shoutout.  That is the world that you have created.  Good job Chris.  No more shoutouts.

Also, just in case there is any strange conclusions about the name, 可怕的秘密 is what Google Translate says when I type in 'terrible secret'.  可怕的秘密, pronounced kěpà de mìmì.  When you put the chinese back into be translated is translates as 'scary secret'.  Not exactly the same.  The guy that wrote the blog post has a github name of chris-rock, so maybe he took that personally?  I guess he doesn't speak chinese?  I wasn't talking about him. You do have to wonder about people that take this sort of thing personally however.  Maybe he has a terrible secret?

I wrote "if you don't like it make your own" and someone tweeted "let's finish".  I you think it should be different, make a suggestion or a pull request.  Don't just copy everything I work on and mock me on twitter.

Copyright 
-------
© 2022 Scott Ballantyne. See LICENSE for details.
