# Movie Scout: Search and Explore Movies

Movie Scout is a web application that allows users to search for movies and explore their details. Built with modern tools like Angular, NgRx, Tailwind CSS, and Nx, it provides a smooth and responsive user experience.

## Live Demo

You can try out the deployed application here: https://movie-scout--movie-scout-app.us-central1.hosted.app/

## Technologies Used

- Deployed to the newly released Firebase Hosting service.
- Build with the latest stable versions of Angular (v17.3.0) and NgRx (v17.2.0) for a performant and future-proof application to take advantage of the latest features and improvements, such as the Signal Based Component and the new Control Flow.
- Uses NgRx Store and Component Store to manage the application state.
- Material 3 (The latest evolution of [Material Design](https://m3.material.io/)) for a modern and responsive UI with dark/light mode support.
- Optimized a responsive design using Angular Material and Tailwind CSS.
- Implemented a custom image loader to be used with Angular's `NgOptimizedImage` directive to make it easy to adopt performance best practices for loading movies' posters.
- Nx to manage the project for better organization and scalability.

## Things to Improve

- **Movie Detail Page:** Implement a detailed movie page displaying information and related movies (enhances user experience).
- **Mobile UX:** Further optimize the user experience for mobile devices (increases accessibility).
- **Unit & E2E Tests:** Increase test coverage for improved code stability.
- **Prefetching:** Enhance the performance by prefetching the data for the next and previous pages to reduce the loading time and improve the user experience.
- **Service Worker:** Setup Service Worker to cache the application's assets and improve the performance with the proper caching strategy.
- **Offline-First Approach:** Consider an offline-first approach for enhanced user experience in low-connectivity situations.

## Start the application

Run `npx nx serve movie-scout` to start the development server. Happy coding!

## Build for production

Run `npx nx build movie-scout` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
