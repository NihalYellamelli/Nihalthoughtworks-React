const express = require("express");
const app = express();
const sqlite = require("sqlite");
const { open } = require("sqlite3");
const path = require("path");

app.use(express.json());

const dbPath = path(__dirname);
let db = null;
const initializeDbAndServer = () => {
  try {
    open({
      filename: request.body,
      driver: sqlite3.db,
    });
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.Message}`);
  }
};

initializeDbAndServer();

const event = {
  eventName: eventName,
  date: date,
  time: time,
  description: description,
};

app.get("/event/", async (request, response) => {
  const event = request.body;
  const getEvent = `
    SELECT * FROM event`;
  const dbResponse = await db.all(getEvent);
  response.send(dbResponse);
});

app.get("/event/:eventname", async (request, response) => {
  const { eventname } = request.params;
  const event = request.body;
  const getEvent = `
    SELECT * FROM event where eventName = "${eventname}"`;
  const dbResponse = await db.all(getEvent);
  response.send(dbResponse);
});

app.post("/events/", async (request, response) => {
  const event = request.body;
  let { eventName, date, time, description } = event;
  const createEventQuery = `
    INSERT INTO
    event(eventName, date, time, description)
    Values (
        '${eventName}',
        '${date}',
        '${time}',
        '${description}'
    );`;
  const dbResponse = db.run(createEventQuery);
  response.send("Event Created Succesfully");
});

app.put("/events/", async (request, response) => {
  const event = request.body;
  let { eventName, date, time, description } = event;
  const createEventQuery = `
    Update
    event
    SET
        eventname ='${eventName}',
        date = '${date}',
        time = '${time}',
        description = '${description}'
    );`;
  const dbResponse = db.run(createEventQuery);
  response.send("Event Updated Succesfully");
});

app.delete("/events/eventname", async (request, response) => {
  const { eventname } = request.params;
  const deleteQuery = `DELETE FROM event WHERE eventName = ${eventname};`;
  const dbResponse = db.run(deleteQuery);
  response.send("Event Removed");
});
