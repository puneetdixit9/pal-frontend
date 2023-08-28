import { apiClient, uploadApiClient } from '../../services/apiClient'
import { PRODUCT, PRODUCTS, CONFIG } from '../../constants'

import {
    fetchProduct,
    fetchProductSuccess,
    fetchProductFailed,
    fetchFamily,
    fetchFamilySuccess,
    fetchFamilyFailed,
    fetchBrand,
    fetchBrandSuccess,
    fetchBrandFailed,
    fetchCategory,
    fetchCategorySuccess,
    fetchCategoryFailed,
    updateAttributes,
    updateAttributesSuccess,
    updateAttributesFailed,
    fetchConfig,
    fetchConfigSuccess,
    fetchConfigFailed,
    fetchDistinctFamilyAttributes,
    fetchDistinctFamilyAttributesSuccess,
    fetchDistinctFamilyAttributesFailed,
} from '../reducer/product'

function getProductAPIqueryParams(family, brand, category) {
    let queryParams = '?'
    if (typeof family !== 'undefined' && family !== '') {
        queryParams = queryParams + 'family=' + family + '&'
    }
    if (typeof brand !== 'undefined' && brand !== '') {
        queryParams = queryParams + 'brand=' + brand + '&'
    }
    if (typeof category !== 'undefined' && category !== '') {
        queryParams = queryParams + 'category=' + category + '&'
    }
    return queryParams
}

export const getProducts = (family, brand, category) => async dispatch => {
    await dispatch(fetchProduct())
    try {
        const queryParams = getProductAPIqueryParams(family, brand, category)
        const response = await apiClient.get(`${PRODUCTS}${queryParams}`)

        return dispatch(fetchProductSuccess(response.data))
    } catch (err) {
        return dispatch(fetchProductFailed(err))
    }
}

export const getFamily = brand => async dispatch => {
    await dispatch(fetchFamily())
    try {
        let response = ''
        if (typeof brand !== 'undefined') {
            response = await apiClient.get(`${PRODUCTS}/family?brand=${brand}`)
        } else {
            response = await apiClient.get(`${PRODUCTS}/family`)
        }
        return dispatch(fetchFamilySuccess(response.data))
    } catch (err) {
        return dispatch(fetchFamilyFailed(err))
    }
}

export const getCategory = (family, brand) => async dispatch => {
    await dispatch(fetchCategory())
    try {
        let response = ''
        if (
            typeof brand !== 'undefined' &&
            (typeof family === 'undefined' || family === '')
        ) {
            response = await apiClient.get(
                `${PRODUCTS}/category?brand=${brand}`,
            )
        } else if (
            typeof family !== 'undefined' &&
            (typeof brand === 'undefined' || brand === '')
        ) {
            response = await apiClient.get(
                `${PRODUCTS}/category?family=${family}`,
            )
        } else if (
            typeof family !== 'undefined' &&
            typeof brand !== 'undefined'
        ) {
            response = await apiClient.get(
                `${PRODUCTS}/category?family=${family}&brand=${brand}`,
            )
        } else {
            response = await apiClient.get(`${PRODUCTS}/category`)
        }
        return dispatch(fetchCategorySuccess(response.data))
    } catch (err) {
        return dispatch(fetchCategoryFailed(err))
    }
}

export const getBrand = family => async dispatch => {
    await dispatch(fetchBrand())
    try {
        let response = ''
        if (typeof family !== 'undefined') {
            response = await apiClient.get(`${PRODUCTS}/family/${family}/brand`)
        } else {
            response = await apiClient.get(`${PRODUCTS}/brand`)
        }
        return dispatch(fetchBrandSuccess(response.data))
    } catch (err) {
        return dispatch(fetchBrandFailed(err))
    }
}

export const getConfig = () => async dispatch => {
    await dispatch(fetchConfig())
    try {
        const response = await apiClient.get(`${CONFIG}`)
        return dispatch(fetchConfigSuccess(response.data))
    } catch (err) {
        return dispatch(fetchConfigFailed(err))
    }
}

export const getDistinctFamilyAttributes =
    (family, attribute) => async dispatch => {
        await dispatch(fetchDistinctFamilyAttributes())
        try {
            const response = await apiClient.get(
                `${PRODUCTS}/family/${family}/${attribute}`,
            )

            const responseWithFields = {
                response: response.data,
                attribute: attribute,
            }
            return dispatch(
                fetchDistinctFamilyAttributesSuccess(responseWithFields),
            )
        } catch (err) {
            return dispatch(fetchDistinctFamilyAttributesFailed(err))
        }
    }

export const updateProductAttributesAction =
    (id, attributes) => async dispatch => {
        await dispatch(updateAttributes())
        try {
            const response = await apiClient.put(`${PRODUCT}/${id}`, attributes)

            return dispatch(updateAttributesSuccess())
        } catch (err) {
            return dispatch(updateAttributesFailed(err))
        }
    }
