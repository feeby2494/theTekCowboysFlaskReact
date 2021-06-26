import React,{Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BigNumbersModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        すうじ （Bigger Numbers）
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>すうじ （Bigger Numbers）</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">

          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                一日
              </p>
              <p className="col-6">
                いちにち (ついたち/いっぴ)
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                二日
              </p>
              <p className="col-6">
                ふつか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                三日
              </p>
              <p className="col-6">
                みっか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                四日
              </p>
              <p className="col-6">
                よっか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                五日
              </p>
              <p className="col-6">
                いつか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                六日
              </p>
              <p className="col-6">
                むいか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                七日
              </p>
              <p className="col-6">
                なのか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                八日
              </p>
              <p className="col-6">
                ようか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                九日
              </p>
              <p className="col-6">
                ここのか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                十日
              </p>
              <p className="col-6">
                とおか
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                十一日
              </p>
              <p className="col-6">
                じゅういちにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                十二日
              </p>
              <p className="col-6">
                じゅうににち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                十三日
              </p>
              <p className="col-6">
                じゅうさんにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                十四日
              </p>
              <p className="col-6">
                じゅうよっか/じゅうよんにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                十五日
              </p>
              <p className="col-6">
                じゅうごにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                十六日
              </p>
              <p className="col-6">
                じゅうろくにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                十七日
              </p>
              <p className="col-6">
                じゅうしちにち/じゅうななにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                十八日
              </p>
              <p className="col-6">
                じゅうはちにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                十九日
              </p>
              <p className="col-6">
                じゅうくにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                二十日
              </p>
              <p className="col-6">
                はつか (にじゅうにち)
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                四十九日
              </p>
              <p className="col-6">
                よんじゅうくにち (しじゅうくにち)
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                百日
              </p>
              <p className="col-6">
                ひゃくにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                千日
              </p>
              <p className="col-6">
                せんにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-light">
            <div className="row">
              <p className="col-6">
                一万日
              </p>
              <p className="col-6">
                いちまんにち
              </p>
            </div>
          </li>
          <li className="list-group-item list-group-item-info">
            <div className="row">
              <p className="col-6">
                何日
              </p>
              <p className="col-6">
                なんにち
              </p>
            </div>
          </li>

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

export default BigNumbersModal;
