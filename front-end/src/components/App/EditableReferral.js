import React, { Component } from 'react'
import Formsy from 'formsy-react'
import { Card, 
         CardActions, 
         CardHeader, 
         CardTitle, 
         CardText,
         FlatButton,
         Paper,
         RaisedButton,
         MenuItem } from 'material-ui'

import { FormsyDate, 
         FormsySelect, 
         FormsyText, 
         FormsyTime, 
         FormsyToggle } from 'formsy-material-ui/lib'
        

const style = {
    referralOptions :{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    uploadButton :{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card :{
        marginBottom : 15
    },
    cardActions :{
        textAlign: 'right'
    },
    paperStyle: {
    //   width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
  },
}

const errorMessages = {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
  }

class EditableReferral extends Component {

    constructor(props) {
        super(props)
        this.enableButton = this.enableButton.bind(this)
        this.disableButton = this.disableButton.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.notifyFormError = this.notifyFormError.bind(this)
        this.handleExpandChange = this.handleExpandChange.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleExpand = this.handleExpand.bind(this)
        this.handleReduce = this.handleReduce.bind(this)
   
        this.state = {
            expanded: false,
            canSubmit: true
        }
    }

    disableButton = () => {
        this.setState({canSubmit: false})
    }

    enableButton = () => {
        this.setState({canSubmit: true})
    }

    submitForm = (data) => {
        alert(JSON.stringify(data,null,4))
    }

    notifyFormError = (data) => {
        console.error('Form error:', data)
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded})
    }

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle})
    }

    handleExpand = () => {
        this.setState({expanded: true})
    }

    handleReduce = () => {
        this.setState({expanded: false})
    }

    render(){
        return(
           <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={style.card}>
                <CardHeader
                    title={this.props.referral.patientSurname +
                            ' ,' +
                            this.props.referral.patientgivenName +
                            ' (' + this.props.referral.patientGender + ')'}
                    subtitle={this.props.referral.dateOfBirth}
                    avatar={this.props.referral.imgProfile}
                    actAsExpander={true}
                    showExpandableButton={true}
                >
                </CardHeader>

                <CardText expandable={true}>
                    <Paper style={style.paperStyle}>
                        <Formsy.Form
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                            onValidSubmit={this.submitForm}
                            onInvalidSubmit={this.notifyFormError}
                        >
                        <div style={style.referralOptions}>
                            <RaisedButton label="Edit details" primary={true} style={style.uploadButton} />
                            <FormsySelect
                                name="referralStatus"
                                floatingLabelText="Status"
                                value={this.props.referral.referralStatus}
                            >
                                <MenuItem value={'accepted'} primaryText="Accepted" />
                                <MenuItem value={'assigned'} primaryText="Assigned" />
                                <MenuItem value={'declined'} primaryText="Declined" />
                                <MenuItem value={'withdrawn'} primaryText="Withdrawn" />
                                <MenuItem value={'rejected'} primaryText="Rejected" />
                                <MenuItem value={'completed'} primaryText="Completed" />
                                <MenuItem value={'noShow'} primaryText="No show" />
                            </FormsySelect>
                        </div>
                        
                        {/* patient data form below */}
                        <CardTitle title="Patient data" subtitle="" />
                        <FormsyText
                            name="patientSurname"
                            validations="isWords"
                            validationError={errorMessages.wordsError}
                            required
                            hintText="Surname"
                            floatingLabelText="Surname"
                            defaultValue={this.props.referral.patientSurname}
                        />

                        <FormsyText
                            name="patientgivenName"
                            validations="isWords"
                            validationError={errorMessages.wordsError}
                            required
                            hintText="Given name"
                            floatingLabelText="Given name"
                            value={this.props.referral.patientgivenName}
                        />

                        <FormsySelect
                                name="patientGender"
                                floatingLabelText="Gender"
                                value={this.props.referral.patientGender}
                            >
                                <MenuItem value={'M'} primaryText="Male" />
                                <MenuItem value={'F'} primaryText="Female" />
                            </FormsySelect>

                        

                        <FormsyText
                            name="patientAddress"
                            validations="matchRegexp"
                            validationError={errorMessages.wordsError}
                            hintText="Address"
                            floatingLabelText="Address"
                            defaultValue={this.props.referral.patientAddress}
                        />

                        <FormsyText
                            name="patientPostcode"
                            validations="isInt"
                            validationError={errorMessages.wordsError}
                            hintText="Postcode"
                            floatingLabelText="Postcode"
                            defaultValue={this.props.referral.patientPostcode}
                        />

                        <FormsyDate
                            name="patientDateOfBirth"
                            floatingLabelText="Date of birth"
                            defaultDate={this.props.referral.patientDateOfBirth}
                        />

                        <FormsyText
                            name="patientMedicare"
                            validations="isAlphanumeric"
                            validationError={errorMessages.wordsError}
                            hintText="Medicare number"
                            floatingLabelText="Medicare number"
                            defaultValue={this.props.referral.patientMedicare}
                        />

                        <FormsyText
                            name="patientContactNumber"
                            validations="isInt"
                            validationError={errorMessages.wordsError}
                            hintText="Contact number"
                            floatingLabelText="Contact number"
                            defaultValue={this.props.referral.patientContactNumber}
                        />

                        {/* doctor data form below */}
                        <CardTitle title="Doctor data" subtitle="" />
                        <FormsyText
                            name="doctorSurname"
                            validations="isWords"
                            validationError={errorMessages.wordsError}
                            required
                            hintText="Surname"
                            floatingLabelText="Surname"
                            defaultValue={this.props.referral.doctorSurname}
                        />

                        <FormsyText
                            name="doctorGivenName"
                            validations="isWords"
                            validationError={errorMessages.wordsError}
                            required
                            hintText="Given name"
                            floatingLabelText="Give name"
                            defaultValue={this.props.referral.doctorGivenName}
                        />

                        <FormsyText
                            name="doctorClinic"
                            validations="isWords"
                            validationError={errorMessages.wordsError}
                            hintText="Clinic"
                            floatingLabelText="Clinic"
                            defaultValue={this.props.referral.doctorClinic}
                        />

                        <FormsyText
                            name="doctorAddress"
                            validations="isAlphanumeric"
                            validationError={errorMessages.wordsError}
                            hintText="Address"
                            floatingLabelText="Address"
                            defaultValue={this.props.referral.doctorAddress}
                        />

                        <FormsyText
                            name="doctorPostcode"
                            validations="isInt"
                            validationError={errorMessages.wordsError}
                            hintText="Postcode"
                            floatingLabelText="Postcode"
                            defaultValue={this.props.referral.doctorPostcode}
                        />

                        <FormsyText
                            name="doctorContactNumber"
                            validations="isInt"
                            validationError={errorMessages.wordsError}
                            hintText="Contact number"
                            floatingLabelText="Contact number"
                            defaultValue={this.props.referral.doctorContactNumber}
                        />

                        {/* referral form below */}
                        <CardTitle title="Referral details" subtitle="" />
                        <FormsyText
                            name="referralReasonForReferral"
                            validations="isWords"
                            validationError={errorMessages.wordsError}
                            hintText="Reason for referral"
                            floatingLabelText="Reason for referral"
                            defaultValue={this.props.referral.referralReasonForReferral}
                        />

                        <FormsySelect
                            name="referralRequestedService"
                            floatingLabelText="Requested service"
                            value={this.props.referral.referralRequestedService}
                        >
                            <MenuItem value={'mentalHealthAssessment'} primaryText="Mental Health Assessment" />
                            <MenuItem value={'medicationReview'} primaryText="Medication Review" />
                            <MenuItem value={'dianogsticClarification'} primaryText="Diagnostic Clarifiction" />
                            <MenuItem value={'assessmentForManagementOfBPSD'} primaryText="Assessment for Management of BPSD" />
                        </FormsySelect>

                        <FormsyToggle
                            name="referralUrgent"
                            label="Urgent"
                            style={style.switchStyle}
                            defaultToggled={this.props.referral.referralUrgent}
                        />
                        <div style={style.uploadButton}>
                            <RaisedButton label="Upload" primary={true} style={style.uploadButton} />
                            <CardText>Upload additional information (Limited to one PDF file)</CardText>
                        </div>
                        
                         {/* triage below */}
                        <CardTitle title="Triage" subtitle="" />
                        <FormsySelect
                            name="referralRuralCode"
                            floatingLabelText="Rural code"
                            value={this.props.referral.referralRuralCode}
                        >
                            <MenuItem value={'RA1MajorCities'} primaryText="RA1 MajorCities" />
                            <MenuItem value={'RA2InnerRegional'} primaryText="RA2 Inner Regional" />
                            <MenuItem value={'RA3OuterRegional'} primaryText="RA3 Outer Regional" />
                            <MenuItem value={'RA4Remote'} primaryText="RA4 Remote" />
                            <MenuItem value={'RA5VeryRemote'} primaryText="RA5 Very Remote" />
                        </FormsySelect>

                        <FormsyDate
                            name="referralAppointmentDate"
                            floatingLabelText="Appointment date"
                            value={this.props.referral.referralAppointmentDate}
                        />
                        <FormsyTime
                            name="referralAppointmentTime"
                            floatingLabelText="Appointment time"
                            value={this.props.referral.referralAppointmentTime}
                        />
                        
                        <CardText>Last Date reviewed (placeholder)</CardText>
                        </Formsy.Form>

                        <CardActions style={style.cardActions} expandable={true}>
                            <FlatButton
                                style={style.submitStyle}
                                type="submit"
                                label="Submit"
                                disabled={!this.state.canSubmit}
                            />

                            <FlatButton label="Collapse" onTouchTap={this.handleReduce} />
                        </CardActions>

                    </Paper>
                </CardText>

            </Card>
        )
    }
}

export default EditableReferral

