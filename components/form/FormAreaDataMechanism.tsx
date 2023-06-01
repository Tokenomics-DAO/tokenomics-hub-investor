import React from 'react'
import { useFormikContext } from 'formik'
import { getAreaData } from '../../lib/helper'

export const FormAreaDataMechanism = (props) => {
  const { values, setFieldValue } = useFormikContext()
  const [timerId, setTimerId] = React.useState(null)

  React.useEffect(() => {
    // Clear the timer on every form input
    clearTimeout(timerId)

    // Start a new timer to call getAreaData after a delay of 1s
    const newTimerId = setTimeout(() => {
      const chartProps = getAreaData(
        values?.Calculation?.months,
        values?.Mechanism,
        values.Calculation?.totalSupply,
        values?.Calculation?.startDate
      )
      console.log("🚀 ~ file: FormAreaDataMechanism.tsx:21 ~ newTimerId ~ chartProps:", chartProps)
      // console.log("🚀 ~ file: FormAreaDataMechanism.tsx:24 ~ newTimerId ~ props.name:", props.name)
      setFieldValue(props.name, chartProps)
    }, 1000)
      

    // Save the new timer id to clear it on the next form input
    setTimerId(newTimerId)
  }, [
    setFieldValue,
    props.name,
    values?.Calculation?.months,
    values?.Mechanism,
    values.Calculation?.totalSupply,
    values?.Calculation?.startDate,
  ])

  return <></>
}

export default FormAreaDataMechanism