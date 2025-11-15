import { IUser} from '../interface/user.interface';


export type ICreateUser = Omit<IUser, 'user_id'>