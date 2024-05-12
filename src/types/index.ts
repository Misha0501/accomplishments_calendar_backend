import {ObjectId} from "mongodb";

export interface Day {
    _id?: ObjectId;
    date: string;
    isActive: boolean;
}