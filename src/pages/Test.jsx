import { useEffect } from "react";
import api from "../api/api";

function Test() {
    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         try {
    //             const response = await api.get("/educations");
    //             console.log("Projects:", response.data);
    //         } catch (error) {
    //             console.error("Error fetching projects:", error);
    //         }
    //     };

    //     fetchProjects();
    // }, []);

    // return (
    //     <div>
    //         <h1>Testing API...</h1>
    //         <p>Check the browser console for the response.</p>
    //     </div>
    // );

    return (
        <div>
            <Test />
        </div>
    )
}

export default Test;