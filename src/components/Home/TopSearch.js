import * as React from 'react'
import { TextField, Autocomplete } from '@mui/material'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import Box from '@mui/material/Box'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import {
    getFamily,
    getBrand,
    getCategory,
    getProducts,
} from '../../redux/actions/product'
import { useEffect } from 'react'

const TopSearch = () => {
    const dispatch = useAppDispatch()
    const productState = useAppSelector(state => state.productReducer)
    const [family, setFamily] = React.useState('')
    const [brand, setBrand] = React.useState('')
    const [category, setCategory] = React.useState('')

    useEffect(() => {
        dispatch(getFamily())
        dispatch(getBrand())
        dispatch(getCategory())
    }, [])

    function handleFamilyChange(value) {
        setFamily(value)
        if (brand === '') {
            dispatch(getBrand(value))
        }
        dispatch(getCategory(value, brand))
    }

    function handleBrandChange(value) {
        setBrand(value)
        if (family === '') {
            dispatch(getFamily(value))
        }
        dispatch(getCategory(family, value))
    }

    function handleCategoryChange(value) {
        setCategory(value)
    }

    const handleSearch = event => {
        dispatch(getProducts(family, brand, category))
    }

    const handleReset = event => {
        // dispatch(getProducts(family, brand, category))
        setCategory('')
        setBrand('')
        setFamily('')
        dispatch(getProducts('', '', ''))
    }

    return (
        <Box
            sx={{
                m: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >

            <Autocomplete
                sx={{
                    m: 1,
                    minWidth: 250,
                    maxWidth: 250,
                    display: 'inline-block',
                    wordBreak: 'break-word',
                }}
                options={productState.family}
                getOptionLabel={option => option}
                onChange={(event, value) => {
                    if (value) {
                        handleFamilyChange(value);
                    }
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Select Family'
                        variant="outlined"
                    />
                )}
                filterOptions={(options, state) => {
                    const inputValue = state.inputValue
                    return options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                }}
            />
            <Autocomplete
                sx={{
                    m: 1,
                    minWidth: 250,
                    maxWidth: 250,
                    display: 'inline-block',
                    wordBreak: 'break-word',
                }}
                options={productState.brand}
                getOptionLabel={option => option}
                onChange={(event, value) => {
                    if (value) {
                        handleBrandChange(value);
                    }
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Select Brand'
                        variant="outlined"
                    />
                )}
                filterOptions={(options, state) => {
                    const inputValue = state.inputValue
                    return options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                }}
            />
            <Autocomplete
                sx={{
                    m: 1,
                    minWidth: 250,
                    maxWidth: 250,
                    display: 'inline-block',
                    wordBreak: 'break-word',
                }}
                options={productState.category}
                getOptionLabel={option => option}
                onChange={(event, value) => {
                    if (value) {
                        handleCategoryChange(value);
                    }
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Select Category'
                        variant="outlined"
                    />
                )}
                filterOptions={(options, state) => {
                    const inputValue = state.inputValue
                    return options.filter(option =>
                        option.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                }}
            />
            <Button
                sx={{ m: 2, ml: 5, display: { md: 'flex' }, minWidth: 150 }}
                variant="contained"
                endIcon={<SearchIcon />}
                onClick={handleSearch}
            >
                Search
            </Button>
            <Button
                sx={{ m: 2, ml: 1, display: { md: 'flex' }, minWidth: 150 }}
                variant="contained"
                endIcon={<RefreshIcon />}
                onClick={handleReset}
            >
                Reset
            </Button>
        </Box>
    )
}

export default TopSearch
