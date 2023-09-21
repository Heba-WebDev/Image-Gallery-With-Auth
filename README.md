# ImageGallery

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Known Issues](#known-issues)
4. [Future Improvements](#future-improvements)
5. [Screenshots](#screenshots)
6. [Getting Started](#getting-started)
7. [Local Variables](#local-variables)
8. [Contributing](#contributing)

## Overview

This is a task given to me during the HNG Internship (Sep / 2023) to build a fully functional and responsive image gallery that showcases a collection of images in a visually appealing way. The user should be able to Login to the gallery page. Authenticated users should be able to use the Drag-and-Drop feature, they should be able to select and drag images, effortlessly rearranging them within the gallery. The authentication was built with Firebase, while the frontend was built with Nextjs and Tailwind CSS.

## Features

- Full Authentication functionality: Sign up, Sign in and Sign out.
- Drag and Drop within the Gallery image.
- Search the gallery image by a tag.

## Known Issues

- Allowing weaked passwords.
- Not dealing with users intenting to login with credentials.
- Inconsistency in file naming.

## Future Improvements

This app was built in hurry in less than two days. Many features can be added but I'll try to list few:

- Improve UI/UX for a better user engagement.
- Add the photos to a database on the backend.
- Give the user the ability to upload photos.

## Screenshots

![Image Gallery](https://i.ibb.co/f9Cj3kJ/Screenshot-2023-09-21-at-7-14-43-PM-2.png)

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Create a Firebase account by following the instructions [here](https://firebase.google.com).
4. Create a `.env` file in the project root directory and add your Firebase details to your `.env` file.
5. Run the app locally using `npm start`.

## Local Variables

- `NEXT_PUBLIC_FIREBASE_API_KEY`=""
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`=""
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`=""
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`=""
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`=""
- `NEXT_PUBLIC_FIREBASE_APP_ID`=""
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`=""

## Contributing

I encourage others to contribute to the project. This is a good opportunity for both of us to learn from one another, so don't hesitate to get involved. Here are the guidelines for collaboration:

- Fork this repository and create a new branch for your feature or bug fix.
- Ensure your code follows the project's coding standards.
- Submit a pull request, providing a clear description of your changes and why they're needed.
