import { createAction, props } from "@ngrx/store";
import { Profile, Users } from "../models/allUsers";

export const retrieveprofile=createAction('[profile API] API success')
export const retriveprofileSuccess=createAction('[profile API] API successSuccess',props<{userdetails:Profile}>())

export const retrievepost=createAction('[pst API] API success')
export const retrievepostSuccess=createAction('[post API] API successSuccess',props<{allusers:Users[]}>())