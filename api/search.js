// import algoliasearch from 'algoliasearch'
// import sanityClient, { SanityDocumentStub } from '@sanity/client'
// import { NowRequest, NowResponse } from '@vercel/node'
// import indexer from 'sanity-algolia'

// const algolia = algoliasearch(
//   'application-id',
//   process.env.ALGOLIA_ADMIN_API_KEY
// )
// const sanity = sanityClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   // If your dataset is private you need to add a read token.
//   // You can mint one at https://manage.sanity.io,
//   token: 'skllQ8pgErJSTTBpdqCX2OqmJRbAtuWuJdC3PgpYLCpHrgqmNlgArVHJoGYifxWBzSLHPOCDrEyHovET4BFdFEi0Q7jngXnIpwWFpSkUMXXSr80C739spWPtgzm2LBD7TEgYAViNlcLllz3Fp04DYTR4ZfXwHVcVlIGfCvlt23nQ9tn2DlKQ',
//   apiVersion: '2021-03-25',
//   useCdn: false,
// })

// /**
//  *  This function receives webhook POSTs from Sanity and updates, creates or
//  *  deletes records in the corresponding Algolia indices.
//  */
// const handler = (req: NowRequest, res: NowResponse) => {
//   // Tip: Its good practice to include a shared secret in your webhook URLs and
//   // validate it before proceeding with webhook handling. Omitted in this short
//   // example.
//   if (req.headers['content-type'] !== 'application/json') {
//     res.status(400)
//     res.json({ message: 'Bad request' })
//     return
//   }

//   // Configure this to match an existing Algolia index name
//   const algoliaIndex = algolia.initIndex('my-index')

//   const sanityAlgolia = indexer(
//     // The first parameter maps a Sanity document type to its respective Algolia
//     // search index. In this example both `post` and `article` Sanity types live
//     // in the same Algolia index. Optionally you can also customize how the
//     // document is fetched from Sanity by specifying a GROQ projection.
//     //
//     // In this example we fetch the plain text from Portable Text rich text
//     // content via the pt::text function.
//     //
//     // _id and other system fields are handled automatically.
//     {
//       post: {
//         index: algoliaIndex,
//         projection: `{
//           title,
//           "path": slug.current,
//           "body": pt::text(body)
//         }`,
//       },
//       // For the article document in this example we want to resolve a list of
//       // references to authors and get their names as an array. We can do this
//       // directly in the GROQ query in the custom projection.
//       article: {
//         index: algoliaIndex,
//         projection: `{
//           heading,
//           "body": pt::text(body),
//           "authorNames": authors[]->name
//         }`,
//       },
//     },

//     // The second parameter is a function that maps from a fetched Sanity document
//     // to an Algolia Record. Here you can do further mutations to the data before
//     // it is sent to Algolia.
//     (document: SanityDocumentStub) => {
//       switch (document._type) {
//         case 'post':
//           return Object.assign({}, document, {
//             custom: 'An additional custom field for posts, perhaps?',
//           })
//         case 'article':
//           return {
//             title: document.heading,
//             body: document.body,
//             authorNames: document.authorNames,
//           }
//         default:
//           return document
//       }
//     },
//     // Visibility function (optional).
//     //
//     // The third parameter is an optional visibility function. Returning `true`
//     // for a given document here specifies that it should be indexed for search
//     // in Algolia. This is handy if for instance a field value on the document
//     // decides if it should be indexed or not. This would also be the place to
//     // implement any `publishedAt` datetime visibility rules or other custom
//     // visibility scheme you may be using.
//     (document: SanityDocumentStub) => {
//       if (document.hasOwnProperty('isHidden')) {
//         return !document.isHidden
//       }
//       return true
//     }
//   )

//   // Finally connect the Sanity webhook payload to Algolia indices via the
//   // configured serializers and optional visibility function. `webhookSync` will
//   // inspect the webhook payload, make queries back to Sanity with the `sanity`
//   // client and make sure the algolia indices are synced to match.
//   return sanityAlgolia
//     .webhookSync(sanity, req.body)
//     .then(() => res.status(200).send('ok'))
// }

// export default handler