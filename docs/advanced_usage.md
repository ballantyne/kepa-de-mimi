# Advanced Usage

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

To zip a folder and upload it to a server try the following
```bash
zip -r - folder/ | mimi encrypt -p password -v vector -u http://mimi.example.com/mimi/folder.zip.mimi
```

Or you can zip the folder you are currently in by using this command
```bash
zip -r - . | mimi encrypt -p password -v vector -u http://mimi.example.com/mimi/folder.zip.mimi
```

Right now, the code relies on you to input the correct parameters.  I hope that I will add some checks to ensure that a useful error message appears.  If you find that there is an error and you can figure out what the issue was, go ahead and try to add those validations yourself and make a pull request.  Thanks.

Use -h to get a print out of the usage.

```bash
office:Desktop scott$ mimi -h
Usage: mimi command [options]

Options:
  -i, --input <input>          Input File
  -o, --output <output>        Output File
  -u, --url <url>              URL
  -p, --password <password>    Password
  -v, --vector <vector>        Initialization Vector
  -c, --cipher <cipher>        Cipher
  -a, --algorithm <algorithm>  Hash Algorithm
  -O, --stdout                 Pipe to Standard Output
  -e, --ext, --extension       Choose which extension
  -s, --stream                 Promise returns a stream (programmatic use)
  -vv, --verbose               Verbose
```


