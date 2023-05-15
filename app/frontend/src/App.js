import React, { useState, Fragment } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";

const App = () => {
  // Data
  let attendeeData = [];

  const fetchData = async () => {
    let response = await fetch("http://127.0.0.1:8000/");
    let data = await response.text();
    attendeeData = data;
    return data;
  };

  fetchData();

  const initialFormState = {
    name: "",
    username: "",
    sex: "",
    yearOfBirth: 0,
    university: "",
    major: "",
  };

  // Setting state
  const [attendeeList, setAttendeeList] = useState(attendeeData);
  const [currentAttendee, setCurrentAttendee] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addAttendee = (attendee) => {
    attendee.id = attendeeList.length + 1;
    setAttendeeList([...attendeeList, attendee]);
  };

  const deleteAttendee = (id) => {
    setEditing(false);

    setAttendeeList(attendeeList.filter((attendee) => attendee.id !== id));
  };

  const updateAttendee = (id, updatedAttendee) => {
    setEditing(false);

    setAttendeeList(
      attendeeList.map((attendee) =>
        attendee.id === id ? updatedAttendee : attendee
      )
    );
  };

  const editRow = (attendee) => {
    setEditing(true);

    setCurrentAttendee({
      name: attendee.name,
      username: attendee.username,
      sex: attendee.sex,
      yearOfBirth: attendee.yearOfBirth,
      university: attendee.university,
      major: attendee.university,
    });
  };

  return (
    <div className="container">
      <h1>Viettel Attendees List</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentAttendee}
                updateUser={updateAttendee}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addAttendee} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable
            users={attendeeList}
            editRow={editRow}
            deleteUser={deleteAttendee}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
