##linux base - Add MySQL to PATH

Open terminal, and type:

```commonlisp
echo 'export PATH=/usr/local/mysql/bin:$PATH' >> ~/.bash_profile
```

This adds the default location of the MySQL binary to your shell environment.

Then, you need to force the system to reload your .bash_profile file. Again, from terminal, enter:

```commonlisp
. ~/.bash_profile
```

There you go 

