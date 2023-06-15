import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:5000";

export async function getAttendeeList() {
  const response = await axios.get("/");
  return response;
}

export function editAttendee(attendee) {
  axios.put(`/editAttendee=${attendee.username}`, {
    name: attendee.name,
    username: attendee.username,
    sex: attendee.sex,
    yearOfBirth: attendee.yearOfBirth,
    university: attendee.university,
    major: attendee.major,
  });
}

export function addAttendee(attendee) {
  axios.post(`/newAttendee=${attendee.username}`, {
    name: attendee.name,
    username: attendee.username,
    sex: attendee.sex,
    yearOfBirth: attendee.yearOfBirth,
    university: attendee.university,
    major: attendee.major,
  });
}

export function deleteAttendee(attendee) {
  axios.delete(`/deleteAttendee=${attendee.username}`);
}
