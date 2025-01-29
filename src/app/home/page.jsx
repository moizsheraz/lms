// app/page.js
import Image from "next/image";
import Logout from "@/components/Logout";
import RoleSelection from "./RoleSelection";
import { getSession } from "@/lib/getSession"; // Import the session retrieval function
import { redirect } from "next/navigation";

const HomePage = async () => {
    const session = await getSession(); 

    if (!session?.user) redirect("/"); 

    return (
        <div className="flex flex-col items-center m-4">
            <RoleSelection session={session} /> 
        </div>
    );
};

export default HomePage;
