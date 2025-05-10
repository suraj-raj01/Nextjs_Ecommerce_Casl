'use client'
import getRole from "../../../app/actions/superadmin/getRole"
import React from 'react'

const page = () => {

    const [role, setRole] = React.useState<any>([]);
    const fetchRoles = async () => {
        const response = await getRole();
        if (response.success) {
            setRole(response.data);
            console.log(response.data);
        } else {
            console.log(response.error);
        }
    }
    React.useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div>
            <h3 className='text-center'>Manage Permissions</h3>
            <div className="flex flex-wrap md:flex-row gap-6 w-full p-4">

                {role.map((item: any) => (
                    <div key={item.id} className="flex flex-col bg-white shadow rounded-lg p-4">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Manage permissions for {item.role}</p>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 ">
                            View Users <input type="checkbox" className="accent-blue-600 w-4 h-4 " />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 ">
                            Edit Users <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 ">
                            Delete Users <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 ">
                            View Roles <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 ">
                            Edit Roles <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 ">
                            Delete Roles <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page