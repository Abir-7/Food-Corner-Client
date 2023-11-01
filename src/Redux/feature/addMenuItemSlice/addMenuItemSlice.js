import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    menuData: {
        itemName: '',
        ingredients: '',
        category: '',
        time: [],
        cuisine: '',
        price: [],
    },

    price1: '',
    price2: '',
    price3: '',

    size1: '',
    size2: '',
    size3: '',

    dataPostLoading: false,
}

const addMenuSlice = createSlice({
    name: 'updateProfile',
    initialState,
    reducers: {
        setMenuData: (state, { payload }) => {
            //console.log(payload)
            const { name, value, checked } = payload;
            if (name == 'price') {

                if (value == 'option1') {
                    if (value == 'option1' && checked) {
                        if (state.size1 == '') {
                            const newItem = { price: state.price1, size: 'reguler', option: value }
                            state.menuData.price = [...state.menuData.price, newItem]
                        }
                        else {
                            const newItem = { price: state.price1, size: state.size1, option: value }
                            state.menuData.price = [...state.menuData.price, newItem]
                        }
                    }
                    else {

                        const removeItems = state.menuData.price.filter(item => item.option !== value)

                        state.menuData.price = removeItems

                    }
                }
                else if (value == 'option2') {

                    if (value == 'option2' && checked) {
                        const newItem = { price: state.price2, size: state.size2, option: value }
                        state.menuData.price = [...state.menuData.price, newItem]

                    }
                    else {
                        const removeItems = state.menuData.price.filter(item => item.option !== value)
                        state.menuData.price = removeItems
                    }
                }
                else if (value == 'option3') {
                    if (value == 'option3' && checked) {
                        const newItem = { price: state.price3, size: state.size3, option: value }
                        state.menuData.price = [...state.menuData.price, newItem]
                    }
                    else {
                        const removeItems = state.menuData.price.filter(item => item.option !== value)
                        state.menuData.price = removeItems
                    }

                }

            }

            else if (name == 'time') {

                if (checked) {
                    const newTime = [...state.menuData.time, value]
                    state.menuData.time = newTime
                }
                else {
                    const removeTime = state.menuData.time.filter(time => time !== value)
                    state.menuData.time = removeTime
                }

            }

            else {
                state.menuData[name] = value;
            }



        },
        setDataPostLoading: (state, { payload }) => {
            state.dataPostLoading = payload
        }
        ,

        setPriceValue1: (state, { payload }) => {
            state.price1 = payload
        },
        setPriceValue2: (state, { payload }) => {
            state.price2 = payload
        },
        setPriceValue3: (state, { payload }) => {
            state.price3 = payload
        },

        setSizeValue1: (state, { payload }) => {
            state.size1 = payload
        },
        setSizeValue2: (state, { payload }) => {
            state.size2 = payload
        },
        setSizeValue3: (state, { payload }) => {
            state.size3 = payload
        },
    }
})

export const { setMenuData, setPriceValue1, setPriceValue2, setPriceValue3, setSizeValue1, setSizeValue2, setSizeValue3,setDataPostLoading } = addMenuSlice.actions

export default addMenuSlice.reducer