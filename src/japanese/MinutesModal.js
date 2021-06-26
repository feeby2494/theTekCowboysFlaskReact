import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function MinutesModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        See All Minutes
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>分間（ふんかん）Minutes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <li className="list-group-item list-group-item-info">一分 いっぷん</li>
          <li className="list-group-item list-group-item-light">二分 にふん</li>
          <li className="list-group-item list-group-item-info">三分 さんぷん</li>
          <li className="list-group-item list-group-item-light">四分 よんぷん</li>
          <li className="list-group-item list-group-item-info">五分 ごふん</li>
          <li className="list-group-item list-group-item-light">六分 ろっぷん</li>
          <li className="list-group-item list-group-item-info">七分 ななふん</li>
          <li className="list-group-item list-group-item-light">八分 はっぷん／はちふん</li>
          <li className="list-group-item list-group-item-info">九分 きゅうふん</li>
          <li className="list-group-item list-group-item-light">十分 じゅっぷん／じっぷん</li>
          <li className="list-group-item list-group-item-info">十一分 じゅういっぷん</li>
          <li className="list-group-item list-group-item-light">一二分 じゅうにふん</li>
          <li className="list-group-item list-group-item-info">十三分 じゅうさんぷん</li>
          <li className="list-group-item list-group-item-light">十四分 じゅうよんぷん</li>
          <li className="list-group-item list-group-item-info">十五分 じゅうごふん</li>
          <li className="list-group-item list-group-item-light">十六分 じゅうろっぷん</li>
          <li className="list-group-item list-group-item-info">十七分 じゅうななふん</li>
          <li className="list-group-item list-group-item-light">十八分 じゅうはっぷん／じゅうはちふん</li>
          <li className="list-group-item list-group-item-info">十九分 じゅうきゅうふん</li>
          <li className="list-group-item list-group-item-light">二十分 にじっぷん</li>
          <li className="list-group-item list-group-item-info">三十分 さんじゅっぷん／さんじっぷん</li>
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

export default MinutesModal;
