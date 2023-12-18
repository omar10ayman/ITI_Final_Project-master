import React, { useState } from "react";

export const InputGuests = () => {
  let [showAddTable, setAddTable] = useState(false);
  let [guest, setGuest] = useState(1);
  let [room, setRoom] = useState(1);

  const showTable = (x) => {
    setAddTable(x);
  };
  const addGuest = (x, y) => {
    if (guest <= room && y >= 1) {
      x(++y);
      setGuest(++guest);
    } else {
      x(++y);
    }
  };
  const removeGuestOrRoom = (x, y) => {
    if (guest <= room && y > 1) {
      x(--y);
      setRoom(--room);
    } else {
      x(--y);
    }
  };
  return (
    <div className="coolinput Guests col-6 col-md-2">
      <label htmlFor="roomguest" className="text">
        Rooms&Guests:
      </label>
      <input
        type="text"
        placeholder="1Room and 2Guests"
        name="roomguest"
        value={`${room}Room and ${guest}Guests`}
        className="input"
        onClick={() => showTable(true)}
      />

      <div
        className={
          showAddTable ? `addGuest d-flex flex-column gap-4` : ` d-none `
        }
      >
        <div className="d-flex justify-content-between">
          <span>adults</span>
          <div className="addArea d-flex justify-content-between">
            <button onClick={() => addGuest(setGuest, guest)} type="button">
              <i className="fa-solid fa-plus text-primary"></i>
            </button>
            <span>{guest}</span>
            <button
              onClick={() => removeGuestOrRoom(setGuest, guest)}
              disabled={guest == 1 ? true : false}
              type="button"

            >
              <i className="fa-solid fa-minus text-primary"></i>
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <span>Rooms</span>
          <div className="addArea d-flex justify-content-between">
            <button type="button" onClick={() => addGuest(setRoom, room)} >
              <i className="fa-solid fa-plus text-primary"></i>
            </button>
            <span>{room}</span>
            <button
              type="button"
              onClick={() => removeGuestOrRoom(setRoom, room)}
              disabled={room == 1 ? true : false}
            >
              {" "}
              <i className="fa-solid fa-minus text-primary "></i>
            </button>
          </div>
        </div>
        <button
          type="button"
          className="DoneBtnAddGuest"
          onClick={() => showTable(false)}
        >
          Done
        </button>
      </div>
    </div>
  );
};
