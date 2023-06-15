import React, { useState, Fragment, useEffect } from "react";
import AddAttendeeForm from "./forms/AddAttendeeForm";
import EditAttendeeForm from "./forms/EditAttendeeForm";
import AttendeeTable from "./tables/AttendeeTable";
import {
  editAttendee,
  addAttendee,
  deleteAttendee,
  getAttendeeList,
} from "./services/api";
import "./App.css";

const App = () => {
  // Data
  let attendeeData = [];
  const [attendeeList, setAttendeeList] = useState(attendeeData);

  const fetchData = () => {
    getAttendeeList().then((response) => {
      setAttendeeList(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialFormState = {
    name: "",
    username: "",
    sex: "",
    yearOfBirth: 0,
    university: "",
    major: "",
  };

  // Setting state
  const [currentAttendee, setCurrentAttendee] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addAttendeeToList = (attendee) => {
    if (
      attendeeList.filter((a) => a.username === attendee.username).length > 0
    ) {
      alert("Username already exists!");
      return;
    }
    setAttendeeList([...attendeeList, attendee]);
    addAttendee(attendee);
  };

  const deleteAttendeeFromList = (attendee) => {
    setEditing(false);
    setAttendeeList(
      attendeeList.filter((a) => a.username !== attendee.username)
    );
    console.log(attendee);
    deleteAttendee(attendee);
  };

  const updateAttendee = (username, updatedAttendee) => {
    setEditing(false);

    setAttendeeList(
      attendeeList.map((attendee) =>
        attendee.username === username ? updatedAttendee : attendee
      )
    );

    editAttendee(updatedAttendee);
  };

  const editRow = (attendee, deleteAction) => {
    setEditing(true);

    setCurrentAttendee({
      name: attendee.name,
      username: attendee.username,
      sex: attendee.sex,
      yearOfBirth: attendee.yearOfBirth,
      university: attendee.university,
      major: attendee.major,
    });

    if (deleteAction) {
      setEditing(false);
      deleteAttendeeFromList(attendee);
    }
  };

  return (
    <div className="container">
      <h1 id="title">Viettel Digital Talent 2023</h1>
      <div className="flex-row">
        <div className="edit-add-form">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditAttendeeForm
                editing={editing}
                setEditing={setEditing}
                currentAttendee={currentAttendee}
                updateAttendee={updateAttendee}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add attendee</h2>
              <AddAttendeeForm addAttendee={addAttendeeToList} />
            </Fragment>
          )}
        </div>
        <div className="table-list">
          <h2>Attendee List</h2>
          <AttendeeTable
            attendees={attendeeList}
            currentAttendee={currentAttendee}
            editRow={editRow}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
