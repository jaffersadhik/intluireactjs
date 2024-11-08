
import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
    user_id: null,
    username: null,
    accessToken: null,
    refreshToken: null,
    roles: null,
    sidebarToggle: true,
    sidebarType: "left",
    colourapi: "#dd6600",
    hovercolourapi: "#5fe86d",
    pagename: ""





};

export const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken,username,refreshToken } = action.payload
            state.username = username
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            //   state.roles = roles
            //   state.user_id = user_id
        },
        updatetoken: (state, action) => {
            const { accessToken, refreshToken } = action.payload
            state.accessToken = accessToken
            state.refreshToken = refreshToken;
        },
        userlogout: (state, action) => {
            state.user_id = null
            state.username = null
            state.accessToken = null
            state.refreshToken = null
            state.roles = null
        },

        slidebar: (state) => {
            state.sidebarToggle = !state.sidebarToggle
            console.log("its here",state.sidebarToggle )

        },
        slidebartype: (state, action) => {
            const { sidebartype } = action.payload
            //   state.username = username
            state.sidebarType = sidebartype
            console.log("its here two",state.sidebarType)

            
        },
        colourapi: (state, action) => {
            const { colourapinew } = action.payload
            state.colourapi = colourapinew
            console.log("its here two colourapi",state.colourapi)

            
        },
        hovercolourapi: (state, action) => {
            const { hovercolourapinew } = action.payload
            state.hovercolourapi = hovercolourapinew
            console.log("its here two colourapi",state.hovercolourapi)

            
        },
        pagenamechange: (state, action) => {
            const { pagename } = action.payload
            state.pagename = pagename
            console.log("its here two pagename",state.pagename)

            
        },
     
    },
});

// Action creators are generated for each case reducer function
export const { setCredentials, updatetoken, userlogout, slidebar,slidebartype,colourapi,hovercolourapi,pagenamechange } = authSlice.actions;

export default authSlice.reducer;
