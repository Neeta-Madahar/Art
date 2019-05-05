# Neeta-Art

This is the repo for Neeta Madar Art website. The project is built in [VueJS](https://vuejs.org/) and can be accessed 
at [neetamadahar-art.com](https://neetamadahar-art.com) or via [neetamadahar.com/art](https://neetamadahar.com/art).

## Architecture

The project is served on an S3 bucket and acts as an independent site (art site) and as a second-level page to neetamadahar.com.

The site is prerendered using Prerender.io specifically for bots. 

When user hits the Cloudfront Edge, a Lamda function is fired to determine if they are a bot or not. Bots are sent to the
Prerendered. If you need to update these lambda's, you'll need to update the links to them in each of the Cloudfront distributions.

### CMS

We are using Prismic.io to serve the content.

[art-and-yoga.prismic.io](https://art-and-yoga.prismic.io)

## Prerequisites

- NodeJS
- NPM
- Yarn

## Install dependencies

```
yarn start
```

## Startup

To startup the project run...

```
yarn start
```

## Deployment

The site will deploy automatically using CircleCI when the master branch is tagged with a version number such as `v0.0.1`.
