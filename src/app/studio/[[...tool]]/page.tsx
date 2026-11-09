'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity/sanity.config' // adjust path relative to file location

export default function StudioPage() {
  return <NextStudio config={config} />
}