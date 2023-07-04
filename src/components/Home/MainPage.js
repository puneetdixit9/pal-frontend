import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, TextField, NativeSelect, OutlinedInput } from '@mui/material'
import { Button, Typography } from '@mui/material'
import { Box, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/FormControl'

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import { updateProductAttributesAction, getDistinctFamilyAttributes } from '../../redux/actions/product'

function MainPage() {
    const dispatch = useAppDispatch()
    const [missingAtttributesOptions, setMissingAttributeOptions] = useState({})
    const productState = useAppSelector(state => state.productReducer)
    let productItems = []
    let productAttributes = []
    const label = { inputProps: { 'aria-label': 'Switch demo' } }

    const [selectedProduct, setselectedProduct] = useState('')
    const [productId, setProductId] = useState('')
    const [selectedProductAttributes, setSelectedProductAttributes] = useState(
        {},
    )
    const [selectedProductAttributesWithMissing, setSelectedProductAttributesWithMissing] = useState(
        {},
    )
    const [updatedProductAttributes, setUpdatedProductAttributes] = useState({})

    const [selectedFamilyConfig, setSelectedFamilyConfig] = useState({})
    const [missingChecked, setMissingChecked] = React.useState(true)


    useEffect(() => {
        setMissingAttributeOptions(prevOptions => ({
            ...prevOptions,
            [productState.distinctFamilyAttributes.attribute]: productState.distinctFamilyAttributes.response,
        }));
    }, [productState.distinctFamilyAttributes]);

    const selectProductHandle = event => {
        setMissingAttributeOptions({})
        setselectedProduct(event.target.textContent)
        const selectedProductIndex = productState.products
            .map(e => e.article_desc)
            .indexOf(event.target.textContent)

        setProductId(productState.products[selectedProductIndex]._id)

        let selectedFamilyConfig =
            productState.config[
            productState.products[selectedProductIndex].family
            ]
        setSelectedFamilyConfig(selectedFamilyConfig)

        let productAttributesObject = JSON.parse(
            JSON.stringify(productState.products[selectedProductIndex]),
        )

        console.log(productAttributesObject)

        let orderedProductAttributesObject = Object.keys(productAttributesObject).sort(function (a, b) { return (a.toLowerCase() < b.toLowerCase()) ? -1 : 1; }).reduce(
            (obj, key) => {
                obj[key] = productAttributesObject[key];
                return obj;
            },
            {}
        );

        productAttributesObject = orderedProductAttributesObject
        console.log(orderedProductAttributesObject)

        let productRequiredAttributes = { ...productAttributesObject }

        if ("_id" in productRequiredAttributes) {
            delete productRequiredAttributes["_id"]
        }

        if ("missing_attributes" in productRequiredAttributes) {
            delete productRequiredAttributes["missing_attributes"]
        }

        setSelectedProductAttributes(productRequiredAttributes)
        let productMissingAttributesObject = { ...productRequiredAttributes }
        for (var key in selectedFamilyConfig) {
            if (
                !(
                    (
                        selectedFamilyConfig[key].name in
                        productState.products[selectedProductIndex]
                    )
                )
            ) {
                productMissingAttributesObject[
                    selectedFamilyConfig[key].name
                ] = ''
                dispatch(getDistinctFamilyAttributes(productState.products[selectedProductIndex].family, selectedFamilyConfig[key].name))
            }
        }
        console.log("productAttributesWithMissing", productMissingAttributesObject)
        setSelectedProductAttributesWithMissing(productMissingAttributesObject)
    }



    const handleProductAttributeValue = (key, value) => {
        if (value.length > 1) {
            value = value.trimStart();
        }
        setSelectedProductAttributesWithMissing({
            ...selectedProductAttributesWithMissing,
            [key]: value,
        })
        setUpdatedProductAttributes({
            ...updatedProductAttributes,
            [key]: value,
        })
    }

    const handleMissingCheck = event => {
        setMissingChecked(event.target.checked)
    }

    const handleUpdate = event => {

        dispatch(updateProductAttributesAction(productId, updatedProductAttributes))
        setUpdatedProductAttributes({})

    }

    if (productState && !productState.isFamilyLoading) {
        productItems = productState.products.map(item => {
            return (
                <Button
                    key={item._id}
                    onClick={selectProductHandle}
                    sx={{
                        fontSize: 15,
                        fontWeight: 'regular',
                    }}
                >
                    {item.article_desc}
                </Button>
            )
        })
    }

    productAttributes = (missingChecked == true) ? Object.entries(selectedProductAttributesWithMissing).map(
        ([key, value]) => (
            value !== '' ? (
                <TextField
                    key={key}
                    id={key}
                    label={key}
                    sx={{ minWidth: 250, m: 1 }}
                    value={value}
                    required
                    onChange={e => handleProductAttributeValue(key, e.target.value)}
                />
            ) : (
                <FormControl sx={{ m: 1, minWidth: 250 }} key={key}>
                    <InputLabel id={`select-label-${key}`}>{key}</InputLabel>
                    <NativeSelect
                        labelId={`select-label-${key}`}
                        id={`select-${key}`}
                        value=""
                        label={key}
                        required                        
                        onChange={e => handleProductAttributeValue(key, e.target.value)}
                    >
                        {missingAtttributesOptions[key] && missingAtttributesOptions[key].length ? (
                            <>
                                {
                                    <option value="">Select Option</option>
                                }
                                {missingAtttributesOptions[key].map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                                {
                                    <option key="" value=" ">Type Manually</option>
                                }
                            </>
                        ) : (
                            <>
                                <option value="">Options Not Available</option>
                                <option key="" value=" ">Type Manually</option>
                            </>
                        )}
                    </NativeSelect>
                    {value === ' ' && (
                        <TextField
                            key={key}
                            id={`input-${key}`}
                            label="Type Manually"
                            sx={{ minWidth: 250, m: 1 }}
                            value={value}
                            required
                            onChange={e => handleProductAttributeValue(key, e.target.value)}
                        />
                    )}
                </FormControl>
            )
        )
    ) : Object.entries(selectedProductAttributes).map(
        ([key, value]) => (
            <TextField
                key={key}
                id={key}
                label={key}
                sx={{ minWidth: 250, m: 1 }}
                value={value}
                InputProps={{
                    readOnly: true,
                }}
                required
                onChange={e => handleProductAttributeValue(key, e.target.value)}
            />
        )
    );

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} sm={5} md={4} lg={3}>
                <Card>
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        label="Search"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <CardContent style={{ minHeight: '0px', maxHeight: '400px', overflow: 'auto' }}>
                        {productItems}
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                item
                xs={12}
                sm={7}
                md={8}
                lg={9}
                sx={{ display: { md: 'flex' }, justifyContent: 'center', alignItems: 'center'}}
            >
                <Box sx={{ maxWidth: 800 }}>
                    <Box
                        sx={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            m: 1,
                            textAlign: 'center',
                        }}
                    >
                        Product Description
                    </Box>
                    <form style={{display:'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                        {productAttributes}

                        {selectedProduct && (
                            <Box>
                                <Stack direction="row">
                                    <Typography
                                        sx={{
                                            m: 1,
                                            minWidth: 150,
                                            display: { md: 'flex' },
                                            justifyContent: 'center',
                                        }}
                                    >
                                        View Missing Attributes
                                    </Typography>

                                    <Switch
                                        checked={missingChecked}
                                        onChange={handleMissingCheck}
                                    />
                                </Stack>
                                {missingChecked &&
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            m: 2,
                                            minWidth: 150,
                                            display: { md: 'flex' },
                                            justifyContent: 'center',
                                        }}
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </Button>}
                            </Box>
                        )}
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default MainPage
