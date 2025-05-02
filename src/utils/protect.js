import { redirect } from "react-router-dom"
export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname;
    const activeUser = JSON.parse(localStorage.getItem("user"));
     if (!activeUser) {
         const response = redirect(`/account/login?message=You must login first&redirectTo=${pathname}`);
         return response;
     }

    
    //  if(activeUser.approvalStatus !== 'approved'){
    //     return redirect('/pending_verification')
    //  }
     return null;
 }