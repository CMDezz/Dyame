import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import { Button, Grid, TextField, makeStyles, MenuItem, TextareaAutosize } from "@material-ui/core";
import "./Pmaterial.css"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ProvinceData } from "./ProvinceData"
import Cart from "./../Cart/Cart"
import CartProduct from "./../Cart/CartProduct/CartProduct"
import { Link } from "react-router-dom"
const PMaterial = () => {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const useStyle = makeStyles(themes => ({
        root: {
            '& .MuiFormControl-root': {
                width: "99%",
                margin: themes.spacing(1)
            },

        }
    }))
    const initailValue = {
        email: "",
        number: "",
        firstName: "",
        lastName: "",
        province: "",
        quan: "",
        phuong: "",
        address: "",
        note: "",
        fullName: ""
    }
    const [values, setValues] = useState(initailValue);
    const [value, setValue] = React.useState('female');
    const [totalPrices, setTotalPrices] = useState(0);
    const classes = useStyle();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const cart = useSelector(state => {
        return state.shop.cart
    })
    let total = 0;
    useEffect(() => {

        setTotalPrices(total)
    }, [total])
    return (
        <form className={classes.root}>
            <Grid container className="ymForm">
                <Grid className="ymfm" item xs={4}>
                    <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        label="??i???n tho???i (di ?????ng)"
                        name="number"
                        value={values.email}
                    />
                    <Grid container className="ymf">
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                label="T??n"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="standard-select-province"
                                variant="outlined"
                                select
                                label="T???nh/Th??nh ph???"
                                name="province"
                                value={values.province}
                                onChange={handleInputChange}
                            // helperText="Please select your currency"
                            >
                                {ProvinceData.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                variant="outlined"
                                label="Ph?????ng/X??"
                                name="phuong"
                                value={values.phuong}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                label="H???"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                label="Qu???n/Huy???n"
                                name="quan"
                                value={values.quan}
                                onChange={handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                label="?????a ch??? giao h??ng"
                                name="address"
                                value={values.address}
                                onChange={handleInputChange}
                            />

                        </Grid>
                    </Grid>
                    <TextareaAutosize className="formNote" aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" />
                    <Grid className="smit" container>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Ph????ng th???c thanh to??n</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="cod" control={<Radio />} label="Thanh to??n khi nh???n h??ng" />
                                    <FormControlLabel value="atm" control={<Radio />} label="Thanh to??n b???ng th??? Visa" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid className="btnPurchase" item xs={6}>
                            <Button variant="contained" color="secondary" size="large">Ti???p theo</Button>
                            <Button variant="contained" color="secondary" size="large"> <Link className="toCart" to="/cart">V??? gi??? h??ng</Link></Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item exs={3} className="fromCartDetail">
                    {cart.map(pro => {
                        total += pro.Price * pro.qty
                        return <CartProduct data={pro} purchase={true}></CartProduct>
                    })}

                </Grid>
                <div className="calc col-sm-2">
                    <p><span>V???n chuy???n :</span> 35.000??</p>
                    <p><span>T???m t??nh :</span> {numberWithCommas(totalPrices)}??</p>
                    <p><span>T???ng :</span> {numberWithCommas(totalPrices + 35000)}??</p>
                </div>
            </Grid>

        </form>
    );
}

export default PMaterial;

