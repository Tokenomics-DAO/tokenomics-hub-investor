import { FieldArray } from 'formik'
import React, { useState } from 'react'
import XMarkIcon from '../../public/svg/xmarkicon'
import Drawer from '../slugView/Drawer'
import MechanismCard from '../tdf/MechanismCard'

export const FormCardSupplyDemand = ({
  field,
  values,
  mechanismTemplates,
  setFieldValue,
}) => {  

  let [mechanismIndex, setMechanismIndex] = useState(0)
  const defaultMechanism = {
    id: '',
    name: `Mechanism`,
    summary: '',
    details: '',
    isSink: true,
    // user: '',
    token: '',
    category: `Mechanism`,
    lockupPeriod: 5,
    unlockPeriod: 12,
    percentageAllocation: 30,
    color: '#FF6666',
    isEpochDistro: false,
    epochDurationInSeconds: 0,
    initialEmissionPerSecond: 0,
    emissionReductionPerEpoch: 0,
    CalculationTimeSeries: [
      { id: 1, months: 6, tokens: 5000000 },
      { id: 2, months: 5, tokens: 6000000 },
      { id: 3, months: 16, tokens: 50000000 },
    ],
    isTemplate: false,
    PostUser: values.PostUser,
  }

  const mechTemplates = mechanismTemplates.map(obj => ({ ...obj }));  
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(defaultMechanism)

  function handleChange(e) {
    setSelectedTemplate(
      mechTemplates.find((mt) => String(mt.id) === e.target.value) || defaultMechanism      
    )
  }

  const handleNewMechanism = (arrayHelpers, isSink: boolean) => {
    const updateMechanism = selectedTemplate
    
    updateMechanism.isSink = isSink
    updateMechanism.name = updateMechanism.name + " " + (field.value?.length + 1)
    updateMechanism.category = updateMechanism.category + " " + (field.value?.length + 1)

    arrayHelpers.push(updateMechanism)
    setMechanismIndex(field.value?.length)
    setIsOpen(true)
    setSelectedTemplate(defaultMechanism)
  }

  const handleEditMechanism = (index) => {
    setMechanismIndex(index)
    setIsOpen(true)
  }

  const mechanismTile = (input, index, arrayHelpers) => {
    return (
      <div
        key={index}
        className="h-24 w-44 rounded-md border-2 border-dao-green text-xs"
      >
        <button
          className="relative float-right"
          onClick={() => arrayHelpers.remove(index)}
          type="button"
        >
          <XMarkIcon className="h-3 w-3" aria-hidden="true" />
        </button>
        <button
          className="h-full w-full"
          onClick={() => handleEditMechanism(index)}
        >
          <p className="">{input.user}</p>
          <p className="">{input.mechanism}</p>
        </button>
      </div>
    )
  }

  return (
    <div className="relative overflow-x-auto">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <MechanismCard
          field={field}
          mechanismIndex={mechanismIndex}
          setFieldValue={setFieldValue}
          users={values.PostUser} // mechanismImpactFactors={mechanismImpactFactors}
        />
      </Drawer>
      <FieldArray
        name={field.name}
        render={(arrayHelpers) => (
          <>
            <div className="flex flex-col">
              <div className="h-96 bg-slate-200">
                <p>Supply</p>
                <div key={4711} className="flex flex-row flex-wrap gap-2">
                  {field.value?.length > 0 &&
                    field.value?.map((input, index) => (
                      <>
                        {!input.isSink ? (
                          <>{mechanismTile(input, index, arrayHelpers)}</>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}

                  <button
                    type="button"
                    className="h-24 w-44 rounded-md border-2 border-dao-green text-xs font-bold"
                    onClick={() => handleNewMechanism(arrayHelpers, false)}
                  >
                    Add Mechanism
                  </button>
                </div>
              </div>

              <div className="h-96 bg-slate-400">
                <p>Demand</p>
                <div key={4811} className="flex flex-row flex-wrap gap-2">
                  {field.value?.length > 0 &&
                    field.value?.map((input, index) => (
                      <>
                        {input.isSink ? (
                          <>{mechanismTile(input, index, arrayHelpers)}</>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  <div className="h-24 w-44 rounded-md border-2 border-dao-green text-xs font-bold">
                    <p>from Template?</p>
                    <select
                      onChange={handleChange}
                      className="block w-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-dao-red focus:ring-dao-red"
                    >
                      <option key="none" value="none">
                        None
                      </option>
                      {mechTemplates?.map((mt) => (
                        <>
                          <option
                            key={mt.id}
                            value={mt.id}
                            // label={mt.name}
                          >
                            {mt.name} - {mt.summary}
                          </option>
                        </>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="rounded-md border-2 border-dao-green text-xs font-bold"
                      onClick={() => handleNewMechanism(arrayHelpers, true)}
                    >
                      Add Mechanism
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      />
    </div>
  )
}

export default FormCardSupplyDemand
