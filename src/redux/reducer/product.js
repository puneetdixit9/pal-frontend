import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isFamilyLoading: false,
    isBrandLoading: false,
    isConfigLoading: false,
    isCategoryLoading: false,
    isAttributeUpdating: false,
    isAttributeUpdatingError: false,
    family: [],
    products: [],
    brand: [],
    category: [],
    config: {},
    distinctFamilyAttributes: {},
    message: '',
    isError: false,
}

export const productReducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProduct(state, action) {
            return {
                ...state,
                isError: false,
                isProductLoading: true,
            }
        },
        fetchProductSuccess(state, action) {
            return {
                ...state,
                isProductLoading: false,
                products: action?.payload,
                isError: false,
            }
        },
        fetchProductFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Products Failed',
                isError: true,
                isProductLoading: false,
            }
        },

        fetchFamily(state, action) {
            return {
                ...state,
                isFamilyLoading: true,
                isError: false,
            }
        },
        fetchFamilySuccess(state, action) {
            return {
                ...state,
                isFamilyLoading: false,
                family: action?.payload,
                isError: false,
            }
        },
        fetchFamilyFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Family Failed',
                isError: true,
                isFamilyLoading: false,
            }
        },

        fetchBrand(state, action) {
            return {
                ...state,
                isBrandLoading: true,
                isError: false,
            }
        },
        fetchBrandSuccess(state, action) {
            return {
                ...state,
                isBrandLoading: false,
                brand: action?.payload,
                isError: false,
            }
        },
        fetchBrandFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Brand Failed',
                isError: true,
                isBrandLoading: false,
            }
        },

        fetchCategory(state, action) {
            return {
                ...state,
                isCategoryLoading: true,
                isError: false,
            }
        },
        fetchCategorySuccess(state, action) {
            return {
                ...state,
                isCategoryLoading: false,
                category: action?.payload,
                isError: false,
            }
        },
        fetchCategoryFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Category Failed',
                isError: true,
                isCategoryLoading: false,
            }
        },

        updateAttributes(state, action) {
            return {
                ...state,
                isAttributeUpdating: true,
                isAttributeUpdatingError: false,
                message: '',
                isError: false,
            }
        },
        updateAttributesSuccess(state, action) {
            return {
                ...state,
                isAttributeUpdating: false,
                message: 'Attributes Updated',
                isError: false,
                isAttributeUpdatingError: false,
            }
        },
        updateAttributesFailed(state, action) {
            return {
                ...state,
                message: 'Update Attributes Failed',
                isError: true,
                isAttributeUpdating: false,
                isAttributeUpdatingError: true,
            }
        },

        fetchConfig(state, action) {
            return {
                ...state,
                isConfigLoading: true,
                isError: false,
            }
        },
        fetchConfigSuccess(state, action) {
            let family_config = {}
            for (var i = 0, l = action.payload.length; i < l; i++) {
                var obj = action.payload[i]
                family_config[obj.family] = {}
                for (var key in obj) {
                    if (key.includes('attribute')) {
                        family_config[obj.family][key] = obj[key]
                    }
                }
                family_config[obj.family]['otherFieldsToDispaly'] =
                    obj.other_fields_to_display ? obj.other_fields_to_display : []
            }
            return {
                ...state,
                isConfigLoading: false,
                config: family_config,
                isError: false,
            }
        },
        fetchConfigFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Config Failed',
                isError: true,
                isConfigLoading: false,
            }
        },

        fetchDistinctFamilyAttributes(state, action) {
            return {
                ...state,
                isDistinctFamilyAttributesLoading: true,
                isError: false,
            }
        },
        fetchDistinctFamilyAttributesSuccess(state, action) {
            return {
                ...state,
                isDistinctFamilyAttributesLoading: false,
                distinctFamilyAttributes: action?.payload,
                isError: false,
            }
        },
        fetchDistinctFamilyAttributesFailed(state, action) {
            return {
                ...state,
                message: 'Fetch Distinct Family Attributes Failed',
                isError: true,
                isDistinctFamilyAttributesLoading: false,
            }
        },
    },
})

export const {
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
} = productReducer.actions

export default productReducer.reducer
