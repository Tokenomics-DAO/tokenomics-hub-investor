import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

// function updateData(data: object[]) {
//   const updatedData = data.map((element, index) => {
//     if (index === 0) return { ...element }

//     let rowNumber = index + 2 // Start from 3rd row
//     const formulaString = `=IF($E$3="Staking + Normal Rewards Calc",'Staking + Normal Rewards Calc'!C${rowNumber},IF($E$3="Staking + Revenue Share Rewards Calc",'Staking + Revenue Share Rewards Calc'!C${rowNumber},IF($E$3="Staking + Vesting Rewards Calc",'Staking + Vesting Rewards Calc'!C${rowNumber},0)))`

//     return { ...element, 'Expected Token Demand': formulaString }
//   })

//   return updatedData
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { blankSpreadSheetId, templateSheetUrl, data } = req.body
    // console.log("🚀 ~ file: fillGSheet.ts:26 ~ templateSheetUrl:", templateSheetUrl)
    // console.log("🚀 ~ file: fillGSheet.ts:26 ~ blankSpreadSheetId:", blankSpreadSheetId)
    // const { JWT } = require('google-auth-library')
    const { GoogleSpreadsheet } = require('google-spreadsheet')
    // const sheetBaseUrl = `https://sheets.googleapis.com/v4/spreadsheets`
    // const copyTemplateSpreadsheetId =
    //   '1vfGrJYzYRYyaqo6xvPA5vQSHPjd-KaJyQz4AaRn-Iag'

    // const GOOGLE_AUTH_SCOPES = [
    //   'https://www.googleapis.com/auth/spreadsheets',
    //   'https://www.googleapis.com/auth/drive',
    // ]

    // if (title == null || templateSheetUrl == null) {
    //   return res.status(400).json({
    //     message: 'Invalid Template',
    //   })
    // }

    // const jwt = new JWT({
    //   email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   key: process.env.GOOGLE_PRIVATE_KEY,
    //   scopes: GOOGLE_AUTH_SCOPES,
    //   // subject: impersonateAs,
    // })

    // await jwt.authorize()

    // const sheetRes = await fetch(sheetBaseUrl, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     properties: { title: title },
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${jwt.credentials.access_token}`,
    //   },
    // })
    // const blankSpreadSheetData = await sheetRes.json()
    // // console.log('🚀 ~ file: createGSheet.ts:36 ~ blankSpreadSheetData:', blankSpreadSheetData)

    

    // promisesAccountAuth.push(
    //   fetch(
    //     `https://www.googleapis.com/drive/v3/files/${blankSpreadSheetData.spreadsheetId}/permissions`,
    //     {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         role: 'writer',
    //         type: 'anyone',
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${jwt.credentials.access_token}`,
    //       },
    //     }
    //   )
    // )

    const promisesAccountAuth = []

    const newSpreadSheet = new GoogleSpreadsheet(
      blankSpreadSheetId
    )
    
    const templateSpreadSheet = new GoogleSpreadsheet(
      templateSheetUrl.toString().split('/')[5]
    )

    promisesAccountAuth.push(
      newSpreadSheet.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      })
    )

    promisesAccountAuth.push(
      templateSpreadSheet.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      })
    )

    // await Promise.all(promisesAccountAuth)

    // const promisesLoadInfo = []

    promisesAccountAuth.push(templateSpreadSheet.loadInfo())
    promisesAccountAuth.push(newSpreadSheet.loadInfo())
    await Promise.all(promisesAccountAuth)

    // console.log("🚀 ~ file: fillGSheet.ts:92 ~ newSpreadSheet:", newSpreadSheet)
    //here is where i could cut off and call a second function

    for (
      let counter = 0;
      counter < templateSpreadSheet.sheetsByIndex.length;
      counter++
    ) {
      const templateSheet = templateSpreadSheet.sheetsByIndex[counter]

      if (counter <= 1) {
        await templateSheet.copyToSpreadsheet(blankSpreadSheetId)

        if (templateSheet.title === 'TimeSeries') {
          await newSpreadSheet.loadInfo()

          let docSheet =
            newSpreadSheet.sheetsByIndex[
              newSpreadSheet.sheetsByIndex.length - 1
            ]

          await docSheet.updateProperties({ title: templateSheet.title })
        }
      } else {
        templateSheet.copyToSpreadsheet(blankSpreadSheetId)
      }
    }

    // if (promisesCopy.length) await Promise.all(promisesCopy)

    let docFirstSheet = newSpreadSheet.sheetsByIndex[0]
    await docFirstSheet.delete()

    await newSpreadSheet.loadInfo()

    for (
      let sheetIndex = 0;
      sheetIndex < newSpreadSheet.sheetsByIndex.length;
      sheetIndex++
    ) {
      const newSheet = newSpreadSheet.sheetsByIndex[sheetIndex]
      const templateSheet = templateSpreadSheet.sheetsByIndex[sheetIndex]

      newSheet.updateProperties({ title: templateSheet.title })
    }

    await newSpreadSheet.loadInfo()
    
    const timeSeriesSheet = newSpreadSheet.sheetsByIndex[1]

    await timeSeriesSheet.loadCells('A3:E')
    for (let i = 0; i < data.length; i++) {
      timeSeriesSheet.getCellByA1(`B${i + 3}`).value =
        data[i]['Circulating supply']
      if (timeSeriesSheet.getCellByA1(`C${i + 3}`).formula) {
        //handle cross referencing sheets
        timeSeriesSheet.getCellByA1(`C${i + 3}`).formula =
          timeSeriesSheet.getCellByA1(`C${i + 3}`).formula
      }
    }

    await timeSeriesSheet.saveUpdatedCells()
    // console.log("🚀 ~ file: fillGSheet.ts:165 ~ newSpreadSheet:", newSpreadSheet)

    return res
      .status(200)
      .json({ message: newSpreadSheet?._spreadsheetUrl })
  } catch (error) {
    console.log('error = ', error)
    return res.status(400).json({
      message: error,
    })
  }
}
