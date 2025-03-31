
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import BlogList from "@/components/blogs/BlogList";

const Blogpage=()=>{
  return(
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <BlogList/>
      <Footer/>
    </div>
  )
};
export default Blogpage;