# Over-engineered To Do - Client

![](https://img.shields.io/badge/Coverage-81%25-83A603.svg?prefix=$coverage$)

## Overview

This is the client, aka. ReactJS component for the app. The front-end.

Its job is to live and run in the browser, and connect with the back end, once that's created.

## Architecture

While this entire app can potentially live in a single component, that's not good architecture. 

I have modular components in `./src/components`. Each one should work on its own.

I chose a flux flow for the data pairing `useContext` with `useState` I found that this works great with small to medium-sized projects.

Tests are outside `./src` in their own folder `./tests`, and as you can see above there _is_ 100% coverage.

I found that [The Hardest Part of Writing Tests is Getting Started](https://shopify.engineering/the-hardest-part-of-writing-tests-is-getting-started). 
So I did the hard part for you here so that you can use these examples to set up your own tests and have a stable platform from the get-go. 

I pulled out `App.tsx` into the `components` folder so that I could have a separate `AppProvider.tsx` file and a `MockProvider.tsx` file.
This lets me have tests that already contain a state in the list. 

## Usage

To run, run `npm run dev` from this directory or `npm run dev:client` from the repository's root directory.

To test, run `npm run test:wait` from this directory to run the test suite, and have it rerun when it files change. 
Or you can run `npm run test` from this directory for a single run with a coverage report. 

To lint, run `npm run lint` from this directory.
