import { Field, FieldArray } from 'formik'
import React from 'react'

export const FormAddUser = ({ values }) => {
  return (
    <div className="relative overflow-x-auto">
      <FieldArray
        name="PostUser"
        render={(arrayHelpers) => (
          <>
            <table className="mb-1 w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Role
                  </th>
                  <th scope="col" className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {values?.PostUser.length > 0 &&
                  values?.PostUser?.map((input, index) => (
                    <tr key={index} className="border-b bg-white ">
                      <th
                        scope="row"
                        className="whitespace-nowrap py-2 px-3 font-medium text-gray-900 "
                      >
                        <Field
                          name={`PostUser.${index}.name`}
                          placeholder="Name"
                          className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                          type="text"
                        />
                      </th>

                      <td className="py-2 px-3">
                        <Field
                          name={`PostUser.${index}.role`}
                          as="textarea"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Role"
                          rows="4"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <button
                          type="button"
                          className="mr-2 inline-flex items-center rounded-full bg-red-500 p-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <svg
                            fill="white"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                          >
                            <path d="M4 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 014 8z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              type="button"
              className="mt-2 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={() =>
                arrayHelpers.push({
                  id: values.length,
                  name: values.name || '',
                  role: values.role || '',
                  // postId: values.postId || '',
                })
              }
            >
              Add More..
            </button>
          </>
        )}
      />
    </div>
  )
}

export default FormAddUser
