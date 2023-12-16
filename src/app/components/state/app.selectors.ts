import { createSelector } from '@ngrx/store'
import { Profile, Users } from '../models/allUsers'
import { appProfile,appUsers } from './app.state'


export const profileRootSelector=(state:appProfile)=>state.userdetails
export const userProfile=createSelector(
    profileRootSelector,
    (userdetails:Profile)=>{
        return userdetails
    }
)

export const userRootSelector=(state:appUsers)=>state.allusers
export const uniqueEmail=createSelector(
    userRootSelector,
    (allusers:Users[])=>{
        return [...allusers]
    }
)