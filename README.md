## About

A note keeping web application template using Mantine 7, Next 14 (App), Tiptap WSIWYG rich text editor and JSON server.

> Kindly note: primarily this template is geared to be used with a backend or content management service and because of that I have
> added **json-serve** and a **db.json** on the root directory.

## Quick start

#### Download

- Clone this repo git clone `https://github.com/design-sparx/mantine-analytics-dashboard.git`
- [Download from GitHub](https://github.com/design-sparx/mantine-analytics-dashboard/archive/refs/heads/main.zip)

#### Environment variables

Before installing, in your project root directory, create an `env.local` file and paste the below.

```bash copy
NEXT_PUBLIC_BASEURL=http://localhost:8000
```

Note: The above variable will be used to consume your json server endpoints.

#### Dev tools

You'll need to install Node.js.
Once Node.js is installed, run npm install to install the rest of the template's dependencies. All dependencies will be
downloaded to the node_modules directory.

```bash copy
yarn install
```

Before running your Nextjs server, you will need to run your json server. This will server your local webserver
at http://localhost:8000, using the following command.

```bash copy
yarn json:serve
```

Now you're ready to modify the source files and generate new files. To automatically detect file changes and start a
local webserver at http://localhost:3000, run the following command.

```bash copy
yarn dev
```

Compile, optimize, minify and uglify all source files to build

```bash copy
yarn build
```
