'use client';

import React from 'react';
import createRole from "../../../app/actions/superadmin/createRole"

const initialState = {
  success: undefined,
  error: '',
};

const CreateRole = () => {
  const [state, formAction] = React.useActionState(createRole, initialState);

  return (
    <div className="flex flex-col items-center mt-10">
      <form className="flex flex-col gap-4 w-full max-w-md p-4" action={formAction}>
        <p className="text-xl font-bold">Create Role</p>
        <input
          type="text"
          name="role" // this is important!
          placeholder="Enter role"
          className="border border-gray-300 rounded p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Create Role
        </button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
        {state?.success && <p className="text-green-500">Role created successfully!</p>}
      </form>
    </div>
  );
};

export default CreateRole;
