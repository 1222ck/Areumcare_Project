import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";

import { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import logo from "kakao_btn.png";
import {v4 as uuidv4} from 'uuid';


// 처방전 테이블로 불러오기
const Prescription = props => (
  <tr>
      <td>{props.prescription.createdAt.substring(0, 10)}</td>
      <td>{props.prescription.memo}</td>
      <td>{props.prescription.periodOfUse}</td>
      {/* <td>{props.prescription.updatedAt.substring(0,10)}</td> */}
      <td className="text-right">
        <a href="#!" onClick={() => { props.editPrescription(props.prescription._id) }}> edit </a> 
        | <a href="#!" onClick={() => { props.deletePrescription(props.prescription._id) }}> delete </a> 
        | <a id='send-to-Kakao-btn' href='#!' onClick={() => { props.sendKakaoMessage(props.prescription._id) }}>
            <img className='Kakao-btn' alt="Kakao" src={logo}/> 
          </a>
      </td>
  </tr>
);


export default class User extends Component{

  constructor(props) {
    super(props);

    this.deletePrescription = this.deletePrescription.bind(this);
    this.editPrescription = this.editPrescription.bind(this);
    this.sendKakaoMessage = this.sendKakaoMessage.bind(this);

    this.onCreateIssueDate = this.onCreateIssueDate.bind(this);
    this.onCreatePatientName = this.onCreatePatientName.bind(this);
    this.onCreateResidentRegistrationNumber = this.onCreateResidentRegistrationNumber.bind(this);
    this.onCreateHospitalName = this.onCreateHospitalName.bind(this);
    this.onCreateHospitalPhoneNumber = this.onCreateHospitalPhoneNumber.bind(this);
    this.onCreateFaxNumber = this.onCreateFaxNumber.bind(this);
    this.onCreateEmail = this.onCreateEmail.bind(this);
    this.onCreatePrescriptionDrug = this.onCreatePrescriptionDrug.bind(this);
    this.onCreatepPrescriptionDosage = this.onCreatepPrescriptionDosage.bind(this);
    this.onCreatePrescriptionFrequency = this.onCreatePrescriptionFrequency.bind(this);
    this.onCreatePrescriptionDays = this.onCreatePrescriptionDays.bind(this);
    this.onCreatePrescriptionUsage = this.onCreatePrescriptionUsage.bind(this);
    this.onCreateInjection = this.onCreateInjection.bind(this);
    this.onCreateInjectionDosage = this.onCreateInjectionDosage.bind(this);
    this.onCreateInjectionFrequency = this.onCreateInjectionFrequency.bind(this);
    this.onCreateInjectionDays = this.onCreateInjectionDays.bind(this);
    this.onCreateInjectionUsage = this.onCreateInjectionUsage.bind(this);
    this.onCreatePeriodOfUse = this.onCreatePeriodOfUse.bind(this);
    this.onCreateMemo = this.onCreateMemo.bind(this);
    
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeresidentRegistrationNumber = this.onChangeresidentRegistrationNumber.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    // 초기상태 설정
    this.state = {
      // prescription List
      prescription: [],
      // patient info
      username: '',
      phoneNumber: '',
      address: '',
      // prescription Form
      issueDate: '',
      patientName: '',
      residentRegistrationNumber: '',
      hospitalName: '',
      hospitalPhoneNumber: '',
      faxNumber: '',
      email: '',
      prescriptionDrug: '',
      prescriptionDosage: '',
      prescriptionFrequency: '',
      prescriptionDays: '',
      prescriptionUsage: '',
      injection: '',
      injectionDosage: '',
      injectionFrequency: '',
      injectionDays: '',
      injectionUsage: '',
      periodOfUse: '',
      memo: '',
      token: '',
      findId: ''
      // patient List
      // users: []
    };
  }


  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
        .then(res => {          
          this.setState({
              username: res.data.username,
              residentRegistrationNumber: res.data.residentRegistrationNumber,
              phoneNumber: res.data.phoneNumber,
              address: res.data.address,
              patientName: res.data.username,
              token : res.data._id
          });
        })
        .catch(function (error) {
          console.log(error);
        });
        
    axios.get('http://localhost:5000/prescription/'+this.props.match.params.id)
        .then(res => {
            this.setState({ prescription: res.data });
        })
        .catch((err) => {
            console.log(err);
        });

  }


  // kakao 메시지 보내기
  sendKakaoMessage(id) {
    // SDK 초기화. JavaScript_Key 설정
    window.Kakao.init('48a4d78a48c6f7da56e6b6310624c9b1');
    console.log(window.Kakao.isInitialized());

    // window.Kakao.Link.sendScrap({
    //   requestUrl: 'https://nostalgic-brahmagupta-f29805.netlify.app',
    //   templateId: 58988
    // });
    axios.get('http://localhost:5000/prescription/edit/'+id)
    .then(res => {
      window.Kakao.Link.sendDefault({
        objectType: 'feed', //message Type
        content: {          //message Contents
          title: '본인 확인 ID',
          description: res.data.findId,
          imageUrl:
            '',
          link: {
              webUrl: 'http://localhost:3000/admin/user-page/613815757d9cd2f529e4fe14',
              mobileWebUrl: 'https://www.naver.com/',
              androidExecutionParams: 'test',
          },
        },
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              webUrl: 'https://www.naver.com/',
              mobileWebUrl: 'https://www.naver.com/',
            },
          },
          {
            title: '앱으로 이동',
            link: {
              webUrl: 'https://www.naver.com/',
              mobileWebUrl: 'https://www.naver.com/',
            },
          },
        ]
      });
      
    });

    setTimeout(function() {
      window.location.reload()
    }, 1000)
    
  }


  // 처방전 리스트 생성
  prescriptionList() {
    return this.state.prescription.map(currentprescription => {
        return <Prescription 
                  prescription={currentprescription} 
                  editPrescription={this.editPrescription} 
                  deletePrescription={this.deletePrescription} 
                  sendKakaoMessage={this.sendKakaoMessage} 
                  key={currentprescription._id}
                />
    });
  }


  // id가 필요 (id에 대한 삭제 요청)
  deletePrescription(id) {  
    axios.delete('http://localhost:5000/prescription/'+id)
          .then(res => console.log(res.data));
      // 상태를 바로바로 적용
    this.setState({
        prescription: this.state.prescription.filter(el => el._id !== id) // _id는 mongoDB에 있는거
    });
  }


  // 처방전 수정(자동 채우기)
  editPrescription(id) {
    axios.get('http://localhost:5000/prescription/edit/'+id)
          .then(res => {
            this.setState({
                issueDate: res.data.issueDate,
                patientName: res.data.patientName,
                residentRegistrationNumber: res.data.residentRegistrationNumber,
                hospitalName: res.data.hospitalName,
                hospitalPhoneNumber: res.data.hospitalPhoneNumber,
                faxNumber: res.data.faxNumber,
                email: res.data.email,
                prescriptionDrug: res.data.prescriptionDrug,
                prescriptionDosage: res.data.prescriptionDosage,
                prescriptionFrequency: res.data.prescriptionFrequency,
                prescriptionDays: res.data.prescriptionDays,
                prescriptionUsage: res.data.prescriptionUsage,
                injection: res.data.injection,
                injectionDosage: res.data.injectionDosage,
                injectionFrequency: res.data.injectionFrequency,
                injectionDays: res.data.injectionDays,
                injectionUsage: res.data.injectionUsage,
                periodOfUse: res.data.periodOfUse,
                memo: res.data.memo
            });
          })
          .catch(function (error) {
          console.log(error);
          });
  }


  // text를 입력하면 호출
  // 다른 요소들은 건들지 않고 해당 값만 업데이트 됨
  onCreateIssueDate(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          issueDate: e.target.value
      });
  }
  onCreatePatientName(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          patientName: e.target.value
      });
  }
  onCreateResidentRegistrationNumber(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          residentRegistrationNumber: e.target.value
      });
  }
  onCreateHospitalName(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          hospitalName: e.target.value
      });
  }
  onCreateHospitalPhoneNumber(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          hospitalPhoneNumber: e.target.value
      });
  }
  onCreateFaxNumber(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          faxNumber: e.target.value
      });
  }
  onCreateEmail(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          email: e.target.value
      });
  }
  onCreatePrescriptionDrug(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          prescriptionDrug: e.target.value
      });
  }
  onCreatepPrescriptionDosage(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          prescriptionDosage: e.target.value
      });
  }
  onCreatePrescriptionFrequency(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          prescriptionFrequency: e.target.value
      });
  }
  onCreatePrescriptionDays(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          prescriptionDays: e.target.value
      });
  }
  onCreatePrescriptionUsage(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          prescriptionUsage: e.target.value
      });
  }
  onCreateInjection(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          injection: e.target.value
      });
  }
  onCreateInjectionDosage(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          injectionDosage: e.target.value
      });
  }
  onCreateInjectionFrequency(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          injectionFrequency: e.target.value
      });
  }
  onCreateInjectionDays(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          injectionDays: e.target.value
      });
  }
  onCreateInjectionUsage(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          injectionUsage: e.target.value
      });
  }
  onCreatePeriodOfUse(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          periodOfUse: e.target.value
      });
  }
  onCreateMemo(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          memo: e.target.value
      });
  }



  onChangeUserName(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          username: e.target.value
      });
  }
  onChangeresidentRegistrationNumber(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          residentRegistrationNumber: e.target.value
      });
  }
  onChangePhoneNumber(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          phoneNumber: e.target.value
      });
  }
  onChangeAddress(e) {
      this.setState({
          // value가 텍스트 상자 안의 값
          address: e.target.value
      });
  }


  
  // 처방전 생성
  onSubmit(e) {
    // 웹에서 발생하는 양식 제출이 발생하지 않게
    e.preventDefault();

    //입력된 값 처방전 항목에 각각 저장
    const prescription = {
        issueDate: this.state.issueDate,
        patientName: this.state.patientName,
        residentRegistrationNumber: this.state.residentRegistrationNumber,
        hospitalName: this.state.hospitalName,
        hospitalPhoneNumber: this.state.hospitalPhoneNumber,
        faxNumber: this.state.faxNumber,
        email: this.state.email,
        prescriptionDrug: this.state.prescriptionDrug,
        prescriptionDosage: this.state.prescriptionDosage,
        prescriptionFrequency: this.state.prescriptionFrequency,
        prescriptionDays: this.state.prescriptionDays,
        prescriptionUsage: this.state.prescriptionUsage,
        injection: this.state.injection,
        injectionDosage: this.state.injectionDosage,
        injectionFrequency: this.state.injectionFrequency,
        injectionDays: this.state.injectionDays,
        injectionUsage: this.state.injectionUsage,
        periodOfUse: this.state.periodOfUse,
        memo: this.state.memo,
        token: this.state.token,
        findId: uuidv4()
    }
    console.log(prescription);

    axios.post('http://localhost:5000/prescription/add', prescription)
        .then(res => console.log(res.data));

    // 완료 후 처음 화면으로 이동
    window.location.replace('/admin/tables')
    // window.location = "/admin/tables";
  }
  

  render() {
    return (
        <div className="content">
          <Row>

            {/* 환자 개인정보 */}
            <Col md="4" style={{maxHeight:"478px", marginBottom:"25px"}}>
              <Card className="card-user h-100">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/damir-bosnjak.jpg").default}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/default-avatar.png").default}
                      />
                      <h5>{this.state.username}</h5>
                        </a>
                      {/* <Col md="8" style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
                      <Input 
                            required
                            type="text"
                            className="form-control title"
                            value={this.state.username}
                            onChange={this.onChangeUserName}
                            style={{textAlign:"center", fontSize: "20px"}}
                          />
                      </Col> */}
                    <p className="description">이름</p>
                  </div>
                  <p className="description text-center">
                    {this.state.phoneNumber} <br />
                    {this.state.address} <br />
                  </p>
                </CardBody>
                <CardFooter>
                  {/* <hr /> */}
                  {/* <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Files</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2GB <br />
                          <small>Used</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          24,6$ <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div> */}
                </CardFooter>
              </Card>
            </Col>

            {/* 지난 처방전 리스트 */}
            <Col md="8" style={{maxHeight:"478px", marginBottom:"25px"}}>
              <Card className="card-user h-100"  style={{paddingBottom:"16px"}}>
                <CardHeader>
                  <CardTitle tag="h5">Prescription History</CardTitle>
                  <Table>
                  </Table>
                </CardHeader>
                <CardBody style={{overflow:"scroll", whiteSpace:"nowrap"}}>
                <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>처방날짜</th>
                          <th>처방내용</th>
                          <th>만료일</th>
                          <th className="text-right">Etc</th>
                        </tr>
                      </thead>
                      <tbody>
                        { this.prescriptionList() }
                      </tbody>
                </Table>
                </CardBody>
              </Card>
            </Col>
  
            {/* 처방전 작성 양식 */}
            <Col md="12">
              <Card className="card-user" onSubmit={this.onSubmit}>
                <CardHeader>
                  <CardTitle tag="h5">Prescription</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                    <Col md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                          교부 년월일 및 번호
                          </label>
                          <Input  
                              required
                              type="datetime"
                              className="form-control"
                              value={this.state.issueDate}
                              onChange={this.onCreateIssueDate}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col  md="2">
                        <FormGroup>
                          <label>환자 성명</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.patientName}
                            onChange={this.onCreatePatientName}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>주민등록번호</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.residentRegistrationNumber}
                            onChange={this.onCreateResidentRegistrationNumber}
                          />
                        </FormGroup>
                      </Col>
                   </Row>
                    <Row>                    
                      <Col md="3">
                        <FormGroup>
                          <label>의료기관</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.hospitalName}
                            onChange={this.onCreateHospitalName}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>전화번호</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.hospitalPhoneNumber}
                            onChange={this.onCreateHospitalPhoneNumber}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>팩스번호</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.faxNumber}
                            onChange={this.onCreateFaxNumber}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>e-mail주소</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onCreateEmail}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>                        
                          <label>처방의약품의 명칭</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.prescriptionDrug}
                            onChange={this.onCreatePrescriptionDrug}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>투약량</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.prescriptionDosage}
                            onChange={this.onCreatepPrescriptionDosage}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>투여횟수</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.prescriptionFrequency}
                            onChange={this.onCreatePrescriptionFrequency}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>투약일수</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.prescriptionDays}
                            onChange={this.onCreatePrescriptionDays}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>용법</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.prescriptionUsage}
                            onChange={this.onCreatePrescriptionUsage}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>추가</label>                   
                        </FormGroup>
                        <i className="nc-icon nc-simple-add" ></i>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>주사제 처방내역</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.injection}
                            onChange={this.onCreateInjection}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>투약량</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.injectionDosage}
                            onChange={this.onCreateInjectionDosage}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>투여횟수</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.injectionFrequency}
                            onChange={this.onCreateInjectionFrequency}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>투약일수</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.injectionDays}
                            onChange={this.onCreateInjectionDays}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>용법</label>
                          <Input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.injectionUsage}
                            onChange={this.onCreateInjectionUsage}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="1">
                        <FormGroup>
                          <label>추가</label>                   
                        </FormGroup>
                        <i className="nc-icon nc-simple-add" ></i>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="2">
                        <FormGroup>
                          <label>사용기간</label>
                          <Input 
                            required
                            type="text"
                            className="form-control"
                            value={this.state.periodOfUse}
                            onChange={this.onCreatePeriodOfUse}
                          />
                          <label>교부일로부터 사용기간내에 약국에 제출하여야 합니다.</label>
                        </FormGroup>
                      </Col>
                      <Col md="10">
                        <FormGroup>
                          <label>Memo</label>
                          <Input
                            type="textarea"
                            className="form-control"
                            value={this.state.memo}
                            onChange={this.onCreateMemo}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    {/* 하단 버튼 */}
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update Prescription
                        </Button>
                      </div>
                      {/* <div className="update ml-auto mr-auto">
                      <a id='send-to-Kakao-btn' href='#!' onClick={this.sendKakaoMessage}>
                        <img className='Kakao-btn' alt="Kakao" src={logo}/>
                      </a>
                      </div> */}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

