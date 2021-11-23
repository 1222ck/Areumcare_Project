/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";

// 유저 테이블로 불러오기
const User = props => (
  <tr>
      <td>{props.user.username}</td>
      <td>{props.user.residentRegistrationNumber}</td>
      <td>{props.user.phoneNumber}</td>
      <td>{props.user.address}</td>
      <td className="text-right">
          {/* <Link to={"/edit/"+props.prescription._id}> edit </Link> | <a href="#!" onClick={() => { props.deletePrescription(props.prescription._id) }}> delete </a> */}
          <Link to={"/admin/user-page/"+props.user._id}> 처방 </Link>
      </td>
  </tr>
);

export default class Tables extends Component{

  constructor(props) {
    super(props);

    this.state = {user: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
        .then(res => {
            this.setState({ user: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
  }

  // 유저 리스트 생성
  userList() {
    return this.state.user.map(currentuser => {
    return <User user={currentuser} key={currentuser._id}/>
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12" style={{height:"84vh"}}>
              <Card style={{height:"100%"}}>
                <CardHeader>
                  <CardTitle tag="h4">Patient List</CardTitle>
                </CardHeader>
                <CardBody style={{overflow:"scroll", whiteSpace:"nowrap"}}>
                  
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>이름</th>
                        <th>주민등록번호</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th className="text-right">처방 작성</th>
                      </tr>
                    </thead>
                    <tbody >
                      { this.userList() }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            {/* <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Table on Plain Background</CardTitle>
                  <p className="card-category">
                    Here is a subtitle for this table
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-right">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-right">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </div>
      </>
    );

  }
}


