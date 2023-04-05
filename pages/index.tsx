import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import Table from '../components/table'
import prisma from '../lib/prisma'
import { GetServerSideProps } from 'next'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { headerStatus, postStatus } from '../lib/helper'
import Link from 'next/link'
import { useState } from 'react'
import XMarkIcon from '../public/svg/xmarkicon'

type Props = {
  allPosts: any
  preview: any
  categories: object[]
  tags: object[]
}

const Index: React.FC<Props> = (props) => {
  const router = useRouter()
  const [showBanner, setShowBanner] = useState(true)

  function filterCategories(newValue: MultiValue<any>): void {
    if (newValue.length === 0) {
      router.replace('/')
    } else {
      const filters = newValue.map((nv) => nv.value)
      router.replace(`/?cats=${filters}`)
    }
  }

  function filterTags(newValue: MultiValue<any>): void {
    if (newValue.length === 0) {
      router.replace('/')
    } else {
      const filters = newValue.map((nv) => nv.value)
      router.replace(`/?tags=${filters}`)
    }
  }

  const fundRaiseBar = (
    <div
      className={`${
        showBanner ? 'm-auto flex items-center bg-dao-green' : 'hidden'
      }`}
    >
      <div className="mx-auto max-w-xl py-3 px-3 sm:px-6 lg:px-8">
        <p className="ml-3 self-center truncate text-center font-medium text-white">
          <span className="inline">🥳 We are fundraising. Interested? </span>
          <a
            href="mailto:contact@tokenomicsdao.com"
            className="hover:underline"
          >
            Contact us.
          </a>
        </p>
      </div>
      <button
        className="text-gray-200"
        onClick={() => {
          setShowBanner(false)
        }}
      >
        <XMarkIcon className="h-6 w-6 text-gray-200" aria-hidden="true" />
      </button>
    </div>
  )

  return (
    <>
    {fundRaiseBar}
      <Layout mode={headerStatus.main}>
        <Head>
          <title>Tokenomics Hub</title>
          <meta
            name="Explore, compare and evaluate tokenomics of crypto projects."
            content="Created by Tokenomics DAO"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest"></link>
        </Head>
        <Container>
          <Intro />
          <h1 className="mb-10 text-center text-2xl md:text-3xl">
            Explore, compare and evaluate tokenomics of crypto projects.
          </h1>
          <div className="flex gap-4 mt-10 mb-10 text-center justify-center">
            <Link
              href="/myDrafts"
              className="w-44 h-14 text-center self-center rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Add a Token Report
            </Link>
            <Link
              href="/myDesigns"
              className="w-44 h-14 self-center rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Design a Token 
              <p className='text-[8px]'> (early beta)</p>
            </Link>
          </div>
          <div className="m-auto flex w-1/2 max-w-5xl">
            <Select
              defaultValue={[]}
              id="cat-select"
              isMulti
              placeholder="filter categories"
              name="categories"
              options={props.categories}
              className="mr-3 w-1/2 text-xs"
              // classNamePrefix="select"
              onChange={filterCategories}
            />
            <Select
              defaultValue={[]}
              id="tag-select"
              placeholder="filter tags"
              isMulti
              name="tags"
              className="w-1/2 text-xs"
              options={props.tags}
              onChange={filterTags}
            />
          </div>
          <Table prop={props.allPosts} />
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const categories = await prisma.category.findMany()
  const tags = await prisma.tag.findMany()

  const filterCats = context?.query?.cats?.split(',') || ''
  // console.log("🚀 ~ file: index.tsx:126 ~ constgetServerSideProps:GetServerSideProps= ~ filterCats:", filterCats)
  const filterTags = context?.query?.tags?.split(',') || ''
  // console.log("🚀 ~ file: index.tsx:128 ~ constgetServerSideProps:GetServerSideProps= ~ filterTags:", filterTags)
  const filterCatsQuery =
    filterCats.length > 0
      ? {
          categories: {
            some: {
              value: { in: filterCats },
            },
          },
        }
      : {}

  const filterTagsQuery =
    filterTags.length > 0
      ? {
          tags: {
            some: {
              value: { in: filterTags },
            },
          },
        }
      : {}

  const allPosts = await prisma.post.findMany({
    // take: 20,
    where: {
      status: postStatus.published,
      ...filterCatsQuery,
      ...filterTagsQuery,
    },
    select: {
      mainImageUrl: true,
      title: true,
      tokenStrength: true,
      slug: true,
      ticker: true,
      id: true,
      categories: {
        select: {
          label: true,
        },
      },
    },
    orderBy: {title: 'asc'}
  })

  // const aggregate = await prisma.userStrengthRating.groupBy({
  //   by: ['postId'],
  //   _avg: {
  //     tokenUtilityStrength: true,
  //     businessModelStrength: true,
  //     valueCreationStrength: true,
  //     valueCaptureStrength: true,
  //     demandDriversStrength: true,
  //   },
  // })
  // console.log("🚀 ~ file: index.tsx:167 ~ constgetServerSideProps:GetServerSideProps= ~ aggregate", aggregate)

  return {
    props: {
      allPosts,
      categories: categories || null,
      tags: tags || null,
      // rewardRound
    },
    // revalidate: 1,
  }
}
