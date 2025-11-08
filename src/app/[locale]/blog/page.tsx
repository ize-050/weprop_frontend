import BlogList from "@/components/blog/BlogList"
import Wrapper from "@/layouts/Wrapper"

export const metadata = {
  title: "Blog - 12 Real Estate Pattaya",
  description: "Read our latest articles and news about real estate in Pattaya"
}

const BlogPage = async ({ params }) => {
  return (
    <Wrapper>
      <BlogList />
    </Wrapper>
  )
}

export default BlogPage
