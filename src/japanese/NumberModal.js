import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NumberModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>数字（すいじ）Numbers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <li className="list-group-item list-group-item-info">0   ゼロ／れい</li>
          <li className="list-group-item list-group-item-light">1   いち  一</li>
          <li className="list-group-item list-group-item-info">2   に   二</li>
          <li className="list-group-item list-group-item-light">3   さん   三</li>
          <li className="list-group-item list-group-item-info">4   よん／し／（よ）  四</li>
          <li className="list-group-item list-group-item-light">5   ご   五</li>
          <li className="list-group-item list-group-item-info">6   ろく   六</li>
          <li className="list-group-item list-group-item-light">7   なな／しち   七</li>
          <li className="list-group-item list-group-item-info">8   はち   八</li>
          <li className="list-group-item list-group-item-light">9   きゅう／く   九</li>
          <li className="list-group-item list-group-item-info">10   じゅう   十</li>
          <li className="list-group-item list-group-item-light">11   じゅういち   十一</li>
          <li className="list-group-item list-group-item-info">12   じゅうに   十二</li>
          <li className="list-group-item list-group-item-light">13   じゅうさん   十三</li>
          <li className="list-group-item list-group-item-info">14   じゅうよん／じゅうし   十四</li>
          <li className="list-group-item list-group-item-light">15   じゅうご   十五</li>
          <li className="list-group-item list-group-item-info">16   じゅうろく   十六</li>
          <li className="list-group-item list-group-item-light">17   じゅうなな／じゅうしち   十七</li>
          <li className="list-group-item list-group-item-info">18   じゅうはち   十八</li>
          <li className="list-group-item list-group-item-light">19   じゅうきゅう／じゅうく   十九</li>
          <li className="list-group-item list-group-item-info">20   にじゅう   二十</li>
          <li className="list-group-item list-group-item-light">30   さんじゅう   三十</li>
          <li className="list-group-item list-group-item-info">40   よんじゅう   四十</li>
          <li className="list-group-item list-group-item-light">50   ごじゅう   五十</li>
          <li className="list-group-item list-group-item-info">60   ろくじゅう   六十</li>
          <li className="list-group-item list-group-item-light">70   ななじゅう   七十</li>
          <li className="list-group-item list-group-item-info">80   はちじゅう   八十</li>
          <li className="list-group-item list-group-item-light">90   きゅうじゅう   九十</li>
          <li className="list-group-item list-group-item-info">100   ひゃく   百</li>
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

export default NumberModal;
