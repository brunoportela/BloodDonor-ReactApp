import React, { useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230
    },
    smMargin: {
        margin: theme.spacing(1)
    }
});

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    bloodGroup: '',
    address: ''
};

const DCandidateForm = ({ classes, ...props }) => {

    const { addToast } = useToasts();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues) {
            temp.fullName = fieldValues.fullName ? "" : "This field is required.";
        }
        if ('mobile' in fieldValues) {
            temp.mobile = fieldValues.mobile ? "" : "This field is required.";
        }
        if ('bloodGroup' in fieldValues) {
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
        }
        if ('email' in fieldValues) {
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid.";
        }
        setErrors({
            ...temp
        })
        if (fieldValues === values) {
            //check if all values above are "" (empty string)
            return Object.values(temp).every(x => x === "");
        }

    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = event => {
        event.preventDefault();
        if (validate()) {
            const onSuccess = () => {
                resetForm();
                addToast("Submitted successfully", { appearance: 'success' });
            }
            if (props.currentId === 0) {
                props.createDCandidate(values, onSuccess)
            } else {
                props.updateDCandidate(props.currentId, values, onSuccess)
            }
        }

    };

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dCandidateList.find(x => x.id === props.currentId)

            })
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container  style={{textAlign:'center'}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined" className={classes.formControl}
                        {...(errors.bloodGroup && { error: true })}>
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            label="Blood Group"
                        >
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +</MenuItem>
                            <MenuItem value="A-">A -</MenuItem>
                            <MenuItem value="B+">B +</MenuItem>
                            <MenuItem value="B-">B -</MenuItem>
                            <MenuItem value="AB+">AB +</MenuItem>
                            <MenuItem value="AB-">AB -</MenuItem>
                            <MenuItem value="0+">0 +</MenuItem>
                            <MenuItem value="0-">0 -</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
});

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));