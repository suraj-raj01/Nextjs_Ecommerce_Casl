'use client'
import React from 'react'
import getRoles from "../../actions/superadmin/getRole";
import getUsers from "../../actions/superadmin/getUsers";
import assignRole from "../../actions/superadmin/assignRole";

const AssignRole = () => {

  const [role, setRole] = React.useState<any>([]);
  const [users, setUsers] = React.useState<any>([]);
  const [assigned, setAssigned] = React.useState<any>([]);

  const loadRoles = async () => {
    const res = await getRoles();
    if (res.success) {
      console.log(res.data);
      setRole(res?.data || []);
    } else {
      console.log(res.error);
    }
  }

  const loadUsers = async () => {
    const res = await getUsers();
    if (res.success) {
      console.log(res.data);
      const filterData = res?.data?.filter((item) => !(item.roleId));
      setUsers(filterData || []);
    } else {
      console.log(res.error);
    }
  }

  const assignedRole = async () => {
    const res = await getUsers();
    if (res.success) {
      console.log(res.data);
      const filterData = res?.data?.filter((item) => (item.roleId));
      setAssigned(filterData || []);
    } else {
      console.log(res.error);
    }
  }

  React.useEffect(() => {
    loadRoles();
    loadUsers();
    assignedRole();
  }, [])

  const assignRoleToUser = async (id: string, role: string) => {
    const res = await assignRole(id, role);
    if (res.success) {
      alert(res.message);
      loadUsers();
      assignedRole();
    } else {
      console.log(res.error);
    }
  }

  return (
    <div>
      <p className='text-xl font-bold pl-5'>Assign Role</p>

      <div className="flex items-center gap-4 pl-6 bg-gray-100 pt-2 pb-2">
        <div className="w-1/3 font-medium">User Name</div>
        <div className="w-1/3 font-medium">User Email</div>
        <div className="w-1/3 font-medium">Assign Role</div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {users.map((user: any) => (
          <div key={user.id} className="flex items-center gap-4 pb-2">
            <div className="w-1/3 font-medium">{user.name}</div>
            <div className="w-1/3 font-medium">{user.email}</div>
            <select
              title="select role"
              name={`role-${user.id}`}
              className="border border-gray-300 p-2 rounded-md w-1/3"
              defaultValue={user.role || ''}
              onChange={(e) => assignRoleToUser(user.id, e.target.value)}
            >
              <option value="" disabled>Select role</option>
              {role.map((r: any) => (
                <option key={r.id} value={r.id}>
                  {r.role}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <br />
      <br />
      <p className='text-xl font-bold mt-8 pl-5'>Assigned Role</p>
      <div className="flex items-center gap-2 pl-5 bg-gray-100 pt-2 pb-2">
        <div className="w-1/3 font-medium">User Name</div>
        <div className="w-1/3 font-medium">User Email</div>
        <div className="w-1/3 font-medium">Role</div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {assigned.map((user: any) => (
          <div key={user.id} className="flex items-center gap-4 pb-2">
            <div className="w-1/3 font-medium">{user.name}</div>
            <div className="w-1/3 font-medium">{user.email}</div>
            <div className="w-1/3 font-medium">{
              role.map((r: any) => (
                r.id === user.roleId ? r.role : ''
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssignRole