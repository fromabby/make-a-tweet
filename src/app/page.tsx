import Footer from "@/components/Footer"
import Header from "@/components/Header"
import InputSection from "@/components/InputSection"
import TweetList from "@/components/TweetList"

const Home = () => {
  return (
    <main className='w-[100-vw] h-[100vh]'>
      <Header />
      <InputSection />
      <TweetList />
      <Footer />
    </main>
  )
}

export default Home