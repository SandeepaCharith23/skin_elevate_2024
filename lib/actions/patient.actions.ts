import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

// method for create new user
// export const createUser= async (user:CreateUserParams)=>{
//     console.log('inside createuser function ')

//     try{
//        const newUser=await users.create(
//         ID.unique(),
//         user.email,
//         user.phone,
//         undefined,
//         user.name
//     )
//     // Return the newly created user
//     return newUser;

//     }catch(error:any)
//     {
//         if(error && error?.code === 409){
//             const documents=await users.list([
//                 Query.equal('email',[user.email])
//             ])

//             return documents?.users[0]
//         }
//     }
// }

export const createUser = async (user: CreateUserParams) => {
    console.log("Inside createUser function");

    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        // Return the newly created user
        return newUser;
    } catch (error: any) {
        if (error && error?.code === 409) {
            console.log("User already exists with the same email.");
            const documents = await users.list([
                Query.equal("email", [user.email]),
            ]);

            // Return the existing user if found
            if (documents?.total > 0) {
                return documents?.users[0];
            } else {
                throw new Error("User conflict, but no existing user found.");
            }
        } else {
            console.error("An unexpected error occurred:", error);
            throw error; // Re-throw the error to be handled elsewhere
        }
    }
};

//method for get user details
export const getUser=async (userId:string)=>{
    try{
       
        const user=await users.get(userId);
        return parseStringify(user);

    }catch(error){
        console.log(error)
    }
}