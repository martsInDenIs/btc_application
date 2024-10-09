# BTC_APPLICATION 
There are two ways to run the application: locally or in a docker container. But first of all, you need to create an `.env` file by copying `.env.example` and fill it.

#### ENV file
Required env:
* PORT - The port that your application will listen to
* CURRENCY, COIN - Configured by default. Can be changed to work with other coins
* EMAIL_USER - Mail that will be used to send letters. The mail service in the app is configured for using with gmail, so please use it =) Use mail with 2-step-verification enabled
* EMAIL_PASSWORD - Password for authorisation, which will allow you to send emails. Follow the [link](https://security.google.com/settings/security/apppasswords) to generate a password
* CRON_SCHEDULE - Schedule for the worker that will scrape the prometheus data. Use crontab format. Configured by default. Can generate your own by following the [link](https://crontab.guru/)
* DAILY_RATE_CRON - Schedule for running a daily notification that will send an email with the current rate to all subscribers. Configured by default. Can generate your own by following the [link](https://crontab.guru/)

Env for local using:
* DATABASE_URL - The address where the database is located. Replace the templates with your own data. 
* WORKER_METRICS_URL - URL address of the service. For local use, just change the port so that it is equal to PORT env.

Env for docker:
* DATABASE_USER - name that will be used for access to the DB system.
DATABASE_PASSWORD - password that will be used for access to the DB system.
DATABASE_NAME - database name =)

### Local using
Go to the project folder and run the commands:
1. Run `npm install` in the terminal.
2. Run `npx prisma migrate deploy && npx prisma generate` in the terminal.
3. Run `npm run start:dev` command in the terminal to start the **service**.
4. Run `npm run worker` command in the terminal to start the **worker**.

### Docker using
Go to the project folder and run the commands:
1. Run `docker-compose up` command in the terminal.

# Interacting
I reccomend to copy `description.yaml` file and put it inside [swagger](https://editor.swagger.io/). This will allow you to use prepared endpoints and see responses in real time. The only thing you may need to change is host (line 7). It must be equal to the PORT in the env file.

# Ways for improvement
1. Use advanced authorisation methods for email services
2. Link the last record in the Metrics table from the database to Prometheus so that you don't lose metrics every time you restart the application