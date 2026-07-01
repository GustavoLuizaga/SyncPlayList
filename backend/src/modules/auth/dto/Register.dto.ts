import { IUser } from "../../user/interface/user.interface";

export type IRegisterDto = Omit<IUser, 'user_id' | 'role'>
