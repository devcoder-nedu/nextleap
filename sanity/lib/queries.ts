import {defineQuery} from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[_type=="startup" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  category,
  description,
  slug,
  _createdAt,
  views,
  image,
  author -> {
    _id,
    name,
    image,
    bio
  }
}`)