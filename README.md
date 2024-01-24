# CCript task

This project consist of two pages as asked in task:
1) Login page
2) Appointment page

Login Page:
  It requires username and password to get log in. If user is authenticated then get token in response which can use further for requests.

Appointment page:
  it shows us a navbar along with a table showing us the appointment in front of that starting time.
  All the data of appointment is coming dynamically from API provided in task
  We can also logout by clicking on logout button.

Refreshing token:
  As told by sir, the token get expired after every 10 minutes. So, the token get refreshed after every 9 minutes after the logging in of user.

Deployed on netlify: (https://ccripttask.netlify.app)

HOW TO RUN PROJECT?
This is vite app. So you can simply clone it and install all modules by useing command "npm i" and you are set to go.
