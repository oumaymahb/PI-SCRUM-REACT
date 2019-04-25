import React, { Component } from 'react';
import {
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Form,
	FormGroup,
	Input,
	Label
} from 'reactstrap';
import axios from 'axios';
export default class BacklogSprint extends Component {
	state = {
		taskname: '',
		descrip: '',
		modal: false,
		user: {}
	};
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
	}
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	affect = (e) => {
		console.log('ok');
		e.preventDefault();
		axios
			.post('http://localhost:3000/backlog_sprint/addTask/1', {
				taskname: this.state.taskname,
				descrip: this.state.descrip
			})
			.then((data) => {
				console.log(data.data[0]._id);
				this.props.history.push('/userstory/' + data.data[0]._id);
			});
	};

	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
		axios
			.post('http://localhost:3000/backlog_sprint/rec', {
				desc: this.state.descrip
			})
			.then((data) => {
				console.log(data.data._id);
				this.setState({ user: data.data });
			});
	};
	onFormSubmit = (e) => {
		console.log('ok');
		e.preventDefault();
		axios
			.post('http://localhost:3000/backlog_sprint/addTask/1', {
				taskname: this.state.taskname,
				descrip: this.state.descrip,
				devoloper: this.state.user._id
			})
			.then((data) => {
				console.log(data.data[0]._id);
				this.props.history.push('/userstory/' + data.data[0]._id);
			});
	};

	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						<strong>Add Task in the Backlog </strong> sprint
					</CardHeader>
					<CardBody>
						<Form action="" method="post">
							<FormGroup>
								<Label htmlFor="nf-email">Task Name :</Label>
								<Input
									type="text"
									id="nf-email"
									name="taskname"
									onChange={this.onInputChange}
									placeholder="Enter Task name.."
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="nf-password">Task General Description : </Label>
								<Input
									type="textarea"
									name="descrip"
									id="textarea-input"
									rows="9"
									placeholder="Content..."
									onChange={this.onInputChange}
								/>
							</FormGroup>
						</Form>
					</CardBody>
					<CardFooter>
						<Button type="button" onClick={this.toggle} size="sm" color="primary">
							<i className="fa fa-dot-circle-o" /> Submit
						</Button>
						<Button type="reset" size="sm" color="danger">
							<i className="fa fa-ban" /> Reset
						</Button>
					</CardFooter>
				</Card>

				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
					<ModalBody>
						our recommandation system recommande <b>{this.state.user.name}</b> for
						<b>{this.state.taskname}</b>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.onFormSubmit}>
							Affect developer
						</Button>
						<Button color="secondary" onClick={this.onFormSubmit}>
							let it for vote
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
