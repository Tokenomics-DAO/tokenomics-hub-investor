import { Field, FieldArray } from 'formik'
import React from 'react'
import FormSelectUser from '../form/FormSelectUser'
import FormTipTap from '../form/FormTipTap'

export const MechanismCard = ({
  field,
  mechanismIndex,
  setFieldValue,
  users,
}) => {
  const isSink = field.value[mechanismIndex]?.isSink || false

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn)
  }

  const supplyBuilder = () => {
    return (
      <>
        <div>
          {' '}
          {/* <div className="flex items-center justify-between">
            <label htmlFor="toggle" className="mr-4">
              Toggle:
            </label>
            <div className="relative mr-2 inline-block w-10 select-none align-middle">
              <Field
                id="isEpochDistro"
                name={`${field.name}.${mechanismIndex}.isEpochDistro`}
                type="checkbox"
                // onChange={handleToggle}
                // checked={isToggleOn}
                // className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white transition-colors duration-300 ease-in-out"
              />
              <label
                htmlFor="toggle"
                className="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300"
              />
            </div>
            <span>
              {field?.value[mechanismIndex]?.isEpochDistro ? 'On' : 'Off'}
            </span>
          </div> */}
          <div className='flex p-5'>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Allocation Based Supply
          </span>
          <label class="relative mr-5 inline-flex cursor-pointer items-center">
            {/* <input type="checkbox" value="" class="peer sr-only" checked /> */}

            <Field
              id="isEpochDistro"
              name={`${field.name}.${mechanismIndex}.isEpochDistro`}
              type="checkbox"
              class="peer sr-only"
              // onChange={handleToggle}
              // checked={isToggleOn}
              // className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white transition-colors duration-300 ease-in-out"
            />
            <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-red-800"></div>
          </label>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Emission Based Supply
          </span>
          </div>
          {/* <label className="mb-2 block text-sm font-medium text-gray-900">
            Epoch Distro?
          </label>
          <Field
            id="isEpochDistro"
            name={`${field.name}.${mechanismIndex}.isEpochDistro`}
            type="checkbox"
            className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
          /> */}
          {/* <div className="flex">
            <p className="text-xs font-bold uppercase text-gray-700">
              Category
            </p>
            <Field
              name={`${field.name}.${mechanismIndex}.category`}
              placeholder="category"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="text"
            />
          </div> */}
          {field?.value[mechanismIndex]?.isEpochDistro ? (
            <>
              {' '}
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Epoch Duration in Seconds
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.epochDurationInSeconds`}
                  placeholder="First Epoch Duration in Seconds"
                  className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  min="0"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </div>
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Initial Emission per second
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.initialEmissionPerSecond`}
                  placeholder="Initial Emission per Seconds"
                  className="block w-24 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </div>
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Emission Reduction per Epoch (in %)
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.emissionReductionPerEpoch`}
                  placeholder="Emission Reduction per Epoch"
                  className="block w-24 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                <p className="w-16 text-xs font-bold uppercase text-gray-700">
                  Lockup Period
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.lockupPeriod`}
                  placeholder="lockupPeriod"
                  className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </div>
              <div className="flex">
                <p className="text-xs font-bold uppercase text-gray-700">
                  Unlocking Period
                </p>
                <Field
                  name={`${field.name}.${mechanismIndex}.unlockPeriod`}
                  placeholder="unlockPeriod"
                  className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  type="number"
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </div>
            </>
          )}
          <div className="flex">
            <p className="text-xs font-bold uppercase text-gray-700">
              Percentage Allocation (
              {field.values?.reduce(
                (a, v) => (a = a + Number(v?.percentageAllocation)),
                0
              )}
              %)
            </p>{' '}
            <Field
              name={`${field.name}.${mechanismIndex}.percentageAllocation`}
              placeholder="percentageAllocation"
              className="block w-24 rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="number"
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          <div className="flex">
            <p className="text-xs font-bold uppercase text-gray-700">Color</p>
            <Field
              name={`${field.name}.${mechanismIndex}.color`}
              placeholder="color"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              type="color"
            />
          </div>
        </div>
      </>
    )
  }

  const demandBuilder = () => {
    return (
      <>
        <div>Demand Estimate</div>
        <FieldArray
          name={`${field.name}.${mechanismIndex}.CalculationTimeSeries`}
          render={(arrayHelpers) => (
            <>
              <table className="mb-1 overflow-x-auto text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs text-gray-700">
                  <tr>
                    <th scope="col" className="py-3">
                      Phase
                    </th>
                    <th scope="col" className="py-3">
                      Phase Duration
                    </th>
                    <th scope="col" className="py-3">
                      Demand
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {field.value[mechanismIndex]?.CalculationTimeSeries?.length >
                    0 &&
                    field.value[mechanismIndex]?.CalculationTimeSeries?.map(
                      (input, factorIndex) => (
                        <>
                          <tr
                            key={factorIndex}
                            className="border-b bg-white text-xs font-normal"
                          >
                            <th
                              scope="row"
                              className="whitespace-nowrap text-gray-900 "
                            >
                              {' '}
                              <Field
                                name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.id`}
                                //   placeholder="label"
                                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                //   rows={4}
                                type="number"
                              />
                            </th>
                            <td className="">
                              {' '}
                              <Field
                                name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.months`}
                                //   placeholder="label"
                                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                //   rows={4}
                                type="number"
                              />
                            </td>
                            <td className="">
                              {' '}
                              <Field
                                name={`${field.name}.${mechanismIndex}.CalculationTimeSeries.${factorIndex}.tokens`}
                                //   placeholder="label"
                                className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                //   rows={4}
                                type="number"
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="mr-2 inline-flex h-8 w-8 items-center rounded-full bg-red-500 p-2.5 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-800"
                                onClick={() => arrayHelpers.remove(factorIndex)}
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
                        </>
                      )
                    )}
                </tbody>
              </table>
              <button
                type="button"
                className="mt-3 mr-3 w-36 rounded-md bg-dao-red px-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() =>
                  arrayHelpers.push({
                    id:
                      field.value[mechanismIndex]?.CalculationTimeSeries
                        ?.length + 1,
                    months: 6,
                    tokens: 10000000,
                  })
                }
              >
                Add Row
              </button>
            </>
          )}
        />
        {/* need some kind of table that creates timeseries, question is how we convert the info back and forth */}
      </>
    )
  }

  return (
    <div className="flex flex-col p-4">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
        {isSink ? <>Demand Builder</> : <>Supply Builder</>}
      </h5>
      <label className="block text-sm font-medium text-gray-900 ">Name</label>
      <Field
        name={`${field.name}.${mechanismIndex}.name`}
        placeholder="Name"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <label className="block text-sm font-medium text-gray-900 ">
        Summary
      </label>
      <Field
        name={`${field.name}.${mechanismIndex}.summary`}
        placeholder="Summary"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        as="textarea"
        rows={4}
      />
      {isSink ? (
        <>
          <label className="block text-sm font-medium text-gray-900 ">
            Details
          </label>
          <Field
            name={`${field.name}.${mechanismIndex}.details`}
            as={FormTipTap}
            placeholder="Details"
            onChange={(e) =>
              setFieldValue(`${field.name}.${mechanismIndex}.details`, e)
            }
          />
        </>
      ) : (
        <></>
      )}
      <label className="block text-sm font-medium text-gray-900 ">Token</label>
      <Field
        name={`${field.name}.${mechanismIndex}.token`}
        placeholder="Token"
        className="block rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        type="text"
      />
      <label className="block text-sm font-medium text-gray-900 ">User</label>
      <Field
        className="custom-select"
        name={`${field.name}.${mechanismIndex}.PostUser`}
        options={users}
        component={FormSelectUser}
        placeholder="Select Users"
        isMulti={true}
      />

      {isSink ? demandBuilder() : supplyBuilder()}
    </div>
  )
}

export default MechanismCard
