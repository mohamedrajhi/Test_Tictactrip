
## Quick Start

``` bash
# Install dependencies
npm install

# Serve on localhost:3000
npm start
```
## API used for documentation
The API used to generate the documentation is apiDoc.
apiDoc creates a documentation from API annotations in your source code.
After adding the annotations you must execute this command in order to generate the documentation
``` bash
apidoc -i myapp/ -o apidoc/ -t mytemplate/
```

The documentation is served on localhost:3000 or on [this link](https://boiling-mesa-23934.herokuapp.com/)
## Deployemet
The code is deployed on heroku on this  [link](https://boiling-mesa-23934.herokuapp.com/).
In order to perform the same deployement follow the steps below

 1. Add the node version to your package.json
```
"engines": {
    "node": "10.x"
  },
```

 2. Execute the code below
 

   ``` bash
$ git add .
$ git commit -m "Added a Procfile."
$ heroku login
Enter your Heroku credentials.
...
$ heroku create
Creating arcane-lowlands-8408... done, stack is cedar
http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git
Git remote heroku added
$ git push heroku master
...
-----> Node.js app detected
...
-----> Launching... done
       http://arcane-lowlands-8408.herokuapp.com deployed to Heroku
```



