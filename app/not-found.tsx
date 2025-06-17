import './globals.css'

export const metadata = {
  title: "404",
  description: "page not found"
}

interface PageProps {
  // React Namespace
  children: React.ReactNode
}

// concise type alias way vs. precise direct annotation way
export const Page: React.FC<PageProps> = async ({ children }) => {
  return (
    <div className="flex items-center justify-center p-20">
      <div>
        404 browser error. Oh no! The requested URL was not found.
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Page
