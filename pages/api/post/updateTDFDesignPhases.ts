import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { values } = req.body

  var Resources = values.Resources
  if (typeof values.Resources === 'object') {
    Resources = JSON.stringify(values.Resources)
  }

  const response = await prisma.designPhases.upsert({
    where: {
      phaseId: parseInt(values.phaseId),
    },
    update: {
      name: values.name,
      phaseId: parseInt(values.phaseId),
      parentPhaseId: parseInt(values.parentPhaseId || 0),
      Resources: Resources,
      isReport: values.isReport,
      phaseOrder: parseInt(values.phaseOrder),
    },
    create: {
      phaseId: parseInt(values.phaseId),
      name: values.name,
      // ...parentPhase,
      parentPhaseId: parseInt(values.parentPhaseId || 0),
      Resources: Resources,
      isReport: values.isReport,
      phaseOrder: parseInt(values.phaseOrder),
    },
  })

  res.json(response)
}
