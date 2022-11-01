import BreakdownBox from './breakdown-box'

export default function TokenStrength({ tokenStrength }) {
  return (
    <>
    <h1 className='text-xl mb-2 text-gray-500'>Token Strength</h1>
      <div className='grid border-4 border-dashed rounded-lg'>        
          <BreakdownBox value={tokenStrength.tokenUtility} strength={tokenStrength.tokenUtilityStrength} title='Token Utility:'/>    
          <BreakdownBox value={tokenStrength.demandDrivers} strength={tokenStrength.demandDriversStrength} title='Demand Driver:'/>
          <BreakdownBox value={tokenStrength.valueCapture} strength={tokenStrength.valueCaptureStrength} title='Value Capture:'/>
          <BreakdownBox value={tokenStrength.valueCreation} strength={tokenStrength.valueCreationStrength} title='Value Creation:'/>
          <BreakdownBox value={tokenStrength.businessModel} strength={tokenStrength.businessModelStrength} title='Business Model:'/>
      </div>
    </>
  )
}
