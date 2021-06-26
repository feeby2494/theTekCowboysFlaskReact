import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AgeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        List of Ages
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>｡｡｡歳です。I'm ... years old.</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <li className="list-group-item list-group-item-info">1歳 いっさい</li>
          <li className="list-group-item list-group-item-light">2歳 にさい</li>
          <li className="list-group-item list-group-item-info">3歳 さんさい</li>
          <li className="list-group-item list-group-item-light">4歳 よんさい</li>
          <li className="list-group-item list-group-item-info">5歳 ごさい</li>
          <li className="list-group-item list-group-item-light">6歳 ろくさい</li>
          <li className="list-group-item list-group-item-info">7歳 ななさい</li>
          <li className="list-group-item list-group-item-light">8歳 はっさい</li>
          <li className="list-group-item list-group-item-info">9歳 きゅうさい</li>
          <li className="list-group-item list-group-item-light">10歳 じゅっさい／じっさい</li>
          <li className="list-group-item list-group-item-info">11歳 じゅういっさい</li>
          <li className="list-group-item list-group-item-light">20歳 はたち（にじゅっさい／にじっさい）</li>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AgeModal;
