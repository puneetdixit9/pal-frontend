import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import { getFamily, getBrand, getCategory, getProducts } from '../../redux/actions/product'
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

    let familyItems = []
    let brandItems = []
    let categoryItems = []

    if (productState && !productState.isFamilyLoading) {
        familyItems = productState.family.map(item => {
            return (
                <MenuItem name={item} key={item} value={item}>
                    {item}
                </MenuItem>
            )
        })
    }

    if (productState && !productState.isBrandLoading) {
        brandItems = productState.brand.map(item => {
            return (
                <MenuItem name={item} key={item} value={item}>
                    {item}
                </MenuItem>
            )
        })
    }

    if (productState && !productState.isCategoryLoading) {
        categoryItems = productState.category.map(item => {
            return (
                <MenuItem name={item} key={item} value={item}>
                    {item}
                </MenuItem>
            )
        })
    }

    const handleFamilyChange = event => {
        setFamily(event.target.value)
        if (brand === '') {
            dispatch(getBrand(event.target.value))
        }
        // if (category === '') {
            dispatch(getCategory(event.target.value, brand))
        // }
    }

    const handleBrandChange = event => {
        setBrand(event.target.value)
        if (family === '') {
            dispatch(getFamily(event.target.value))
        }
        // if (category === '') {
            dispatch(getCategory(family, event.target.value))
        // }
    }

    const handleCategoryChange = event => {
        setCategory(event.target.value)
    }

    const handleSearch = event => {
        dispatch(getProducts(family, brand, category))
    }

    const handleReset = event => {
        // dispatch(getProducts(family, brand, category))
        setCategory("")
        setBrand("")
        setFamily("")
        dispatch(getProducts("", "", ""))
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
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-helper-label">
                    Family
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={family}
                    label="Family"
                    onChange={handleFamilyChange}
                >
                    {familyItems}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-helper-label">
                    Brand
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={brand}
                    label="Brand"
                    onChange={handleBrandChange}
                >
                    {brandItems}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-helper-label">
                    Category
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    {categoryItems}
                </Select>
            </FormControl>
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
