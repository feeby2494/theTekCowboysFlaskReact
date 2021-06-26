import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function HourModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        See All Hours
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>字間（じかん）Time</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <li className="list-group-item list-group-item-info">1:00 いちじ 一時</li>
          <li className="list-group-item list-group-item-light">2:00 にじ 二時</li>
          <li className="list-group-item list-group-item-info">3:00 さんじ 三時</li>
          <li className="list-group-item list-group-item-light">4:00 よじ 四時</li>
          <li className="list-group-item list-group-item-info">5:00 ごじ 五時</li>
          <li className="list-group-item list-group-item-light">6:00 ろくじ 六時</li>
          <li className="list-group-item list-group-item-info">7:00 しちじ 七時</li>
          <li className="list-group-item list-group-item-light">8:00 はちじ 八時</li>
          <li className="list-group-item list-group-item-info">9:00 くじ 九時</li>
          <li className="list-group-item list-group-item-light">10:00 じゅうじ 十時</li>
          <li className="list-group-item list-group-item-info">11:00 じゅういちじ 十一時</li>
          <li className="list-group-item list-group-item-light">12:00 じゅうにじ 一二時</li>
          <li className="list-group-item list-group-item-info">1:30 いちじはん 一時半</li>
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

export default HourModal;
