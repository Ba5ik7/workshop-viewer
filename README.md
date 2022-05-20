# Workshop Viewer UI

<p align="center">
  <a href="https://angular.io/" target="blank"><img src="https://angular.io/assets/images/logos/angular/angular.svg" width="200" alt="Angular Logo" /></a>
</p>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Clone and follow the README of the workshop-view-node repo found <a href="https://github.com/Ba5ik7/workshop-viewer-node" target="_blank" >here</a>.

Requests that will be made from the UI to the API locally will need to be passed to a different port using a reverse proxy. I use Nginx to complete this task. If you want to use Nginx install and use the below settings for the config file.

```config
  server {
      listen 80;
      server_name localhost;
      access_log /usr/local/var/log/nginx/copypastafarianism.access.log  main;

      location / {
                proxy_pass         http://localhost:4200/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
      }

        location /api/ {
                proxy_pass http://localhost:3000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
  }
```


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
