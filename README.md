# Scribble Vauit

![image](https://github.com/design-sparx/scribble-vault/assets/26582923/4c215c00-500b-4137-ab06-cc671703a5f2)

## About

A note keeping web application template using [Mantine](https://mantine.dev/), [Next 14](https://nextjs.org/), [Tiptap](https://tiptap.dev/) (WSIWYG rich text editor), [JSON server](https://github.com/typicode/json-server?tab=readme-ov-file#getting-started) and [SWR](https://swr.vercel.app/)

> Kindly note: Primarily this template is geared to be used with a backend or content management service and because of that I have
> added **json server** and a **db.json** on the root directory.
> I have already written SWR fetching data hooks that can serve as a base for your development.

## Quick start

#### Download

- Clone this repo git clone `https://github.com/design-sparx/mantine-analytics-dashboard.git`
- [Download from GitHub](https://github.com/design-sparx/mantine-analytics-dashboard/archive/refs/heads/main.zip)

#### Environment variables

Before installing, it in your project root directory, create an `env.local` file and paste the below.

```bash copy
NEXT_PUBLIC_BASEURL=http://localhost:8000
```

> Note: The above variable will help in the consumption of your JSON server endpoints.

#### Dev tools

You'll need to go ahead and install Node.js.
Once Node.js is installed, run npm install to install the rest of the template's dependencies. All dependencies will be
downloaded to the node_modules directory.

```bash copy
yarn install
```

Before running your Nextjs server, you must run your JSON server. This will serve your local web server
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
