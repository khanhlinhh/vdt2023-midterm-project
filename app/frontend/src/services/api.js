import axios from "axios";

export function editAttendee(attendee) {
  axios.put(`http://127.0.0.1:8000/editAttendee=${attendee.username}`, {
    name: attendee.name,
    username: attendee.username,
    sex: attendee.sex,
    yearOfBirth: attendee.yearOfBirth,
    university: attendee.university,
    major: attendee.major,
  });
}

export function addAttendee(attendee) {
  axios.post(`http://127.0.0.1:8000/newAttendee=${attendee.username}`, {
    name: attendee.name,
    username: attendee.username,
    sex: attendee.sex,
    yearOfBirth: attendee.yearOfBirth,
    university: attendee.university,
    major: attendee.major,
  });
}

export function deleteAttendee(attendee) {
  axios.delete(`http://127.0.0.1:8000/deleteAttendee=${attendee.username}`);
}
