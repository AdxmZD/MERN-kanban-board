import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BiAddToQueue } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";

const CreateTicket = ({ tickets, setTickets }) => {
  const [show, setShow] = useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    points: "0",
    id: uuidv4(),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createTicket = () => {
    setTickets([...tickets, ticket]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createTicket();
    setTicket({ title: "", description: "", points: "0", id: uuidv4() });
    console.log(ticket);
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow}>
        <BiAddToQueue size={24} />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a new ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter a ticket title"
                    value={ticket.title}
                    onChange={(e) =>
                      setTicket({ ...ticket, title: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  placeholder="Enter a description"
                  value={ticket.description}
                  onChange={(e) =>
                    setTicket({ ...ticket, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Story Points
              </label>
              <div className="mt-2">
                <select
                  name="story-points"
                  id="story-points"
                  required
                  value={ticket.points}
                  onChange={(e) =>
                    setTicket({ ...ticket, points: e.target.value })
                  }
                >
                  <option value="0">0</option>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="8">8</option>
                  <option value="13">13</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTicket;
