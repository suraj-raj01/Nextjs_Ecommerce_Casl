'use client'
import getRole from "../../../app/actions/superadmin/getRole"
import React from 'react'
import setPermission from "../../../app/actions/superadmin/setPermissions"

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

    const setPermissions = async (id: string, permission: string) => {
        await setPermission(id, permission)
    }
    return (
        <div>
            <h4 className='text-center'>Manage Permissions</h4>
            <div className="flex flex-wrap md:flex-row gap-6 w-full p-4">

                {role.map((item: any) => (
                    <div key={item.id} className="flex flex-col w-130 bg-white shadow rounded-lg pt-2 pb-2 pl-4 pr-4">
                        <p className="text-lg font-bold text-gray-800 mb-2">Manage permissions for <span className="text-green-600">{item.role}</span> </p>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            create product <input type="checkbox" value="createproducts" defaultChecked={item?.permissions?.includes("createproducts")} onChange={() => setPermissions(item.id, "createproducts")} className="accent-green-600 w-5 h-5 " />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            update product <input type="checkbox" value="updateproducts" defaultChecked={item?.permissions?.includes("updateproducts")} onChange={() => setPermissions(item.id, "updateproducts")} className="accent-green-600 w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            manage vendors <input type="checkbox" value="managevendors" defaultChecked={item?.permissions?.includes("managevendors")} onChange={() => setPermissions(item.id, "managevendors")} className="accent-green-600 w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            manage admins <input type="checkbox" value="manageadmins" defaultChecked={item?.permissions?.includes("manageadmins")} onChange={() => setPermissions(item.id, "manageadmins")} className="accent-green-600 w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            manage users <input type="checkbox" value="manageusers" defaultChecked={item?.permissions?.includes("manageusers")} onChange={() => setPermissions(item.id, "manageusers")} className="accent-green-600 w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            view products <input type="checkbox" value="viewproducts" defaultChecked={item?.permissions?.includes("viewproducts")} onChange={() => setPermissions(item.id, "viewproducts")} className="accent-green-600 w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            manage roles <input type="checkbox" value="manageroles" defaultChecked={item?.permissions?.includes("manageroles")} onChange={() => setPermissions(item.id, "manageroles")} className="accent-green-600 w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between w-full gap-2 text-gray-700 font-semibold">
                            manage permissions <input type="checkbox" value="managepermissions" defaultChecked={item?.permissions?.includes("managepermissions")} onChange={() => setPermissions(item.id, "managepermissions")} className="accent-green-600 w-5 h-5" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page