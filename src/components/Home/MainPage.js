import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, TextField, Autocomplete } from '@mui/material'
import { Button, Typography } from '@mui/material'
import { Box, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import {
    updateProductAttributesAction,
    getDistinctFamilyAttributes,
} from '../../redux/actions/product'

function MainPage() {
    const dispatch = useAppDispatch()
    const [missingAtttributesOptions, setMissingAttributeOptions] = useState({})
    const [otherFieldsToDisplay, setOtherFieldsToDisplay] = useState([])
    const productState = useAppSelector(state => state.productReducer)
    let productItems = []

    const [selectedProduct, setselectedProduct] = useState('')
    const [productId, setProductId] = useState('')
    const [selectedProductAttributes, setSelectedProductAttributes] = useState(
        {},
    )
    const [updatedProductAttributes, setUpdatedProductAttributes] = useState({})

    const [selectedFamilyConfig, setSelectedFamilyConfig] = useState({})
    const [missingChecked, setMissingChecked] = useState(true)
    const [requiredAttributeError, setRequiredAttributeError] = useState(false)
    const [attributeWithLabelMapping, setAttributeWithLabelMapping] = useState(
        {},
    )
    const [attributeUnits, setAttributeUnits] = useState({})
    const [attributeTypes, setAttributeTypes] = useState({})
    const [requiredAttributes, setRequiredAttributes] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setMissingAttributeOptions(prevOptions => ({
            ...prevOptions,
            [productState.distinctFamilyAttributes.attribute]:
                productState.distinctFamilyAttributes.response,
        }))
    }, [productState.distinctFamilyAttributes])

    useEffect(() => {
        const labelsWithData = {}
        let attributesWithLabel = []
        let attributeUnitObject = {}
        let attributeTypesObject = {}
        let requiredAttributesArray = []
        if (selectedFamilyConfig && selectedProductAttributes) {
            for (const key in selectedFamilyConfig) {
                const label = selectedFamilyConfig[key].label
                if (label) {
                    if (!labelsWithData[label]) {
                        labelsWithData[label] = {}
                    }
                    if (
                        selectedFamilyConfig[key].name in
                        selectedProductAttributes
                    ) {
                        labelsWithData[label][selectedFamilyConfig[key].name] =
                            selectedProductAttributes[
                                selectedFamilyConfig[key].name
                            ]
                        attributesWithLabel.push(selectedFamilyConfig[key].name)
                    } else if (missingChecked) {
                        labelsWithData[label][selectedFamilyConfig[key].name] =
                            ''
                        if (
                            !(
                                selectedFamilyConfig[key].name in
                                missingAtttributesOptions
                            )
                        ) {
                            dispatch(
                                getDistinctFamilyAttributes(
                                    selectedProductAttributes.family,
                                    selectedFamilyConfig[key].name,
                                ),
                            )
                        }
                    }
                }
                const unit = selectedFamilyConfig[key].unit
                if (unit) {
                    attributeUnitObject[selectedFamilyConfig[key].name] = unit
                }
                const type = selectedFamilyConfig[key].type
                if (type) {
                    if (type == 'int' || type == 'number' || type == 'float') {
                        attributeTypesObject[selectedFamilyConfig[key].name] =
                            'number'
                    }
                }
                const required = selectedFamilyConfig[key].required
                if (required) {
                    requiredAttributesArray.push(selectedFamilyConfig[key].name)
                }
            }
            labelsWithData['Other'] = {}
            for (const key in selectedProductAttributes) {
                if (!attributesWithLabel.includes(key)) {
                    labelsWithData['Other'][key] =
                        selectedProductAttributes[key]
                }
            }
            if (!missingChecked) {
                for (const key in labelsWithData) {
                    if (Object.keys(labelsWithData[key]).length == 0) {
                        delete labelsWithData[key]
                    }
                }
            }
            setAttributeTypes(attributeTypesObject)
            setAttributeUnits(attributeUnitObject)
            setRequiredAttributes(requiredAttributesArray)
            setAttributeWithLabelMapping(labelsWithData)
        }
    }, [selectedFamilyConfig, selectedProductAttributes, missingChecked])

    const selectProductHandle = event => {
        setRequiredAttributeError(false)
        setMissingAttributeOptions({})
        setUpdatedProductAttributes({})
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
        setOtherFieldsToDisplay(selectedFamilyConfig.otherFieldsToDispaly)

        let productAttributesObject = JSON.parse(
            JSON.stringify(productState.products[selectedProductIndex]),
        )

        console.log(productAttributesObject)

        let orderedProductAttributesObject = Object.keys(
            productAttributesObject,
        )
            .sort(function (a, b) {
                return a.toLowerCase() < b.toLowerCase() ? -1 : 1
            })
            .reduce((obj, key) => {
                obj[key] = productAttributesObject[key]
                return obj
            }, {})
        setSelectedProductAttributes(orderedProductAttributesObject)
    }

    const handleSearch = event => {
        setSearchQuery(event.target.value)
    }

    const handleProductAttributeValue = (key, value) => {
        if (value.length === 0) {
            setSelectedProductAttributes({
                ...selectedProductAttributes,
                [key]: '',
            })
            if (!(key in missingAtttributesOptions)) {
                dispatch(
                    getDistinctFamilyAttributes(
                        selectedProductAttributes.family,
                        key,
                    ),
                )
            }
        }
        setUpdatedProductAttributes({
            ...updatedProductAttributes,
            [key]: value,
        })
    }

    const handleMissingCheck = event => {
        setMissingChecked(event.target.checked)
    }

    const handleUpdate = event => {
        let error = false
        for (const label in attributeWithLabelMapping) {
            for (const key in attributeWithLabelMapping[label]) {
                if (
                    requiredAttributes.includes(key) &&
                    attributeWithLabelMapping[label][key] === '' &&
                    (!(key in updatedProductAttributes) ||
                        !updatedProductAttributes[key].length)
                ) {
                    setRequiredAttributeError(true)
                    error = true
                }
            }
        }
        if (error === false) {
            dispatch(
                updateProductAttributesAction(
                    productId,
                    updatedProductAttributes,
                ),
            )
        }
    }

    if (productState && !productState.isFamilyLoading) {
        productItems = productState.products
            .filter(item =>
                item.article_desc
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
            )
            .map(item => (
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
            ))
    }

    function renderProductAttributes(label) {
        if (label && label in attributeWithLabelMapping) {
            return Object.entries(attributeWithLabelMapping[label]).map(
                ([key, value]) => {
                    if (value !== '') {
                        if (
                            label == 'Other' &&
                            !otherFieldsToDisplay.includes(key)
                        ) {
                            return null
                        } else {
                            return (
                                <TextField
                                    key={key}
                                    id={key}
                                    label={`${key}${
                                        key in attributeUnits
                                            ? ` (${attributeUnits[key]})`
                                            : ''
                                    }`}
                                    sx={{ minWidth: 250, m: 1 }}
                                    value={
                                        updatedProductAttributes[key] || value
                                    }
                                    InputProps={{
                                        readOnly:
                                            otherFieldsToDisplay.includes(key),
                                    }}
                                    type={`${
                                        key in attributeTypes
                                            ? attributeTypes[key]
                                            : 'text'
                                    }`}
                                    onChange={e =>
                                        handleProductAttributeValue(
                                            key,
                                            e.target.value,
                                        )
                                    }
                                    required={requiredAttributes.includes(key)}
                                />
                            )
                        }
                    } else {
                        return (
                            <Autocomplete
                                sx={{
                                    m: 1,
                                    minWidth: 250,
                                    maxWidth: 250,
                                    display: 'inline-block',
                                    wordBreak: 'break-word',
                                }}
                                key={key}
                                options={
                                    missingAtttributesOptions[key]
                                        ? missingAtttributesOptions[key]
                                        : []
                                }
                                getOptionLabel={option => option}
                                value=""
                                onInputChange={(event, value) => {
                                    setUpdatedProductAttributes({
                                        ...updatedProductAttributes,
                                        [key]: value,
                                    })
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        type={`${
                                            key in attributeTypes
                                                ? attributeTypes[key]
                                                : 'text'
                                        }`}
                                        label={`${key}${
                                            key in attributeUnits
                                                ? ` (${attributeUnits[key]})`
                                                : ''
                                        }`}
                                        variant="outlined"
                                        required={requiredAttributes.includes(
                                            key,
                                        )}
                                        helperText={
                                            requiredAttributeError &&
                                            !updatedProductAttributes[key] &&
                                            requiredAttributes.includes(key)
                                                ? 'Required Attribute.'
                                                : ''
                                        }
                                        error={
                                            requiredAttributeError &&
                                            !updatedProductAttributes[key] &&
                                            requiredAttributes.includes(key)
                                        }
                                    />
                                )}
                                filterOptions={(options, state) => {
                                    const inputValue = state.inputValue
                                    return options.filter(option =>
                                        option
                                            .toLowerCase()
                                            .includes(inputValue.toLowerCase()),
                                    )
                                }}
                                freeSolo
                            />
                        )
                    }
                },
            )
        } else {
            return null
        }
    }

    function renderLabelAndForm(label) {
        if (!label) {
            return null
        }
        return (
            <>
                <Box
                    sx={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        m: 1,
                    }}
                >
                    {label}
                </Box>
                <form>{renderProductAttributes(label)}</form>
            </>
        )
    }

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} sm={5} md={4} lg={3}>
                <Card>
                    <CardContent
                        style={{
                            minHeight: '0px',
                            maxHeight: '400px',
                            overflow: 'auto',
                        }}
                    >
                        <div
                            style={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                backgroundColor: 'white',
                            }}
                        >
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
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        {productItems.map((item, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                {item}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
            <Grid
                item
                xs={12}
                sm={7}
                md={8}
                lg={9}
                sx={{ display: { md: 'flex' }, justifyContent: 'center' }}
            >
                <Box sx={{ maxWidth: 800 }}>
                    {Object.keys(selectedProductAttributes).length > 1 && (
                        <Box
                            sx={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                m: 1,
                            }}
                        >
                            {[
                                selectedProductAttributes.article_desc,
                                ' (',
                                selectedProductAttributes.article_id,
                                ')',
                            ]}
                        </Box>
                    )}

                    <form>{renderProductAttributes('Other')}</form>

                    <>
                        {Object.keys(attributeWithLabelMapping).map(key => {
                            if (key !== 'Other') {
                                return renderLabelAndForm(key)
                            }
                            return null
                        })}
                    </>

                    <form>
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
                                {missingChecked && (
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
                                    </Button>
                                )}
                            </Box>
                        )}
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default MainPage
